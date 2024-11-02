import { IArtist } from "@/interfaces/artist.interface";

export interface IAlbum {
    id: number;
    title: string;
    artist: IArtist;
    release: Date;
    image?: string;
  }