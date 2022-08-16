import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../users/user.model";

interface TrackCreationAttrs {
  name: string;

  userId: number;

  text: string;

  listens: number;

  picture: string;

  audio: string;
}

@Table({ tableName: "tracks" })
export class Track extends Model<Track, TrackCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  text: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  listens: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  picture: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  audio: string;
}
