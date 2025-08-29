"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { order } from "@/db/schema";

export const getData = async () => {
  const data = await db.select().from(order);
  return data;
};

export const addOrder = async (id: number, blades: number) => {
  await db.insert(order).values({
    id: id,
    blades: blades,
  });
};

