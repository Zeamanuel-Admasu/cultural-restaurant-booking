import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';
import { ReserveModule } from './reserve/reserve.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule,
    ReserveModule,
    TablesModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/TablesDB',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
