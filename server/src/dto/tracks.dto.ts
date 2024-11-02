import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class TracksDto {
  @IsNotEmpty({ message: 'Композиция не может быть создана без названия!' })
  @IsString({ message: 'Название должно быть строкой' })
  @Expose()
  title!: string;

  @IsNotEmpty({ message: 'Не указан альбом композиции' })
  @IsNumberString({}, { message: 'Укажите альбом' })
  @Expose()
  albumId!: number;

  @IsNotEmpty({ message: 'Укажите продолжительность композиции' })
  @Expose()
  duration!: string;
}
