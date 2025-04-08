import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as sqlite3 from 'sqlite3';
// import seedDatabase from 'src/database/scripts/seed';

/**
 * Service responsible for initializing the SQLite database.
 * It reads SQL scripts to set up the database schema, add triggers, and insert initial data.
 * This service runs during the application startup to ensure that the database is properly configured.
 */
@Injectable()
export class DatabaseInitService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseInitService.name);
  private dbPath: string;

  /**
   * Initializes the service with the necessary configuration.
   * @param configService - ConfigService instance to access configuration values from environment variables.
   */
  constructor(private readonly configService: ConfigService) {
    // Retrieve the database file name from environment variables or use a default name
    const sqliteDBFileName = this.configService.get<string>('SQLITE_DB_FILE') || 'database.sqlite';
    this.dbPath = path.resolve(__dirname, `../../${sqliteDBFileName}`);
  }

  /**
   * Reads the content of a SQL file.
   * @param filePath - Path to the SQL file.
   * @returns The SQL file content as a string.
   * @throws Error if the file does not exist.
   */
  private readSqlFile(filePath: string): string {
    this.logger.debug(`Reading SQL file at ${filePath}`);
    if (!fs.existsSync(filePath)) {
      this.logger.error(`SQL file not found: ${filePath}`);
      throw new Error(`SQL file not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * Executes a SQL file on the provided SQLite database.
   * @param db - SQLite database instance.
   * @param filePath - Path to the SQL file.
   * @returns A promise that resolves when the SQL file has been executed.
   */
  private executeSqlFile(db: sqlite3.Database, filePath: string): Promise<void> {
    const sql = this.readSqlFile(filePath);
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) {
                this.logger.error(`Error executing SQL file ${filePath}: ${err.message}`);
                reject(err);
            } else {
                this.logger.log(`Successfully executed SQL file: ${filePath}`);
                resolve();
            }
        });
    });
}

  /**
   * Ensures that the directory for the database file exists.
   * Creates the directory if it does not exist.
   * @param filePath - Path to the database file.
   */
  private ensureDirectoryExistence(filePath: string): void {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      this.logger.log(`Directory does not exist. Creating: ${dirname}`);
      fs.mkdirSync(dirname, { recursive: true });
    }
  }

  /**
   * Initializes the database by creating the necessary schema, triggers, and inserting data.
   * It also handles errors and cleans up the database file if initialization fails.
   */
  async initializeDatabase(): Promise<void> {
    this.ensureDirectoryExistence(this.dbPath);

    if (!fs.existsSync(this.dbPath)) {
      this.logger.log('Database file not found, initializing new database.');

      // Paths to SQL scripts for schema, triggers, data, and dummy data
      const schemaSqlPath = path.resolve(__dirname, './scripts/schema.sql');
      
      //const triggersSqlPath = path.resolve(__dirname, './scripts/triggers.sql');
      const dataSqlPath = path.resolve(__dirname, './scripts/data.sql');
      const dummySqlPath = path.resolve(__dirname, './scripts/dummy.sql');

      const db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          this.logger.error(`Error opening database: ${err.message}`);
        } else {
          this.logger.log('Successfully opened the database connection.');
        }
      });

      try {
        //db.exec('PRAGMA foreign_keys = ON;'); // Enable foreign key support
        await this.executeSqlFile(db, schemaSqlPath);
        this.logger.log('Database schema initialized successfully.');
        // await this.executeSqlFile(db, triggersSqlPath);
        // this.logger.log('Triggers added successfully.');
        // Create admin user before inserting dummy data
        // Todo: temp
        // await this.createSuperAdminUser(db);
        await this.executeSqlFile(db, dataSqlPath);
        this.logger.log('Database data initialized successfully.');

        this.logger.log('Admin user created successfully.');
        await this.executeSqlFile(db, dummySqlPath);
        // await seedDatabase(db);
        this.logger.log('Dummy data inserted successfully.');
      } catch (err) {
        this.logger.error('Error initializing database:', err);
        if (fs.existsSync(this.dbPath)) {
          fs.unlinkSync(this.dbPath);
          this.logger.log('Database file deleted due to initialization error.');
        }
        process.exit(1); // Stop the application
      } finally {
        db.close((err) => {
          if (err) {
            this.logger.error(`Error closing database: ${err.message}`);
          } else {
            this.logger.log('Database connection closed.');
          }
        });
      }
    } else {
      this.logger.debug('Database file already exists.');
    }
  }

//   /**
//    * create an admin user on the start of the application for the first time
//    * todo: temporary
//    * @param db
//    * @returns
//    */
//   private async createSuperAdminUser(db: sqlite3.Database): Promise<void> {
//     const adminName = 'Super Admin';
//     const adminEmail = 'super_admin@example.com';
//     const adminPassword = '12345678'; // Consider using an environment variable
//     const adminPhoneNumber = '+1234567890'; // Optional, you can remove if not needed
//     const hashedPassword = await bcrypt.hash(adminPassword, 10);

//     return new Promise((resolve, reject) => {
//       db.serialize(() => {
//         // Insert admin user
//         const insertAdminSql = `
//           INSERT OR IGNORE INTO users (name, email, phone_number, password, is_enabled, inserted_by_id, updated_by_id)
//           VALUES (?, ?, ?, ?, ?, ?, ?)
//         `;
//         db.run(
//           insertAdminSql,
//           [adminName, adminEmail, adminPhoneNumber, hashedPassword, true, 1, 1],
//           function (err) {
//             if (err) {
//               console.error('Error creating admin user:', err);
//               return reject(err);
//             }

//             const adminid = this.lastID;
//             console.log(`Admin user created with ID: ${adminid}`);
//             resolve();
//           }
//         );
//       });
//     });
//   }

  /**
   * Lifecycle hook that runs when the module is initialized.
   * Calls `initializeDatabase` to perform the database setup.
   */
  async onModuleInit() {
    this.logger.log('DatabaseInitService initializing...');
    await this.initializeDatabase();
    this.logger.log('DatabaseInitService initialization complete.');
  }
}
