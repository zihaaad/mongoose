/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import {Server} from "http";
import seedSuperAdmin from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    server = app.listen(config, () => {
      console.log(`[<[<[<[ APP IS RUNNING ON PORT: ${config.port} ]>]>]>]`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(`⚠ UnhandledRejection is declected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`⚠ UnCaughtException is declected, shutting down...`);
  process.exit(1);
});
