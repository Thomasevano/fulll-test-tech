import { Command } from 'commander';
import { Fleet } from './Domain/entities/fleet.js';
import { FleetRepository } from './Domain/repositories/fleet.repository.js';
import { db } from '../db/database.js'
import { RegisterVehicleCommandHandler } from './App/commands/handler/register_vehicle_handler.js';
import { RegisterVehicleCommand } from './App/commands/definitions/register_vehicle.js';
import { Vehicle } from './Domain/entities/vehicle.js';
import { Location } from './Domain/entities/location.js';
import { ParkVehicleCommand } from './App/commands/definitions/park_vehicle.js';
import { ParkVehicleCommandHandler } from './App/commands/handler/park_vehicle_handler.js';
import { VehicleRepository } from './Domain/repositories/vehicle.repository.js';

const program = new Command();
const fleetRepository = new FleetRepository(db);
const RegisterVehicleHandler: RegisterVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
const vehicleRepository = new VehicleRepository(db)
const ParkVehicleHandler: ParkVehicleCommandHandler = new ParkVehicleCommandHandler(vehicleRepository)

program
  .version("0.0.1")
  .description("Vehicle fleet parking management CLI for managing a a fleet of vehicle")


program.command("create")
  .description('create a fleet for a user')
  .argument('<userId>', 'Id of the user you want to create the fleet for')
  .action((userId) =>
    createFleet(userId)
  )
program.command("register-vehicle")
  .description('register a vehicle in a fleet')
  .argument('<fleetId>', 'id of the fleet you want to add the vehicle in')
  .argument('<vehiclePlateNumber>', 'the plate number of the vehicle you want to register')
  .action((fleetId, vehiclePlateNumber) => {
    createVehicle(fleetId, vehiclePlateNumber)
  })
program.command('localize-vehicle')
  .argument('<vehicleId>', 'id of the vehicle you want to localize')
  .argument('<latitude>', 'latitude of the vehicle')
  .argument('<longitude>', 'longitude of the vehicle')
  .action((vehicleId, latitude, longitude) => {
    localizeVehicle(vehicleId, latitude, longitude)
  })

program.parse();

function createFleet(userId: number) {
  const fleet: Fleet = new Fleet(Date.now(), userId);
  fleetRepository.save(fleet);
  console.log(fleet.id);
}

function createVehicle(fleetId: number, vehiclePlateNumber: string) {
  const vehicle: Vehicle = new Vehicle(Date.now(), vehiclePlateNumber);
  const command = new RegisterVehicleCommand(fleetId, vehicle);
  RegisterVehicleHandler.handle(command);
  console.log(vehicle.id)
}

async function localizeVehicle(vehiclePlateNumber: string, latitude: number, longitude: number) {
  let error
  const location: Location = new Location(latitude, longitude);
  const command: ParkVehicleCommand = new ParkVehicleCommand(vehiclePlateNumber, location);
  try {
    ParkVehicleHandler.handle(command);
  } catch (err) {
    error = err;
  }
  if (error) {
    console.error(error.message)
  }
  const vehicle = await vehicleRepository.findByPlateNumber(vehiclePlateNumber)
  console.log(`New localisation set for vehicle at ${vehicle.location}`)
}
