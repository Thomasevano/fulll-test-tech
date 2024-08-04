import { Location } from "../../../Domain/location";
import { Vehicle } from "../../../Domain/vehicle";

export class ParkVehicleCommand {
  constructor(public vehicle: Vehicle, public location: Location) { }
}