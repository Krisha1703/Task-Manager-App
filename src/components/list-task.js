import React from "react";

const ListTask = ({ tasks=[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 bg-gray-100 shadow-md rounded-lg">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">Status: {task.status}</p>
              <p className="text-gray-700">Priority: {task.priority}</p>
              <p className="text-gray-700">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className="text-gray-700">Assignee: {task.assignee}</p>
              <p className="text-gray-700">Comments: {task.comments}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListTask;
