import { createTables } from "./db/statements";

let initialized = false;

export async function initDB() {
  if (!initialized) {
    await createTables();
    initialized = true;
  }
}