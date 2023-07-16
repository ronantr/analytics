import { Module } from '@nestjs/common';
import { ConversionFunnelsService } from './conversion.funnels.service';
import { ConversionFunnelsController } from './conversion.funnels.controller';
import { UsersModule } from '../users/users.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    UsersModule,
    TagsModule,
  ],
  providers: [ConversionFunnelsService],
  controllers: [ConversionFunnelsController],
  exports: [ConversionFunnelsService],
})
export class ConversionFunnelsModule {}
