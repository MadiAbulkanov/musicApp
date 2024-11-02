import { Tracks } from "@/entities/tracks.entity";
import { User } from "@/entities/user.entity";
import { ITrackHistory } from "@/interfaces/trackHistory.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrackHistory implements ITrackHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  users!: User;

  @Column({ nullable: true })
  track!: number;

  @ManyToOne(() => Tracks)
  @JoinColumn({ name: 'track' })
  tracks!: Tracks;

  @Column()
  datatime!: Date;

  trackTitle!: string;
  artistName!: string;
}