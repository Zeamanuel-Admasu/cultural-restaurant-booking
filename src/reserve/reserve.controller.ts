import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Req
  } from '@nestjs/common';
  
  import { ReserveService } from './reserve.service';
  
  @Controller('/reserve')

  export class ReserveController{
    constructor(private readonly reserveService: ReserveService) {}
    
    @Post()
    async reserveTable(
        @Body('id') id: string,
        @Body('seats') tableSeats: number,
        @Body('type') tableType: string,
        @Body('date') date: Date,
        @Body('time') time: string,
      ) {
        const resp = await this.reserveService.reserveTable(
          id,
          tableSeats,
          tableType,
          date,
          time
        );
        return resp;
      }
    @Get("/today")
    async getTodayReservations(){
      const todayReservations = await this.reserveService.getTodayReservations();
      return todayReservations;
    }
    @Get("/:inputtedDate")
    async getReservationsByDate(@Param('inputtedDate') inpDate:Date){
      const result = await this.reserveService.getReservationsByDate(inpDate);
      return result;

        
    }
    @Post("/userreservations")
    async getUserReservations(@Body("id") id:string){
      return this.reserveService.getUserReservations(id);
    }
    @Delete("/delete:tablesNumber&:time")
    async deleteReservation(@Param('tablesNumber') tableNum: number, @Param('time') time: string){
      const result = await this.reserveService.deleteReservation(tableNum,time)
    }

    

  }