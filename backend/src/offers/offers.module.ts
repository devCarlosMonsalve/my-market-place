import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule {}
