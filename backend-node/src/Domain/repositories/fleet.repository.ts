import { Fleet } from '../entities/fleet';
import { Database } from 'sqlite3';
import { Vehicle } from '../entities/vehicle';

export class FleetRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  save(fleet: Fleet): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('INSERT OR REPLACE INTO fleets (id, user_id) VALUES (?, ?)', [fleet.id, fleet.userId], (err) => {
          if (err) {
            reject(err);
            return;
          }
        });
      });
    });
  }
}
