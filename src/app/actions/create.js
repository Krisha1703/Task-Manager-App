"use server";

import dbConnect from "../../lib/db";
import Task from "../../models/task";

// Create a new task
export async function createTask(taskData) {
  await dbConnect();
  try {
    // Ensure tags is an array of strings
    if (typeof taskData.tags === 'string') {
      taskData.tags = taskData.tags.split(',').map(tag => tag.trim());
    } else if (!Array.isArray(taskData.tags)) {
      taskData.tags = [];
    }

    const newTask = await Task.create(taskData);
    console.log("Task created:", newTask);
    return { success: true, data: newTask };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
