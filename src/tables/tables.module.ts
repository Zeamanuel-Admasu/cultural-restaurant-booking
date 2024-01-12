import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { TableSchema } from './table.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
