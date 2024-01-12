import * as mongoose from 'mongoose';

export const ReserveSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  Number_of_people: { type: Number, required: true },
  date_of_reservation: { type: String, required: true },
  time: { type: String, required: true }

});

export interface Reserve extends mongoose.Document {
  user_id: string;
  id: string;
  Number_of_people: number;
  time: string;
  date_of_reservation: string
}
