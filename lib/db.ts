import sql, { type config as MSSQLConfig } from "mssql";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const config: MSSQLConfig = {
  user: requiredEnv("MSSQL_USER"),
  password: requiredEnv("MSSQL_PASSWORD"),
  server: requiredEnv("MSSQL_SERVER"), // hostname/IP
  database: requiredEnv("MSSQL_DATABASE"),
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true, // local dev
  },
  // port: 1433,
};

export async function connectToDB() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("Error connecting to the database", err);
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
}
