import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Table } from './table.model';
import { table } from 'console';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel('Table') private readonly tableModel: Model<Table>,
  ) {}

  async insertTable(tableNum: number,seats: number, type: string, floor: number) {
    const table = await this.tableModel.findOne({tableNumber: tableNum});
    console.log(table)
    console.log("after")
    if (table){
      return {
        status: "error",
        message: "table Number already exists"
      }
    }
    else{
      const newTable = new this.tableModel({
        tableNumber: tableNum,
        Number_of_seats: seats,
        Type: type,
        floor
      });
      await newTable.save();


    }

    return {
      status: "success",
      message: "table successfully added"
    };
  }

  async getTables() {
    const tables = await this.tableModel.find().exec();
    return tables.map(tab => ({
      tableNumber: tab.tableNumber,
      id: tab.id,
      seats: tab.Number_of_seats,
      type: tab.Type,
      floor: tab.floor,
    }));
  }

  async getSingleTable(tabNum: number) {
    const table = await this.tableModel.findOne().where('tableNumber').equals(tabNum);
    if (!table){
      return{
        error: "table does not exist"
      }
    }
    return {
      tableNumber: tabNum,
      id: table.id,
      seats: table.Number_of_seats,
      type: table.Type,
      floor: table.floor,
    };
  }

  async updateTable(
    tableNum: number,
    seats: number,
    type: string,
    floor: number,
  ) {
    const updatedTable = await this.tableModel.findOne().where("tableNumber").equals(tableNum);
    if (seats) {
      updatedTable.Number_of_seats = seats;
    }
    if (type) {
      updatedTable.Type = type;
    }
    if (floor) {
      updatedTable.floor = floor;
    }
    updatedTable.save();
  }

  async deleteTable(tabNum: number) {
    const result = await this.tableModel.deleteOne({tableNumber: tabNum}).exec();
    console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find table.');
    }
    return {
      message: "succesfully deleted"
    }
  }

  private async findTable(id: string): Promise<Table> {
    let table;
    try {
      table = await this.tableModel.findById(id).exec();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Could not find table.');
    }
    if (!table) {
      throw new NotFoundException('Could not find table you are looking for');
    }
    return table;
  }
}
