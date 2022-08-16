import {
  Controller,
  Body,
  Get,
  Post,
  Query,
  Param,
  Delete,
  UseInterceptors,
  Request,
  UseGuards,
  UploadedFiles,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "src/common/guard/roles.guard";
import { CreateTrackDto } from "./dto/create-track.dto";

import { TrackService } from "./track.service";

@Controller("tracks")
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "picture", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto, @Request() req) {
    const { picture, audio } = files;
    const userId = req.user.id;
    return this.trackService.create(dto, picture[0], audio[0], userId);
  }

  getAll(@Query("count") count: number, @Query("offset") offset: number) {
    return this.trackService.getAll(count, offset);
  }

  // @Get("/search")
  // search(@Query("query") query: string) {
  //   return this.trackService.search(query);
  // }

  // @Get(":id")
  // getOne(@Param("id") id: number) {
  //   return this.trackService.getOne(id);
  // }

  // @Delete(":id")
  // delete(@Param("id") id: number) {
  //   return this.trackService.delete(id);
  // }

  // @Post("/listen/:id")
  // listen(@Param("id") id: number) {
  //   return this.trackService.listen(id);
  // }
}
