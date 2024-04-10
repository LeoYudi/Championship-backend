import { NextFunction, Request, Response } from 'express';
import { createPlayersService, removePlayersService, listPlayersByNameService, listPlayersByScoreService } from '../services/player';

const createPlayers = async (req: Request, res: Response, next: NextFunction) => {
  const { names } = req.body;

  if (!names)
    return res.status(400).json({ msg: 'Campo "names" é inválido' });

  try {
    const result = await createPlayersService(names);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const removePlayers = async (req: Request, res: Response, next: NextFunction) => {
  const { ids } = req.body;

  if (!ids)
    return res.status(400).json({ msg: 'Campo "ids" é inválido' });

  try {
    const result = await removePlayersService(ids);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const listPlayersByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listPlayersByNameService();

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const listPlayersByScore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listPlayersByScoreService();

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export {
  createPlayers,
  removePlayers,
  listPlayersByName,
  listPlayersByScore,
};
