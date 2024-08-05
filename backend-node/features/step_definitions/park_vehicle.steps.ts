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

let vehicle: Vehicle;
let location: Location;
let command;
let otherLocation: Location;
let error;

Before(function () {
  vehicle = new Vehicle('123', 'Toyota', 'Corolla', 'ABC123', undefined);
  const fleetId: number = 1
  const userId: number = 1
  const fleet = new Fleet(fleetId, userId);
  const registerCommand = new RegisterVehicleCommand(vehicle, fleet);
  const registerHandler = new RegisterVehicleCommandHandler();
  registerHandler.handle(registerCommand);
});

Given('a location', function () {
  location = new Location({ latitude: 48.8534951, longitude: 2.3483915 })
  otherLocation = new Location({ latitude: 40.7127281, longitude: -74.0060152 })
});

When('I park my vehicle at this location', function () {
  command = new ParkVehicleCommand(vehicle, location);
  const handler = new ParkVehicleCommandHandler();
  handler.handle(command);
});

Then('the known location of my vehicle should verify this location', function () {
  const query = new GetVehicleLocationQuery(vehicle);
  const handler = new GetVehicleLocationQueryHandler();
  const result = handler.getVehiculeLocation(query);
  assert.equal(result, location);
});

Given('my vehicle has been parked into this location', function () {
  command = new ParkVehicleCommand(vehicle, otherLocation);
  const handler = new ParkVehicleCommandHandler();
  handler.handle(command);
});

When('I try to park my vehicle at this location', function () {
  command = new ParkVehicleCommand(vehicle, otherLocation);
  const handler = new ParkVehicleCommandHandler();
  try {
    handler.handle(command);
  } catch (err) {
    error = err;
  }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.ok(error instanceof Error);
  assert.equal(error.message, 'Vehicle is already parked at this location');
});

