import { useState } from 'react';
import Button from './Button/button';
import EditButton from './Button/edit-button';
import UpdateTask from './UpdateTaskModal/update-task'; // Import the updated Task Modal
import { deleteTask } from "@/app/actions/delete";

const ListTask = ({ tasks = [] }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true); // Show modal when Edit is clicked
  };

  const handleDelete = async (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const response = await deleteTask(taskId); // taskId passed correctly
      if (response.success) {
        alert("Task deleted successfully!");
        window.location.reload(); // Refresh tasks
      } else {
        alert(`Failed to delete task: ${response.error}`);
      }
    }
  };
  

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">List of Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const [isBellActive, setIsBellActive] = useState(task.reminder);
            const handleBellClick = () => {
              setIsBellActive(!isBellActive);
            };

            const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 3600 * 24));

            return (
              <div key={task._id} className="bg-white p-4 rounded-xl shadow-md border-2 border-gray-200 hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-button">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    {task.reminder && (
                      <span className="text-red-500 flex items-center cursor-pointer" onClick={handleBellClick}>
                        {isBellActive ? (
                          <span role="img" aria-label="bell" className="text-red-500">🔔</span>
                        ) : (
                          <span role="img" aria-label="bell-outline" className="text-gray-500">🔕</span>
                        )}
                        <span className="ml-1">{daysLeft} days</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-semibold">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className="">{task.description}</p>
                
               
                <div className="flex space-x-2">
                  {task.tags && task.tags.length > 0 ? (
                    task.tags.map((tag, index) => (
                      <p key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm my-2">
                        {tag}
                      </p>
                    ))
                  ) : (
                    <p>No tags available</p>
                  )}
                </div>



                <div className="flex justify-between items-center my-2">
                  <p className={`text-md rounded-md p-1 text-center w-1/3 ${task.priority === 'high' ? 'text-red-500' : 'text-white bg-yellow-500'}`}>{task.priority}</p>
                  <p className={`text-md rounded-md p-1 text-center w-1/3 ${task.status === 'Completed' ? 'text-green-500 bg-green-500 bg-opacity-20' : 'text-blue-500 bg-blue-500 bg-opacity-20'}`}>{task.status}</p>
                </div>

                <div className="flex w-full space-x-2 justify-between items-center my-2">
                  <EditButton text={"Edit"} onClick={() => handleEditClick(task)} />
                  <EditButton text={"Delete"} deleting onClick={() => handleDelete(task._id)} />
                </div>

                <EditButton text={"View Details"} />
              </div>
            );
          })}
        </div>
      )}

      {/* Show Modal for Editing */}
      {showModal && <UpdateTask setShowModal={setShowModal} task={selectedTask} />}
    </div>
  );
};

export default ListTask;
