import { TrackHistoryController } from '@/controllers/trackHistory.controller';
import { Route } from '@/interfaces/Route.interface';
import { Router } from 'express';

export class TrackHistoryRoute implements Route {
  public path = '/track_history';
  public router = Router();

  private controller: TrackHistoryController;

  constructor() {
    this.controller = new TrackHistoryController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getTrackHistory);
    this.router.get('/user', this.controller.getTrackHistoryByUser);
    this.router.post('/', this.controller.createTrackHistory);
  }
}