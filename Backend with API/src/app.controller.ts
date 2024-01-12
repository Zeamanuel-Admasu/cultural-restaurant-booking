import { Controller, Get, Header ,Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHome(@Res() res:Response){
    res.sendFile('index.html',{
      root: "./src/public/"
    });
  
  }

  @Get("/admin")
  getAdmin(@Res() res:Response){
    res.sendFile('admin.html',{
      root: "./src/public/"
    });
  
  }
  
  @Get("/login")
  getLogin(@Res() res:Response){
    res.sendFile('login.html',{
      root: "./src/public/"
    });
  
  }
  @Get("/signup")
  getSignup(@Res() res:Response){
    res.sendFile('signup.html',{
      root: "./src/public/"
    });
  }


  // @Header('Content-Type', 'text/html')

}
