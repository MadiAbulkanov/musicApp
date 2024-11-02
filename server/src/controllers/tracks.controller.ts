import { TracksDto } from '@/dto/tracks.dto';
import { TracksService } from '@/services/tracks.service';
import { plainToClass } from 'class-transformer';
import { RequestHandler } from 'express';

export class TracksController {
  private service: TracksService;

  constructor() {
    this.service = new TracksService();
  }

  getTracks: RequestHandler = async (req, res): Promise<void> => {
    const tracks = await this.service.getTracks();
    res.send(tracks);
  };

  getPublishTracks: RequestHandler = async (req, res): Promise<void> => {
    const albumId = req.query.album ? Number(req.query.album) : undefined;
    const tracks = await this.service.getPublishTracks(albumId);
    res.send(tracks);
  };

  createTrack: RequestHandler = async (req, res): Promise<void> => {
    const trackDto = plainToClass(TracksDto, req.body);
    try {
      const track = await this.service.createTrack(trackDto);
      res.send(track);
    } catch (error) {
      console.log(error);
      if(Array.isArray(error)) {
        res.status(400).send(error);
        return;
      }
      res.status(500).send(error);
    }
  };

  createPublishTrack:RequestHandler = async (req, res):Promise<void> => {
    const paramsId = req.params.id;
    try {
       const track = await this.service.createPublishTrack(paramsId);
       res.send(track); 
    } catch (error) {
        if(Array.isArray(error)) {
            res.status(400).send(error);
            return;
        }
        res.status(500).send({error: {message: 'Internal Server error'}});
    }
  };
  
  deleteTrack: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deleteTrack(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ message: `${e}` });
      } else {
        res.status(500).send(e);
      }
    }
  };

}
