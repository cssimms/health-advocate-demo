import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

const DEFAULT_FROM = 0;
const DEFAULT_SIZE = 10;

// Index route to get advocates with offset pagination
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const from = parseInt(searchParams.get("from") || String(DEFAULT_FROM));
  const size = parseInt(searchParams.get("size") || String(DEFAULT_SIZE));

  const data = await db.select().from(advocates).limit(size).offset(from);

  return Response.json({ data });
}
