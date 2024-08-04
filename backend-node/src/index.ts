import { Command } from 'commander'

const program = new Command();

program
  .version("0.0.1")
  .description("Vehicle fleet parking management CLI for managing a a fleet of vehicle")


program.command("create")
  .description('create a fleet for a user')
  .argument('<userId>', 'Id of the user you want to create the fleet for')
  .action((userId) =>
    console.log(`create a fleet for user ${userId}`)
  )

program.parse();