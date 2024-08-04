import { Fleet } from "../../../Domain/entities/fleet";
import { Vehicle } from "../../../Domain/entities/vehicle";

export class RegisterVehicleCommand {
  constructor(public vehicle: Vehicle, public fleet: Fleet) { }
}