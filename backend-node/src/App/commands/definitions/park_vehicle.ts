import { Location } from "../../../Domain/location";
import { Vehicle } from "../../../Domain/vehicle";
import { Coordinates } from "../../../types";

export class ParkVehicleCommand {
  constructor(public vehicle: Vehicle, public location: Location, public coords: Coordinates) { }
}