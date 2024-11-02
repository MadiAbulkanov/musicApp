import { AlbumController } from '@/controllers/album.controller';
import { Route } from '@/interfaces/Route.interface';
import { checkRole } from '@/middlewares/checkRole';
import { checkUser } from '@/middlewares/checkUser';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class AlbumRoute implements Route {
  public path = '/albums';
  public router = Router();

  private controller: AlbumController;

  constructor() {
    this.controller = new AlbumController();
    this.init();
  }

  private init() {
    this.router.get('/', checkUser, this.controller.getAlbums);
    this.router.get('/publish', this.controller.getPublishAlbums);
    this.router.get('/:id', this.controller.getAlbum);
    this.router.post('/', upload.single('image'), this.controller.createAlbum);
    this.router.post('/:id/publish', checkUser, checkRole('admin'), this.controller.createPublishAlbum);
    this.router.delete('/:id', checkUser, checkRole('admin'), this.controller.deleteAlbum);
  }
}