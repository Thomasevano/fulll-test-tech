import * as assert from "assert"
import { Given, When, Then, Before } from '@cucumber/cucumber';
import { Vehicle } from '../../src/Domain/entities/vehicle.js';
import { Fleet } from '../../src/Domain/entities/fleet.js';
import { Location } from "../../src/Domain/entities/location.js";
import { RegisterVehicleCommand } from '../../src/App/commands/definitions/register_vehicle.js';
import { RegisterVehicleCommandHandler } from '../../src/App/commands/handler/register_vehicle_handler.js';
import { ParkVehicleCommand } from "../../src/App/commands/definitions/park_vehicle.js";
import { ParkVehicleCommandHandler } from "../../src/App/commands/handler/park_vehicle_handler.js";
import { GetVehicleLocationQuery } from "../../src/App/queries/definitions/get_vehicle_location_query.js";
import { GetVehicleLocationQueryHandler } from "../../src/App/queries/handler/get_vehicle_location_query_handler.js";
import { FleetRepository } from "../../src/Domain/repositories/fleet.repository.js";
import { db } from "../../db/database.js";
import { VehicleRepository } from "../../src/Domain/repositories/vehicle.repository.js";

let vehicle: Vehicle;
let location: Location;
let command;
let otherLocation: Location;
let error;

const fleetRepository: FleetRepository = new FleetRepository(db);
const RegisterVehicleHandler: RegisterVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);

const vehicleRepository: VehicleRepository = new VehicleRepository(db);
const ParkVehicleHandler: ParkVehicleCommandHandler = new ParkVehicleCommandHandler(vehicleRepository)

Before(function () {
  vehicle = new Vehicle(12, 'ABC123');
  const fleetId: number = 1
  const userId: number = 1
  const fleet = new Fleet(fleetId, userId);
  fleetRepository.save(fleet)
  const command = new RegisterVehicleCommand(fleetId, vehicle);
  RegisterVehicleHandler.handle(command);
});

Given('a location', function () {
  const latitude: number = 48.8534951
  const longitude: number = 2.3483915
  location = new Location(latitude, longitude)

  const otherLatitude: number = 40.7127281;
  const otherLongitude: number = -74.0060152;
  otherLocation = new Location(otherLatitude, otherLongitude)
});

When('I park my vehicle at this location', function () {
  command = new ParkVehicleCommand(vehicle.licensePlate, location);
  ParkVehicleHandler.handle(command);
});

Then('the known location of my vehicle should verify this location', async function () {
  // const query = new GetVehicleLocationQuery(vehicle);
  // const handler = new GetVehicleLocationQueryHandler();
  // const result = handler.getVehiculeLocation(query);
  const vehicleQuery = await vehicleRepository.findByPlateNumber(vehicle.licensePlate)
  assert.equal(vehicleQuery?.location, JSON.stringify(location));
});

Given('my vehicle has been parked into this location', function () {
  command = new ParkVehicleCommand(vehicle.licensePlate, otherLocation);
  ParkVehicleHandler.handle(command);
});

When('I try to park my vehicle at this location', function () {
  command = new ParkVehicleCommand(vehicle.licensePlate, otherLocation);
  try {
    ParkVehicleHandler.handle(command);
  } catch (err) {
    error = err;
  }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.ok(error instanceof Error);
  assert.equal(error.message, 'Vehicle is already parked at this location');
});

