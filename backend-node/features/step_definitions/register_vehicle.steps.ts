import * as assert from "assert"
import { Given, When, Then } from '@cucumber/cucumber';
import { Vehicle } from '../../src/Domain/vehicle.js';
import { Fleet } from '../../src/Domain/fleet.js';
import { RegisterVehicleCommand } from '../../src/App/commands/definitions/register_vehicle.js';
import { RegisterVehicleCommandHandler } from '../../src/App/commands/handler/register_vehicle_handler.js';

let fleet: Fleet;
let vehicle: Vehicle;

Given('my fleet', function () {
  fleet = new Fleet(new Map());
});

Given('a vehicle', function () {
  vehicle = new Vehicle('123', 'Toyota', 'Corolla', 'ABC123');
});

When('I register this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(vehicle, fleet);
  const handler = new RegisterVehicleCommandHandler(fleet);
  handler.handle(command);
});

Then('this vehicle should be part of my vehicle fleet', function () {
  assert.equal(fleet.hasVehicle(vehicle), true);
});

