"use server";

import dbConnect from "../../lib/db";
import Task from "../../models/task";

// Update an existing task
export const updateTask = async (taskData) => {
    try {
      const { taskId, ...updateFields } = taskData; 
  
      const updatedTask = await Task.findByIdAndUpdate(
        taskId, // Use taskId to find the task
        { $set: updateFields }, 
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) {
        return { success: false, error: "Task not found" };
      }
  
      return { success: true, data: updatedTask };
    } catch (error) {
      console.error("Error updating task:", error);
      return { success: false, error: error.message };
    }
  };
