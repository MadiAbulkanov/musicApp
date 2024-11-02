import { appDataSource } from '@/config/dataSource';
import { TracksDto } from '@/dto/tracks.dto';
import { Tracks } from '@/entities/tracks.entity';
import { ITracks } from '@/interfaces/tracks.interface';
import { Repository } from 'typeorm';

export class TracksRepository extends Repository<Tracks> {
  constructor() {
    super(Tracks, appDataSource.createEntityManager());
  }

  async getTracks(): Promise<ITracks[]> {
    const query = this.createQueryBuilder('tracks')
      .leftJoinAndSelect('tracks.album', 'album')
      .where('tracks.published = :published', { published: false });

    return await query.getMany();
  }

  async getPublishTracks(albumId?: number): Promise<ITracks[]> {
    const query = this.createQueryBuilder('tracks')
      .leftJoinAndSelect('tracks.album', 'album')
      .where('tracks.published = :published', { published: true });
    if (albumId) {
      query.andWhere('tracks.albumId = :albumId', { albumId });
    }
    return await query.getMany();
  }

  async createTrack(trackDto: TracksDto): Promise<ITracks> {
    const track = await this.save(trackDto);
    return track;
  }

  async createPublishTrack(id: number) {
    const track = await this.findOne({ where: { id } });
    if (!track) {
      throw new Error('Album not found');
    }
    track.published = true;
    return await this.save(track);
  }

  async deleteTrack(id: number): Promise<void> {
    const result = await this.delete(id);
    if (!result) {
      throw new Error('A track with this ID does not exist');
    }
  }
}
