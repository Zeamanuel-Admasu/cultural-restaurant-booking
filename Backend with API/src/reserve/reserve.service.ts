import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserve } from './reserve.model';
import { Table } from '../tables/table.model';
const moment = require("moment");



@Injectable()

export class ReserveService {
    constructor(@InjectModel('Table') private readonly tableModel: Model<Table>, @InjectModel('Reserve') private readonly reserveModel: Model<Reserve>) { }

    async reserveTable(id: string,tableSeats: number, tableType: string, date: Date, time: string) {
        console.log(id,tableSeats,tableType,date,time);
        const satsfyingTables = await this.tableModel.find().where('Type').equals(tableType).where('Number_of_seats').gte(tableSeats);
        console.log(satsfyingTables)
        let isoDate: string = moment(date).toISOString();
        let isoTime: string = moment(time, "HH:mm").toISOString();
        let ans = await this.checkAvailablity(satsfyingTables, isoDate, isoTime);
        if (ans !== "") {
            const newReserve = new this.reserveModel({
                user_id: id,
                Number_of_people: tableSeats,
                date_of_reservation: isoDate,
                time: isoTime,
            });
            const reservedTable = await this.findTable(ans)
            reservedTable.reservations.push(newReserve);
            reservedTable.save();
            return { message: "Table is Reserved" };


        }
        else{
            return {
                message: "No available Table"
            }
        }
    }

    async checkAvailablity(satsfyingTables: Array<Table>, date: string, time: string): Promise<any> {

        for (var i: number = 0; i < satsfyingTables.length; i++) {
            let table = satsfyingTables[i];
            let sameday: boolean = false;
            if (table.reservations.length === 0) {
                return table.id;
            }
            for (var j = 0; j < table.reservations.length; j++) {
                let reservation = table.reservations[j];
                if (reservation.date_of_reservation === date) {
                    let workingTime = new Date(reservation.time).getTime();
                    workingTime /= 60_000;
                    let otherTime = new Date(time).getTime();
                    console.log(workingTime, otherTime)
                    otherTime /= 60_000;
                    sameday = true;
                    if (!(workingTime - 60 < otherTime && otherTime < workingTime + 60)) {
                        return table.id;
                    }
                }
            }
            if (!sameday) {
                return table.id
            }

        }
        return "";

    }
    async getTodayReservations(today: string = new Date().toDateString()): Promise<Array<object>> {
        let reservations: Array<object> = [];
        const tables = await this.tableModel.find();
        for (var i: number = 0; i < tables.length; i++) {
            for (var j: number = 0; j < tables[i].reservations.length; j++) {
                if (new Date(tables[i].reservations[j].date_of_reservation).toDateString() === today) {
                    let hours = new Date(tables[i].reservations[j].time).getHours();
                    let minutes = new Date(tables[i].reservations[j].time).getMinutes();
                    let period = 'AM';

                    if (hours >= 12) {
                        period = 'PM';
                        if (hours> 12) {
                            hours -= 12;
                        }
                    }
                    reservations.push({
                        tableNumber: tables[i].tableNumber,
                        Type: tables[i].Type,
                        time: `${hours}:${minutes}${period}`,
                        date: new Date(tables[i].reservations[j].date_of_reservation).toDateString(),
                        Number_of_people: tables[i].reservations[j].Number_of_people
                    })

                }

            }
        }
        return reservations;
    }
    async getReservationsByDate(inpDate: Date){
        return await this.getTodayReservations(new Date(inpDate).toDateString());
    }


    async deleteReservation(tableNum: number, time: string){
        let hr = new Date(moment(time,"HH:mm")).getHours();
        let min = new Date(moment(time,"HH:mm")).getMinutes();
        if (time.slice(-2) == "PM"){
            hr += 12;
        }
        const table = await this.tableModel.findOne().where("tableNumber").equals(tableNum);
        table.reservations = table.reservations.filter(item => !(new Date(item.time).getHours() === hr && new Date(item.time).getMinutes() === min))
        await table.save();


    }


    private async findTable(id: string): Promise<Table> {
        let table: Table;
        try {
            table = await this.tableModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find table.');
        }
        if (!table) {
            throw new NotFoundException('Could not find table.');
        }
        return table;
    }


}