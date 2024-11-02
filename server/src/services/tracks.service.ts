
import { TracksDto } from '@/dto/tracks.dto';
import { formatError } from '@/helpers/formatErrors';
import { ITracks } from '@/interfaces/tracks.interface';
import { TracksRepository } from '@/repositories/tracks.repository';
import { validate } from 'class-validator';

export class TracksService {
  private repository: TracksRepository;

  constructor() {
    this.repository = new TracksRepository();
  }

  async getTracks () {
    return await this.repository.getTracks();
  };

  async getPublishTracks (albumId?: number) {
    return await this.repository.getPublishTracks(albumId); 
  };

  createTrack = async (trackDto: TracksDto): Promise<ITracks> => {
    const errors = await validate(trackDto, { whitelist: true });
    if (errors.length) throw formatError(errors);
    return await this.repository.createTrack(trackDto);
  };

  async createPublishTrack (paramsId: string) {
    const id = Number(paramsId);
    if(isNaN(id)) {
        throw Error('invalid id');
    }
    return await this.repository.createPublishTrack(id);
  }

  deleteTrack = async (paramsId: string): Promise<void> => {
    const id = Number(paramsId);
    if (isNaN(id)) {
      throw Error('Invalid ID');
    }
    await this.repository.deleteTrack(id);
  };

}