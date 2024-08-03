import { Vehicle } from "../../../Domain/vehicle";

export class GetVehicleLocationQuery {
  constructor(public vehicle: Vehicle) { }
}