import { connectToDB } from "@/lib/db";

export async function GET() {
  console.log("[EMPLOYEES] GET request received");
  try {
    console.log("[EMPLOYEES] Connecting to DB...");
    const pool = await connectToDB();
    console.log("[EMPLOYEES] Connected to DB");
    console.log("[EMPLOYEES] Querying Employees table...");
    const result = await pool
      .request()
      .query(
        "SELECT EmployeeID, NameOfEmployee, Office FROM Employees JOIN Office ON Employees.OfficeID = Office.OfficeID ",
      );

    if (result.rowsAffected[0] < 1) {
      console.error("[EMPLOYEES] 0 Employees found.");
      // Error response needs to have status
      return Response.json(
        { message: "0 party found." },
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        },
      );
    }

    console.log("[EMPLOYEES] Employees fetched succesfully");
    return Response.json(result.recordset);
  } catch (err) {
    const error = err as Error;
    console.error(
      "[EMPLOYEES] Error fetching EMPLOYEES.",
      error.message,
      error,
    );
    // Error response needs to have status
    return Response.json(
      { message: error.message },
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
}
