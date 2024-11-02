import { ArtistDto } from "@/dto/artist.dto";
import { ArtistService } from "@/services/artist.service";
import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";

export class ArtistController {
    private service: ArtistService;

    constructor() {
        this.service = new ArtistService();
    }

    getArtist:RequestHandler = async (req, res):Promise<void> => {
        const artist = await this.service.getArtist();
        res.send(artist);
    };

    getPublishArtist:RequestHandler = async (req, res):Promise<void> => {
        const artist = await this.service.getPublishArtist();
        res.send(artist);
    };

    createArtist:RequestHandler = async (req, res):Promise<void> => {
        const artistDto = plainToInstance(ArtistDto, req.body);
        if(req.file) artistDto.photo = req.file?.filename;
        try {
           const artist = await this.service.createArtist(artistDto);
           res.send(artist); 
        } catch (error) {
            if(Array.isArray(error)) {
                res.status(400).send(error);
                return;
            }
            res.status(500).send({error: {message: 'Internal Server error'}});
        }
    };

    createPublishArtist:RequestHandler = async (req, res):Promise<void> => {
        const paramsId = req.params.id;
        try {
           const artist = await this.service.createPublishArtist(paramsId);
           res.send(artist); 
        } catch (error) {
            if(Array.isArray(error)) {
                res.status(400).send(error);
                return;
            }
            res.status(500).send({error: {message: 'Internal Server error'}});
        }
    };

    deleteArtist: RequestHandler = async (req, res): Promise<void> => {
        try {
          await this.service.deleteArtist(req.params.id);
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