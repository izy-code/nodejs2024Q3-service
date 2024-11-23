import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    LoggerModule,
  ],
})
export class AppModule {}
