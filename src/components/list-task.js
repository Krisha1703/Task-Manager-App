//List task component to display the list of retrieved tasks
import { useState, useEffect } from 'react';
import EditButton from './Button/edit-button';
import UpdateTask from './Modal/UpdateTaskModal/update-task';
import { deleteTask } from "@/app/actions/delete";
import FilterTask from './filter-task';

const ListTask = ({ tasks = [] }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [bellStates, setBellStates] = useState({});
  const [allTasks, setAllTasks] = useState(tasks);

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const toggleViewDetails = (taskId) => {
    setViewDetails(viewDetails === taskId ? null : taskId);
  };

  const handleDelete = async (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const response = await deleteTask(taskId);
      if (response.success) {
        alert("Task deleted successfully!");
        setAllTasks(prev => prev.filter(task => task._id !== taskId));
      } else {
        alert(`Failed to delete task: ${response.error}`);
      }
    }
  };

  const handleBellClick = (taskId) => {
    setBellStates(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleTaskUpdate = (updatedTask) => {
    setAllTasks(prevTasks => prevTasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-4">List of Tasks</h1>
        <FilterTask setFilteredTasks={setFilteredTasks} tasks={allTasks} />
      </div>

      {(filteredTasks.length > 0 ? filteredTasks : allTasks).length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredTasks.length > 0 ? filteredTasks : allTasks).map((task) => {
            const isBellActive = bellStates[task._id] ?? task.reminder;
            const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 3600 * 24));

            return (
              <div key={task._id} className="bg-white p-4 rounded-xl shadow-md border-2 border-gray-200 hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-button">{task.title}</h3>
                  {task.reminder && (
                    <span className="text-red-500 cursor-pointer" onClick={() => handleBellClick(task._id)}>
                      {isBellActive ? '🔔' : '🔕'} <span className="ml-1">{daysLeft} days</span>
                    </span>
                  )}
                </div>

                <p className="font-semibold">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p>{task.description}</p>

                <div className="flex space-x-2">
                  {task.tags?.length ? (
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
                  <p className={`text-md text-white rounded-md p-1 text-center w-1/3 ${
                    task.priority === 'High' ? 'bg-red-500' : task.priority === 'Low' ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}>
                    {task.priority}
                  </p>

                  <p className={`text-md rounded-md p-1 text-center w-1/3 bg-opacity-20 ${
                    task.status === 'Completed' ? 'text-green-500 bg-green-500' : task.status === 'In Progress' ? 'text-blue-500 bg-blue-500' : 'text-yellow-500 bg-yellow-500'
                  }`}>
                    {task.status}
                  </p>
                </div>

                <div className="flex w-full space-x-2 justify-between items-center my-2">
                  <EditButton text={"Edit"} onClick={() => handleEditClick(task)} />
                  <EditButton text={"Delete"} deleting onClick={() => handleDelete(task._id)} />
                </div>

                <EditButton text={"View Details"} onClick={() => toggleViewDetails(task._id)} />
                {viewDetails === task._id && (
                  <div className="mt-2 p-2 rounded-md">
                    <h1><strong>Assignee:</strong> {task.assignee || 'Not Assigned'}</h1>
                    <h1><strong>Comments:</strong> {task.comments || 'No Comments'}</h1>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModal && <UpdateTask setShowModal={setShowModal} task={selectedTask} onUpdate={handleTaskUpdate} />}
    </div>
  );
};

export default ListTask;
