import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { ReserveSchema } from './reserve.model';
import { TableSchema } from '../tables/table.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reserve', schema: ReserveSchema },{ name: 'Table', schema: TableSchema }]),
  ],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
