import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheManagerModule } from './cache-manager/cache-manager.module';

@Module({
  imports: [CacheManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
