import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { acceptRequestService, createRequestService, listRequestsService, removeRequestService } from '../services/request';

const createRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { id_player, placement } = req.body;

  if (!id_player || !placement)
    return res.status(400).json({ msg: 'Existem campos inválidos' });

  if (placement < 0)
    return res.status(400).json({ msg: 'Campo "placement" é inválido' });

  try {
    const result = await createRequestService({ id_player, placement });

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const removeRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id))
    return res.status(400).json({ msg: 'Parâmetro "id" é inválido' });

  try {
    const result = await removeRequestService(id);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const listRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requests = await listRequestsService();

    return res.status(200).json(requests);
  } catch (error) {
    return next(error);
  }
};

const acceptRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || !isValidObjectId(id))
    return res.status(400).json({ msg: 'Parâmetro "id" é inválido' });

  try {
    const result = await acceptRequestService(id);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export { createRequest, removeRequest, listRequests, acceptRequest };
