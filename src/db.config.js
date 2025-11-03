// Compatibility shim: some modules import from "../db.config.js"
// while the project stores the pool in `src/dbconfig` (no extension).
// Re-export `pool` from the existing module so both import styles work.
export { pool } from "./dbconfig";
