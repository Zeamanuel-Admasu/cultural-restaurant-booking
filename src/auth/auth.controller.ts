import {
    Controller,
    Post,
    Body,
    Get,
    Res,
    Req
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { AuthService } from './auth.service';

  
  
  @Controller("/auth")
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('signup')
    async createUser(@Body('username') name: string,@Body('email') email: string, @Body('password') password: string){
        const resp = await this.authService.createUser(
            name,
            email,
            password
        );
        return resp;


    }
    
  
    @Post("login")
    async login(@Body('email') email: string, @Body('password') password: string, @Res({passthrough: true}) response: Response) {

        const jwt = await this.authService.login(email,password);
        response.cookie("jwt",jwt,{httpOnly: true});

        return {
            message: "success"
        };
    }
    @Get("/user")
    async getUser(@Req() request: Request){
        const cookie = request.cookies['jwt'];
        if (!cookie){
            return {
                status: "error"
            }
        };
        return this.authService.getUser(cookie);

    }
    @Get("/logout")
    async logout(@Res({passthrough:true}) res: Response){
        res.clearCookie('jwt');
        res.redirect("/");

    }
    @Get("/adminInfo")
    async getAdmin(){
        await this.authService.getAdmin();
    }
    @Post("/admin")
    async verifyAdmin(@Body("name") name: string, @Body("password") password:string){
        return this.authService.verifyAdmin(name,password);

    }

    
  

  

  

  }
  