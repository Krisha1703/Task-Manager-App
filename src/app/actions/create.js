"use server";

import dbConnect from "../../lib/db";
import Task from "../../models/task";

// Create a new task
export async function createTask(taskData) {
  await dbConnect();
  try {
    const newTask = await Task.create(taskData);
    console.log("Task created:", newTask);
    return { success: true, data: newTask };
  } catch (error) {
    return { success: false, error: error.message };
  }
}