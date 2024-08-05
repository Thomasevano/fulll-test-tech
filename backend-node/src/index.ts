import { Command } from 'commander';
import { Fleet } from './Domain/entities/fleet.js';
import { FleetRepository } from './Domain/repositories/fleet.repository.js';
import { db } from '../db/database.js'

const program = new Command();
const fleetRepository = new FleetRepository(db);


program
  .version("0.0.1")
  .description("Vehicle fleet parking management CLI for managing a a fleet of vehicle")


program.command("create")
  .description('create a fleet for a user')
  .argument('<userId>', 'Id of the user you want to create the fleet for')
  .action((userId) =>
    createFleet(userId)
  )

program.parse();

function createFleet(userId: number) {
  const fleet: Fleet = new Fleet(Date.now(), userId);
  fleetRepository.save(fleet);
  console.log(fleet.id);
}
