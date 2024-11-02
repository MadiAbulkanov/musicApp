import { Artist } from "@/entities/artist.entity";
import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

export const ArtistFactory = setSeederFactory(Artist, (faker: Faker) => {
    const artist = new Artist();
    artist.name = faker.internet.displayName();
    artist.description = faker.lorem.sentence();
    artist.photo = faker.image.url();

    return artist;
});