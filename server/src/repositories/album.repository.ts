import { appDataSource } from '@/config/dataSource';
import { AlbumDto } from '@/dto/album.dto';
import { Album } from '@/entities/album.entity';
import { IAlbum } from '@/interfaces/album.interface';
import { Repository } from 'typeorm';

export class AlbumRepository extends Repository<Album> {
  constructor() {
    super(Album, appDataSource.createEntityManager());
  }

  async getAlbums(): Promise<IAlbum[]> {
    const query = this.createQueryBuilder('albums')
      .leftJoinAndSelect('albums.artist', 'artist')
      .where('albums.published = :published', { published: false })
      .orderBy('albums.release', 'ASC');

    return await query.getMany();
  }

  async getPublishAlbums(artistId?: number): Promise<IAlbum[]> {
    const query = this.createQueryBuilder('albums')
      .leftJoinAndSelect('albums.artist', 'artist')
      .where('albums.published = :published', { published: true })
      .orderBy('albums.release', 'ASC');
    if (artistId) {
      query.andWhere('albums.artistId = :artistId', { artistId });
    }

    return await query.getMany();
  }

  async getAlbum(id: number): Promise<IAlbum | null> {
    return await this.findOne({
      where: { id },
      relations: { artist: true },
    });
  }

  async createAlbum(albumDto: AlbumDto) {
    return await this.save(albumDto);
  }

  async createPublishAlbum(id: number) {
    const album = await this.findOne({ where: { id } });
    if (!album) {
      throw new Error('Album not found');
    }
    album.published = true;
    return await this.save(album);
  }

  async deleteAlbum(id: number): Promise<void> {
    const album = await this.findOne({ where: { id } });
    if (!album) {
      throw new Error('A album with this ID does not exist');
    }
    await this.remove(album);
  }
}
