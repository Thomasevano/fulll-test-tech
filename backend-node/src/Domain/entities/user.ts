export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly fleets: string[],
  ) { }

  addNewFleet(fleetId: string) {
    this.fleets.push(fleetId);
  }
}