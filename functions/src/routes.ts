import { Router } from 'express';
import { createPlayers, listPlayersByName, listPlayersByScore, removePlayers } from './controllers/player';
import { acceptRequest, createRequest, listRequests, removeRequest } from './controllers/request';

const routes = Router();

// Players' routes
routes.get('/leaderboard', listPlayersByScore);
routes.get('/players', listPlayersByName);

routes.post('/players', createPlayers);
routes.post('/players/remove', removePlayers);


// Requests' routes
routes.get('/requests', listRequests);

routes.post('/requests', createRequest);
routes.post('/requests/accept/:id', acceptRequest);

routes.delete('/requests/remove/:id', removeRequest);

export { routes };
