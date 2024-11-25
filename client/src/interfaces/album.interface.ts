
export interface Album {
    id: string;
    title: string;
    release: string;
    image: string;
    artistId: string;
    artist: { title: string };
}