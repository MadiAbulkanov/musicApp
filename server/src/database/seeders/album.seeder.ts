import { Album } from "@/entities/album.entity";
import { Artist } from "@/entities/artist.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class AlbumSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const albumFactory = factoryManager.get(Album);
        const artistFactory = factoryManager.get(Artist);

        const artists = await artistFactory.saveMany(2);

       await Promise.all(
        artists.map(async (artist) => {
            await albumFactory.saveMany(2, { artist });
        })
       ); 
    }
}