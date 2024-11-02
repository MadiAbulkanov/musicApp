import { TrackHistoryDto } from '@/dto/trackHistory.dto';
import { TrackHistoryService } from '@/services/trackHistory.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class TrackHistoryController {
  private service: TrackHistoryService;

  constructor() {
    this.service = new TrackHistoryService();
  }

  getTrackHistory:RequestHandler = async (req, res):Promise<void> => {
    const artist = await this.service.getTrackHistory();
    res.send(artist);
  };

  getTrackHistoryByUser:RequestHandler = async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).send({ error: { message: 'Unauthorized' } });
      }
      const trackHistory = await this.service.getTrackHistoryByUser(token);
      return res.send(trackHistory);
    } catch (e) {
      return res.status(500).send({ error: { message: 'Internal server error' } });
    }
  };

  createTrackHistory: RequestHandler = async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).send({ error: { message: 'Unauthorized' } });
      }
      const trackHistoryDto = plainToInstance(TrackHistoryDto, req.body);
      const trackHistory = await this.service.createTrackHistory(token, trackHistoryDto);
      return res.send(trackHistory);
    } catch (e) {
      return res.status(500).send({ error: { message: 'Internal server error' } });
    }
  };
}