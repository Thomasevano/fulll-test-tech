import * as assert from "assert"
import { Given, When, Then } from '@cucumber/cucumber';
import { Vehicle } from '../../src/Domain/entities/vehicle.js';
import { Fleet } from '../../src/Domain/entities/fleet.js';
import { RegisterVehicleCommand } from '../../src/App/commands/definitions/register_vehicle.js';
import { RegisterVehicleCommandHandler } from '../../src/App/commands/handler/register_vehicle_handler.js';
import { FleetRepository } from "../../src/Domain/repositories/fleet.repository.js";
import { db } from '../../db/database.js'

let fleet: Fleet;
let otherUserfleet: Fleet;
let vehicle: Vehicle;
let error;
const fleetRepository: FleetRepository = new FleetRepository(db);
const RegisterVehicleHandler: RegisterVehicleCommandHandler = new RegisterVehicleCommandHandler(fleetRepository);
const fleetId: number = 1
const userId: number = 1
const anotherUserId: number = 2
const anotherFleetId: number = 2

Given('my fleet', function () {
  fleet = new Fleet(fleetId, userId);
  fleetRepository.save(fleet)
});

Given('the fleet of another user', function () {
  otherUserfleet = new Fleet(anotherFleetId, anotherUserId);
  fleetRepository.save(otherUserfleet)
});

Given('a vehicle', function () {
  vehicle = new Vehicle(1, 'ABC122');
});

Given('this vehicle has been registered into the other user\'s fleet', function () {
  const command = new RegisterVehicleCommand(anotherFleetId, vehicle);
  RegisterVehicleHandler.handle(command);
});

When('I register this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(fleetId, vehicle);
  RegisterVehicleHandler.handle(command);
});

Then('this vehicle should be part of my vehicle fleet', function () {
  setTimeout(() => {
    assert.equal(fleet.hasVehicle(vehicle), true)
  }, 1000);
});

Given('I have registered this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(fleetId, vehicle);
  RegisterVehicleHandler.handle(command);
});

When('I try to register this vehicle into my fleet', function () {
  const command = new RegisterVehicleCommand(fleetId, vehicle);
  try {
    RegisterVehicleHandler.handle(command);
  } catch (err) {
    error = err;
  }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  setTimeout(() => {
    assert.ok(error instanceof Error)
    assert.equal(error.message, 'Vehicle already registered')
  }, 1000)
});
