import { Fleet } from "../../../Domain/fleet";
import { Vehicle } from "../../../Domain/vehicle";

export class RegisterVehicleCommand {
  constructor(public vehicle: Vehicle, public fleet: Fleet) { }
}