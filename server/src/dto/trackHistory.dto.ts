import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class TrackHistoryDto {
    @IsNotEmpty({ message: 'Не указан ID прослушанной композиции' })
    @IsNumberString({}, { message: 'Укажите ID прослушанной композиции' })
    @Expose()
    track!: number;
  }