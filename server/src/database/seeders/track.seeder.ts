import { Album } from "@/entities/album.entity";
import { Tracks } from "@/entities/tracks.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class TrackSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        const trackFactory = factoryManager.get(Tracks);
        const albumRepository = dataSource.getRepository(Album);

        const albums = await albumRepository.find();
        
       await Promise.all(
        albums.map(async (album) => {
            
            await trackFactory.saveMany(5, { album });
        })
       );
    }
}