import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateTrackDto } from "./dto/create-track.dto";
import { FileService, FileType } from "../file/file.service";
import { Track } from "./track.model";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    private fileService: FileService,
  ) {}

  async create(
    createTrackDto: CreateTrackDto,
    picture,
    audio,
    userId,
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    const track = await this.trackRepository.create({
      ...createTrackDto,
      userId,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0) {
    const tracks = await this.trackRepository.findAll({
      include: { all: true },
      limit: count,
      offset,
    });

    return tracks;
  }
}
