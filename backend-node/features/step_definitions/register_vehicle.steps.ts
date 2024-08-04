import * as assert from "assert"
import { Given, When, Then } from '@cucumber/cucumber';
import { Vehicle } from '../../src/Domain/entities/vehicle.js';
import { Fleet } from '../../src/Domain/entities/fleet.js';
import { RegisterVehicleCommand } from '../../src/App/commands/definitions/register_vehicle.js';
import { RegisterVehicleCommandHandler } from '../../src/App/commands/handler/register_vehicle_handler.js';

let fleet: Fleet;
let otherUserfleet: Fleet;
let vehicle: Vehicle;
let error

Given('my fleet', function () {
  const fleetId: number = 1
  let userId: number = 1
  fleet = new Fleet(fleetId, new Map(), userId);
});

Given('the fleet of another user', function () {
  let anotherFleetId: number = 2
  let anotherUserId: number = 2
  otherUserfleet = new Fleet(anotherFleetId, new Map(), anotherUserId);
});

Given('a vehicle', function () {
  vehicle = new Vehicle('123', 'Toyota', 'Corolla', 'ABC123', undefined);
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
  const command = new RegisterVehicleCommand(vehicle, otherUserfleet);
  const handler = new RegisterVehicleCommandHandler();
  handler.handle(command);
});

When('I register this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(vehicle, fleet);
  const handler = new RegisterVehicleCommandHandler();
  handler.handle(command);
});

Then('this vehicle should be part of my vehicle fleet', function () {
  assert.equal(fleet.hasVehicle(vehicle), true);
});

Given('I have registered this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(vehicle, fleet);
  const handler = new RegisterVehicleCommandHandler();
  handler.handle(command);
});

When('I try to register this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(vehicle, fleet);
  const handler = new RegisterVehicleCommandHandler();
  try {
    handler.handle(command);
  } catch (err) {
    error = err;
  }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.ok(error instanceof Error);
  assert.equal(error.message, 'Vehicle already registered');
});
