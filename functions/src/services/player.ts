import { PlayerModel, RequestModel } from '../database';

import { ObjectId } from 'mongoose';

const createPlayersService = async (names: string[]) => {
  const players = await PlayerModel.insertMany(names.map(name => ({ name, score: 0 })));

  return { msg: `${players.length} jogadores salvos` };
};

const removePlayersService = async (ids: ObjectId[]) => {
  const playersResult = await PlayerModel.deleteMany({ _id: { $in: ids } });
  const requestsResult = await RequestModel.deleteMany({ id_player: { $in: ids } });

  return { msg: `${playersResult.deletedCount} jogadores deletados e ${requestsResult.deletedCount} pedidos deletados` };
};

const listPlayersByNameService = async () => {
  const players = await PlayerModel.find({}, null, { sort: { name: 1 } });

  return players;
};

const listPlayersByScoreService = async () => {
  const players = await PlayerModel.find({}, null, { sort: { score: -1, name: 1 } });

  return players;
};

export {
  createPlayersService,
  removePlayersService,
  listPlayersByNameService,
  listPlayersByScoreService,
};
