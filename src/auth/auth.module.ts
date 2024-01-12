import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/user/user.model';
import { AdminSchema } from 'src/user/admin.model';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{name: 'Admin', schema: AdminSchema}]),
    JwtModule.register({
        secret: "jwtsecret",
        signOptions:{
            expiresIn: "10d"
        }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}