import { Album } from "@/entities/album.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "artists" })
export class Artist {
 @PrimaryGeneratedColumn()
   id!: number;

 @Column()
   name!: string;

 @Column()
  description?: string;

  @Column({ default: false })
  published!: boolean;

 @Column({ nullable: true })
  photo?: string;

  @OneToMany(() => Album, (album) => album.artist, {
    cascade: ['remove'],
  })
  album!: Album[];
}