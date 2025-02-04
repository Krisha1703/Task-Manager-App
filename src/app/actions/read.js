"use server";

import dbConnect from "../../lib/db";
import Task from "../../models/task";

// Fetch all tasks
export async function getTasks() {
  try {
    await dbConnect(); // Ensure DB connection
    const tasks = await Task.find({}).lean();
    const formattedTasks = tasks.map(task => ({
      ...task,
      tags: task.tags.map(tag => tag.toString()), // Convert ObjectId to string if needed
    }));
    console.log("formated task: ", formattedTasks);
    return formattedTasks;
  } catch (error) {
    throw new Error("Error fetching tasks: " + error.message);
  }
}
