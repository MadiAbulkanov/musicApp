import { Album } from "@/entities/album.entity";
import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

export const AlbumFactory = setSeederFactory(Album, (faker: Faker) => {
    const album = new Album();
    album.title = faker.music.genre();
    album.release = faker.date.past({ years: 20 });
    album.image = faker.image.url();

    return album;
});