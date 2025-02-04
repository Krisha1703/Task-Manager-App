import dbConnect from "../../../lib/db";
import Task from "../../../models/task";

export async function DELETE(req) {
  try {
    const { taskId } = await req.json(); // Parse taskId from request body

    if (!taskId) {
      return Response.json({ success: false, message: "Task ID is required" }, { status: 400 });
    }

    await dbConnect(); // Connect to MongoDB

    const deletedTask = await Task.findByIdAndDelete(taskId); // Delete task by ID

    if (!deletedTask) {
      return Response.json({ success: false, message: "Task not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
