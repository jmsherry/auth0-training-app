import "../db";
import CarModel from "../models/car.model";

export const getCars = async () => {
  return await CarModel.find({}).exec();
};
export const getCar = async (id) => {
  return await CarModel.findById(id);
};
