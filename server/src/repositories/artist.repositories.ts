import { appDataSource } from '@/config/dataSource';
import { ArtistDto } from '@/dto/artist.dto';
import { Artist } from '@/entities/artist.entity';
import { Repository } from 'typeorm';

export class AtristRepository extends Repository<Artist> {
  constructor() {
    super(Artist, appDataSource.createEntityManager());
  }

  async getArtist() {
    return await this.find({ where: { published: false } });
  }

  async getPublishArtist() {
    return await this.find({ where: { published: true } });
  }

  async createArtist(ArtistDto: ArtistDto) {
    return await this.save(ArtistDto);
  }

  async createPublishArtist(id: number) {
    const artist = await this.findOne({ where: { id } });
    if (!artist) {
      throw new Error('Artist not found');
    }
    artist.published = true;
    return await this.save(artist);
  }

  async deleteArtist(id: number): Promise<void> {
    const artist = await this.findOne({ where: { id } });
    if (!artist) {
      throw new Error('A artist with this ID does not exist');
    }
    await this.remove(artist);
  }
}
