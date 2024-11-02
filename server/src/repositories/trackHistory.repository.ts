import { appDataSource } from '@/config/dataSource';
import { TrackHistoryDto } from '@/dto/trackHistory.dto';
import { TrackHistory } from '@/entities/trackHistory.entity';
import { Tracks } from '@/entities/tracks.entity';
import { ITrackHistory } from '@/interfaces/trackHistory.interface';
import { Repository } from 'typeorm';

export class TrackHistoryRepository extends Repository<TrackHistory> {
  constructor() {
    super(TrackHistory, appDataSource.createEntityManager());
  }

  async getTrackHistory(): Promise<ITrackHistory[]> {
    const tracksHistory = await this.find();

    for (const trackHistory of tracksHistory) {
      const track = await this.manager.findOne(Tracks, { where: { id: trackHistory.track }, relations: ['album', 'album.artist'] });
      if (track && track.album && track.album.artist) {
        trackHistory.trackTitle = track.title;
        trackHistory.artistName = track.album.artist.name;
      }
    }
    return tracksHistory;
  }

  async getTrackHistoryByUser(userId: number): Promise<ITrackHistory[]> {
    const tracksHistory = await this.find({
      where: { user: userId },
      order: {
        datatime: 'DESC',
      },
    });

    for (const trackHistory of tracksHistory) {
      const track = await this.manager.findOne(Tracks, { where: { id: trackHistory.track }, relations: ['album', 'album.artist'] });
      if (track && track.album && track.album.artist) {
        trackHistory.trackTitle = track.title;
        trackHistory.artistName = track.album.artist.name;
      }
    }
    return tracksHistory;
  }

  async createTrackHistory(trackHistoryDto: TrackHistoryDto, userId: number): Promise<ITrackHistory | null> {
    const trackHistory = this.create({
      user: userId,
      track: trackHistoryDto.track,
      datatime: new Date(),
    });
    const savedTrackHistory = await this.save(trackHistory);

    const track = await this.manager.findOne(Tracks, { where: { id: trackHistoryDto.track }, relations: ['album', 'album.artist'] });
    if (track && track.album && track.album.artist) {
      savedTrackHistory.trackTitle = track.title;
      savedTrackHistory.artistName = track.album.artist.name;
    }

    return savedTrackHistory;
  }
}
