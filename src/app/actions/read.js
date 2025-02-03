"use server";

import dbConnect from "../../lib/db";
import Task from "../../models/task";

// Fetch all tasks
export async function getTasks() {
  try {
    await dbConnect(); // Ensure DB connection
    const tasks = await Task.find({}).lean(); // Fetch data
    return tasks;
  } catch (error) {
    throw new Error("Error fetching tasks: " + error.message);
  }
}
