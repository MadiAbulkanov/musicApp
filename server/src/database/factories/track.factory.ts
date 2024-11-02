import { Tracks } from "@/entities/tracks.entity";
import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

export const TrackFactory = setSeederFactory(Tracks, (faker: Faker) => {
    const track = new Tracks();
    track.title = faker.music.songName();

    const duration = faker.number.int({ min: 120, max: 300 });
    const min = Math.floor(duration / 60);
    const sec = duration % 60;

    track.duration = `${min}:${sec.toString().padStart(2, '0')}`;

    return track;
});