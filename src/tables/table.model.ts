import * as mongoose from 'mongoose';
import { ReserveSchema  } from '../reserve/reserve.model';
import { Reserve } from '../reserve/reserve.model';

export const TableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number, required: true
  },
  Number_of_seats: { type: Number, required: true },
  Type: { type: String, required: true },
  floor: { type: Number, required: true },
  reservations: {type:[ReserveSchema],
    default: []
  }
});



export interface Table extends mongoose.Document {
  tableNumber: number;
  id: string;
  Type: string;
  Number_of_seats: number;
  floor: number;
  reservations: Array<Reserve>
}
