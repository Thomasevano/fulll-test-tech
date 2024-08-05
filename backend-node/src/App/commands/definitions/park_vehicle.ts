import { Location } from "../../../Domain/entities/location";
import { Vehicle } from "../../../Domain/entities/vehicle";

export class ParkVehicleCommand {
  constructor(public vehiclePlateNumber: string, public location: Location) { }
}