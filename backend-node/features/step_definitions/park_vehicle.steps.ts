import * as assert from "assert"
import { Given, When, Then, Before } from '@cucumber/cucumber';
import { Vehicle } from '../../src/Domain/vehicle.js';
import { Fleet } from '../../src/Domain/fleet.js';
import { Location } from "../../src/Domain/location.js";
import { RegisterVehicleCommand } from '../../src/App/commands/definitions/register_vehicle.js';
import { RegisterVehicleCommandHandler } from '../../src/App/commands/handler/register_vehicle_handler.js';
import { ParkVehicleCommand } from "../../src/App/commands/definitions/park_vehicle.js";
import { ParkVehicleCommandHandler } from "../../src/App/commands/handler/park_vehicle_handler.js";
import { Coordinates } from "../../src/types.js";
import { GetVehicleLocationQuery } from "../../src/App/queries/definitions/get_vehicle_location_query.js";
import { GetVehicleLocationQueryHandler } from "../../src/App/queries/handler/get_vehicle_location_query_handler.js";

let vehicle: Vehicle;
let location: Location;
let coords: Coordinates;
let command;

Before(function () {
  vehicle = new Vehicle('123', 'Toyota', 'Corolla', 'ABC123');
  const fleet = new Fleet(new Map());
  const registerCommand = new RegisterVehicleCommand(vehicle, fleet);
  const registerHandler = new RegisterVehicleCommandHandler(fleet);
  registerHandler.handle(registerCommand);
});

Given('a location', function () {
  location = new Location(new Map())
  coords = { latitude: 52.34938, longitude: -32.034305 }
});

When('I park my vehicle at this location', function () {
  command = new ParkVehicleCommand(vehicle, location, coords);
  const handler = new ParkVehicleCommandHandler(location);
  handler.handle(command);
});

Then('the known location of my vehicle should verify this location', function () {
  const query = new GetVehicleLocationQuery(vehicle);
  const handler = new GetVehicleLocationQueryHandler(location);
  const result = handler.getVehiculeLocation(query);
  assert.equal(result, coords);
});

