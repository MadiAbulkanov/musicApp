import { TracksController } from '@/controllers/tracks.controller';
import { Route } from '@/interfaces/Route.interface';
import { checkRole } from '@/middlewares/checkRole';
import { checkUser } from '@/middlewares/checkUser';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class TracksRoute implements Route {
  public path = '/tracks';
  public router = Router();

  private controller: TracksController;

  constructor() {
    this.controller = new TracksController();
    this.init();
  }

  private init() {
    this.router.get('/', checkUser, this.controller.getTracks);
    this.router.get('/publish', this.controller.getPublishTracks);
    this.router.post('/', upload.single(''), this.controller.createTrack);
    this.router.post('/:id/publish', checkUser, checkRole('admin'), this.controller.createPublishTrack);
    this.router.delete('/:id', checkUser, checkRole('admin'), this.controller.deleteTrack);
  }
}
