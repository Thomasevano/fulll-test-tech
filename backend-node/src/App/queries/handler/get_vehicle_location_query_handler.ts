import { GetVehicleLocationQuery } from "../definitions/get_vehicle_location_query";
import { Location } from "../../../Domain/location";

export class GetVehicleLocationQueryHandler {

  constructor(private Location: Location) { }

  getVehiculeLocation(query: GetVehicleLocationQuery) {
    return this.Location.lastVehicleLocation(query.vehicle);
  }
}