import { Artist } from "@/entities/artist.entity";
import { Tracks } from "@/entities/tracks.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "albums" })
export class Album {
 @PrimaryGeneratedColumn()
   id!: number;

 @Column()
   title!: string;

@Column({ nullable: true }) 
  artistId!: number;
 
@ManyToOne(() => Artist, (artist) => artist.album, {
  onDelete: 'CASCADE',
})
@JoinColumn({ name: 'artistId' })
  artist!: Artist;

 @Column()
  release!: Date;

  @Column({ default: false })
  published!: boolean;

 @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Tracks, (track) => track.album, {
    cascade: ['remove'],
  })
  tracks!: Tracks[];
}