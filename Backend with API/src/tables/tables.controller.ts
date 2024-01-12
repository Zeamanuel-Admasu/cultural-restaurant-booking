import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async addTable(
    @Body('seats') tabSeats: number,
    @Body('type') tabType: string,
    @Body('floor') tabFloor: number,
    @Body('tableNUM') tabNum: number,

) {
      console.log("nope")
    const resp = await this.tablesService.insertTable(
      tabNum,
      tabSeats,
      tabType,
      tabFloor
    );
    console.log(resp)
    return resp;
  }

  @Get()
  async getAllTables(@Res() res:Response) {
    const tables = await this.tablesService.getTables();
    return res.json(tables);
  }

  @Get(':tableNum')
  async getTable(@Param('tableNum') tabNum: number) {
    const result = await this.tablesService.getSingleTable(tabNum);
    return result;
  }

  @Patch(':tableNum')
  async updateTable(
    @Param('tableNum') tabNumm: number,
    @Body('updseats') tabSeats: number,
    @Body('updtype') tabType: string,
    @Body('updfloor') tabFloor: number,
  ) {
    await this.tablesService.updateTable(tabNumm, tabSeats, tabType, tabFloor);
    return {status: "success",message: "successfully updated"};
  }

  @Delete(':tableNum')
  async removeTable(@Param('tableNum') tabNum: number) {
    console.log("ddddd");
      return await this.tablesService.deleteTable(tabNum);;
  }
}
