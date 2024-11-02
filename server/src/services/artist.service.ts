import { ArtistDto } from "@/dto/artist.dto";
import { AtristRepository } from "@/repositories/artist.repositories";

export class ArtistService {
    private repository: AtristRepository;

    constructor() {
        this.repository = new AtristRepository();
    }

    async getArtist () {
        return await this.repository.getArtist(); 
    }

    async getPublishArtist () {
        return await this.repository.getPublishArtist(); 
    }

    async createArtist (ArtistDto: ArtistDto) {
        return await this.repository.createArtist(ArtistDto);
    }

    async createPublishArtist (paramsId: string) {
        const id = Number(paramsId);
        if(isNaN(id)) {
            throw Error('invalid id');
        }
        return await this.repository.createPublishArtist(id);
    }

    deleteArtist= async (paramsId: string): Promise<void> => {
        const id = Number(paramsId);
        if (isNaN(id)) {
          throw Error('Invalid ID');
        }
        await this.repository.deleteArtist(id);
    };
}