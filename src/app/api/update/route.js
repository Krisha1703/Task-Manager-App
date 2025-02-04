import { updateTask } from "../../actions/update";

export async function PUT(request) {
  const taskData = await request.json(); // Get the task data from the request body
  const { taskId, ...updatedData } = taskData; // Extract taskId and the rest of the data

  console.log("taskId:", taskId); // Debugging

  if (!taskId) {
    return new Response(JSON.stringify({ success: false, error: "Task ID is required" }), { status: 400 });
  }

  // Call the updateTask function with taskId and updated data
  const result = await updateTask(taskId, updatedData);

  if (result.success) {
    return new Response(JSON.stringify({ success: true, data: result.data }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, error: result.error }), { status: 400 });
  }
}
