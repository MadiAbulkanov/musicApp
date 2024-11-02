import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class AlbumDto {
    @IsNotEmpty({ message: 'Альбом не может быть создана без названия!' })
    @IsString({ message: 'Название должно быть строкой' })
    @Expose()
    title!: string;

    @IsNotEmpty({ message: 'Не указан артист альбома' })
    @IsNumberString({}, { message: 'Укажите артиста' })
    @Expose()
    artistId!: number;
  
    @IsNotEmpty({ message: 'Укажите год выпуска альбома' })
    @IsString({ message: 'Укажите корректный год выпуска' })
    @Expose()
    release!: Date;

    @IsOptional()
    @Expose()
    image?: string;
}