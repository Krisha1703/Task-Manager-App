"use server";

import dbConnect from "../../../lib/db";
import Task from "../../../models/task";

export async function POST(req, res) {
  try {
    await dbConnect();
    const { taskTitle, tags, taskStatus, taskPriority, taskAssignee, dueDate } = await req.json();

    const filter = {};

    if (taskTitle) filter.title = { $regex: taskTitle, $options: "i" };
    if (tags) filter.tags = { $regex: tags, $options: "i" };
    if (taskStatus) filter.status = taskStatus;
    if (taskPriority) filter.priority = taskPriority;
    if (taskAssignee) filter.assignee = { $regex: taskAssignee, $options: "i" };
    if (dueDate) filter.dueDate = dueDate;

    const tasks = await Task.find(filter).lean();
    return new Response(JSON.stringify({ tasks }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching tasks: " + error.message }), { status: 500 });
  }
}
