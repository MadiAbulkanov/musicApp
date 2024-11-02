import cors from 'cors';
import { TracksRoute } from '@/routes/tracks.route';
import App from './app';
import logger from './middlewares/logger';
import { AlbumRoute } from '@/routes/album.route';
import { ArtistRoute } from '@/routes/artist.route';
import { AuthRoute } from '@/routes/auth.route';
import { TrackHistoryRoute } from '@/routes/trackHistory.route';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors()],
  routes: [ new TracksRoute(), new AlbumRoute(), new ArtistRoute(), new AuthRoute(), new TrackHistoryRoute() ],
});

app.listen();
