
import { AlbumDto } from "@/dto/album.dto";
import { AlbumService } from "@/services/album.service";
import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";

export class AlbumController {
    private service: AlbumService;

    constructor() {
        this.service = new AlbumService();
    }

    getAlbums:RequestHandler = async (req, res):Promise<void> => {
        const albums = await this.service.getAlbums();
        res.send(albums);
    };

    getPublishAlbums:RequestHandler = async (req, res):Promise<void> => {
        const artistId = req.query.artist ? Number(req.query.artist) : undefined;
        const albums = await this.service.getPublishAlbums(artistId);
        res.send(albums);
    };

    getAlbum:RequestHandler = async (req, res):Promise<void> => {
        try {
            const album = await this.service.getAlbum(req.params.id);
            res.send(album);
          } catch (error) {
            if (error instanceof Error) {
              res.status(400).send({ message: `${error.message}` });
            }
          }
    };

    createAlbum:RequestHandler = async (req, res):Promise<void> => {
        const albumDto = plainToInstance(AlbumDto, req.body);
        if(req.file) albumDto.image = req.file?.filename;
        try {
           const album = await this.service.createAlbum(albumDto);
           res.send(album); 
        } catch (error) {
            if(Array.isArray(error)) {
                res.status(400).send(error);
                return;
            }
            res.status(500).send(error);
        }
    };

    createPublishAlbum:RequestHandler = async (req, res):Promise<void> => {
        const paramsId = req.params.id;
        try {
           const album = await this.service.createPublishAlbum(paramsId);
           res.send(album); 
        } catch (error) {
            if(Array.isArray(error)) {
                res.status(400).send(error);
                return;
            }
            res.status(500).send({error: {message: 'Internal Server error'}});
        }
    };

    deleteAlbum: RequestHandler = async (req, res): Promise<void> => {
        try {
          await this.service.deleteAlbum(req.params.id);
          res.sendStatus(204);
        } catch (e) {
          if (e instanceof Error) {
            res.status(400).send({ message: `${e}` });
          } else {
            res.status(500).send(e);
          }
        }
    };
}