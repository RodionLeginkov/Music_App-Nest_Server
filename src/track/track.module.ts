import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "../users/user.model";
import { FileService } from "../file/file.service";
import { TrackController } from "./track.controller";
import { Track } from "./track.model";
import { TrackService } from "./track.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [TrackController],
  imports: [
    SequelizeModule.forFeature([User, Track]),
    forwardRef(() => AuthModule),
  ],
  providers: [TrackService, FileService],
})
export class TrackModule {}
