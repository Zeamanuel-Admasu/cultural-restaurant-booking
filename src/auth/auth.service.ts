import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../user/user.model';
import { Admin } from '../user/admin.model';

import { compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,@InjectModel('Admin') private readonly adminModel: Model<Admin>,private jwtService: JwtService
      ) {}

    async createUser(name: string,email: string,password: string){
        const retrievedUser = await this.userModel.findOne().where("email").equals(email);
        if (retrievedUser){
            throw new BadRequestException("Email already exists");

        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new this.userModel({
            username: name,
            email,
            password: hashedPassword
        });
        const result = await newUser.save();
        return {
            message: "user created",
            statusCode: 200
        };


    }
    async login(email:string, password:string){
        const retrievedUser = await this.userModel.findOne().where("email").equals(email);
        if (!retrievedUser){
            throw new BadRequestException("Email does not exist");
        }
        if(!await compare(password,retrievedUser.password)){
            throw new BadRequestException("Wrong Password");
        }
        const payload = {
            id: retrievedUser.id,
        };
        const jwt:string = await this.jwtService.signAsync(payload);
        return jwt;
    }

    async getUser(cookie: string){
        try{
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data){
                throw new UnauthorizedException();
            }
            const user = await this.userModel.findById(data.id);
            return {status: "success",
        id: user.id};

        }
        catch(err){
            throw new UnauthorizedException();
        }


    }
    async getAdmin(){
        const admin = await this.adminModel.findOne().where("name").equals("admin");
        if (!admin){
            const encoded = await bcrypt.hash("tablereserve",10);
            const admin = new this.adminModel({
                name: "admin",
                password: encoded
            })
            const createdAdmin = await admin.save();

        }
        
        
    }
    async verifyAdmin(name: string, password: string){
        const admin = await this.adminModel.findOne().where("name").equals("admin");
        if (!admin){
            throw new BadRequestException();
        } 
        else if(!await bcrypt.compare(password,admin.password)){
            throw new BadRequestException("Incorrect admin name or password");
        }
        return {
            statusCode: 200,
            message: "success"
        }
    }



}