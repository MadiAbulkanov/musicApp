import { AlbumDto } from "@/dto/album.dto";
import { formatError } from "@/helpers/formatErrors";
import { IAlbum } from "@/interfaces/album.interface";
import { AlbumRepository } from "@/repositories/album.repository";
import { validate } from "class-validator";

export class AlbumService {
    private repository: AlbumRepository;

    constructor() {
        this.repository = new AlbumRepository();
    }

    async getAlbums () {
        return await this.repository.getAlbums(); 
    }

    async getPublishAlbums (artistId?: number) {
        return await this.repository.getPublishAlbums(artistId); 
    }

   getAlbum = async (paramsId: string): Promise<IAlbum> => {
        const id = Number(paramsId);
        if(isNaN(id)) {
            throw Error('invalid id');
        }
        const album = await this.repository.getAlbum(id);
        if (album) return album;
        else throw new Error('invalid id'); 
    };

    createAlbum = async (AlbumDto: AlbumDto) => {
        const errors = await validate(AlbumDto, { whitelist: true });
        if (errors.length) throw formatError(errors);
        return await this.repository.createAlbum(AlbumDto);
    };

    async createPublishAlbum (paramsId: string) {
        const id = Number(paramsId);
        if(isNaN(id)) {
            throw Error('invalid id');
        }
        return await this.repository.createPublishAlbum(id);
    }

    deleteAlbum = async (paramsId: string): Promise<void> => {
        const id = Number(paramsId);
        if (isNaN(id)) {
          throw Error('Invalid ID');
        }
        await this.repository.deleteAlbum(id);
    };
}