import { Vehicle } from "../../../Domain/entities/vehicle";

export class GetVehicleLocationQuery {
  constructor(public vehicle: Vehicle) { }
}