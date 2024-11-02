
import { IAlbum } from "@/interfaces/album.interface";

export interface ITracks {
  id: number;
  title: string;
  duration: string;
  album: IAlbum;
}
