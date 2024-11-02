import { ArtistController } from '@/controllers/artist.controller';
import { Route } from '@/interfaces/Route.interface';
import { checkRole } from '@/middlewares/checkRole';
import { checkUser } from '@/middlewares/checkUser';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class ArtistRoute implements Route {
  public path = '/artists';
  public router = Router();

  private controller: ArtistController;

  constructor() {
    this.controller = new ArtistController();
    this.init();
  }

  private init() {
    this.router.get('/', checkUser, checkRole('admin'), this.controller.getArtist);
    this.router.get('/publish', this.controller.getPublishArtist);
    this.router.post('/', upload.single('image'), this.controller.createArtist);
    this.router.post('/:id/publish', checkUser, checkRole('admin'), this.controller.createPublishArtist);
    this.router.delete('/:id', checkUser, checkRole('admin'), this.controller.deleteArtist);
  }
}