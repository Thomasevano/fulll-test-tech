import { GetVehicleLocationQuery } from "../definitions/get_vehicle_location_query";
import { Vehicle } from "../../../Domain/entities/vehicle";

export class GetVehicleLocationQueryHandler {
  getVehiculeLocation(query: GetVehicleLocationQuery) {
    return query.vehicle.vehicleLocation(query.vehicle);
  }
}