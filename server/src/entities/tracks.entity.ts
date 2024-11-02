import { Album } from "@/entities/album.entity";
import { ITracks } from "@/interfaces/tracks.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tracks implements ITracks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  duration!: string;

  @Column({ default: false })
  published!: boolean;

  @Column({ nullable: true }) 
  albumId!: number;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album!: Album;
}