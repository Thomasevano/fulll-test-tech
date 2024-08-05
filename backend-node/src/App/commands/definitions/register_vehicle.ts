import { Vehicle } from "../../../Domain/entities/vehicle";

export class RegisterVehicleCommand {
  constructor(public readonly fleetId: number, public readonly vehicle: Vehicle) { }
}