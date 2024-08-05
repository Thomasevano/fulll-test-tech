import { VehicleRepository } from "../../../Domain/repositories/vehicle.repository";
import { ParkVehicleCommand } from "../definitions/park_vehicle";

export class ParkVehicleCommandHandler {

  constructor(private readonly vehicleRepository: VehicleRepository) { }


  async handle(command: ParkVehicleCommand) {
    const vehicle = await this.vehicleRepository.findByPlateNumber(command.vehiclePlateNumber)
    const vehicleLocation = JSON.parse(JSON.stringify(vehicle.location))
    const commandLocation = `{"latitude":"${command.location.latitude}","longitude":"${command.location.longitude}"}`

    if (vehicleLocation === commandLocation) {
      throw new Error('Vehicle is already parked at this location');
    }
    // vehicle.parkVehicle(vehicle, command.location);
    this.vehicleRepository.parkVehicle(vehicle.id, JSON.stringify(command.location))
  }
}