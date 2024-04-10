import { PlayerModel, RequestModel } from '../database';

import { placementsScore } from '../utils/score';

const createRequestService = async ({ id_player, placement }: { id_player: string, placement: number }) => {
  const request = await RequestModel.create({ id_player, placement });

  return { request };
};

const removeRequestService = async (id: string) => {
  const result = await RequestModel.deleteOne({ _id: id });

  if (result.deletedCount)
    return { msg: 'Pedido deletado' };

  throw new Error('Não foi possível deletar o pedido');
};

const listRequestsService = async () => {
  const requests = await RequestModel.find({}, null, { sort: { created_at: 1 } });

  return requests;
};

const acceptRequestService = async (id: string) => {
  const request = await RequestModel.findById(id);

  if (!request)
    return { msg: 'Pedido não existe' };

  const player = await PlayerModel.findById(request.id_player);
  await player?.updateOne({ score: player.score + placementsScore[request.placement - 1] });

  await request.deleteOne();

  return { msg: 'Pontuação atualizada' };
};

export {
  createRequestService,
  removeRequestService,
  listRequestsService,
  acceptRequestService,
};
