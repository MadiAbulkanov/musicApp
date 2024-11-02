import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ArtistDto {
    @IsNotEmpty({ message: 'Артист не может быть создана без имени!' })
    @IsString({ message: 'Имя должно быть строкой' })
    @Expose()
    name!: string;
  
    @IsOptional()
    @Expose()
    description?: string;

    @IsOptional()
    @Expose()
    photo?: string;
}