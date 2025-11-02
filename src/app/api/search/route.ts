import db from "../../../db";
import { ilike, eq } from "drizzle-orm";
import { advocates } from "../../../db/schema";

// Post endpoint to take a searchQuery and return matching advocates
export async function POST(request: Request) {
  const { searchQuery } = await request.json();

  // Search by category simultaneously
  let allResults = [];
  allResults = await Promise.all([
    searchByFirstName(searchQuery),
    searchByCity(searchQuery),
    searchByphoneNumber(searchQuery),
    searchBydegree(searchQuery),
  ]);

  // Ideally we would do some kind of intelligent ranking and merging here, which would depend on user needs.
  // For now, just concatenating results and returning unique records.
  console.log("Search results pre-deduplication: ", allResults);
  const uniqueResultsMap = new Map<string, typeof advocates>();
  allResults.flat().forEach((advocate) => {
    uniqueResultsMap.set(String(advocate.id), advocate);
  });

  return Response.json({ data: Array.from(uniqueResultsMap.values()) });
}

// Mostly copying the documentation
// https://orm.drizzle.team/docs/select#advanced-filters
const searchByFirstName = async (searchQuery: string) => {
  return db
    .select()
    .from(advocates)
    .where(ilike(advocates.firstName, `%${searchQuery}%`));
};

const searchByCity = async (searchQuery: string) => {
  return db
    .select()
    .from(advocates)
    .where(ilike(advocates.city, `%${searchQuery}%`));
};

const searchByphoneNumber = async (searchQuery: string) => {
  // TODO - if we want partial match on phone number, we need to convert to text
  // try to convert searchQuery to number
  const phoneNumber = Number(searchQuery);
  if (isNaN(phoneNumber)) {
    return [];
  }

  // Exact match for now
  return db
    .select()
    .from(advocates)
    .where(eq(advocates.phoneNumber, phoneNumber));
};

const searchBydegree = async (searchQuery: string) => {
  return db
    .select()
    .from(advocates)
    .where(ilike(advocates.degree, `%${searchQuery}%`));
};
