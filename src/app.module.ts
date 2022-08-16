import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

import { Role } from "./roles/roles.model";
import { RolesModule } from "./roles/roles.module";
import { UserRoles } from "./roles/user-roles.model";
import { User } from "./users/user.model";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { TrackModule } from "./track/track.module";
import { FileModule } from "./file/file.module";
import { Track } from "./track/track.model";

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "static") }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Track],
    }),
    UserModule,
    RolesModule,
    AuthModule,
    TrackModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
