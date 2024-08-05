import { Command } from 'commander';
import { Fleet } from './Domain/entities/fleet.js';
import { FleetRepository } from './Domain/repositories/fleet.repository.js';
import { db } from '../db/database.js'
import { RegisterVehicleCommandHandler } from './App/commands/handler/register_vehicle_handler.js';
import { RegisterVehicleCommand } from './App/commands/definitions/register_vehicle.js';
import { Vehicle } from './Domain/entities/vehicle.js';

const program = new Command();
const fleetRepository = new FleetRepository(db);
const RegisterVehicleHandler: RegisterVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);

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
