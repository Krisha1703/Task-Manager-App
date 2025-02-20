//List task component to display the list of retrieved tasks
import { useState, useEffect } from 'react';
import EditButton from './Button/edit-button';
import UpdateTask from './Modal/UpdateTaskModal/update-task';
import { deleteTask } from "@/app/actions/delete";
import FilterTask from './filter-task';

const ListTask = ({ tasks = [] }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [bellStates, setBellStates] = useState({});
  const [allTasks, setAllTasks] = useState(tasks);
  const [viewDetails, setViewDetails] = useState(null);

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
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

  const handleTaskUpdate = (updatedTask) => {
    setAllTasks(prevTasks => prevTasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setShowModal(false);
  };

  const toggleViewDetails = (taskId) => {
    setViewDetails(viewDetails === taskId ? null : taskId);
  };

  const handleBellClick = (taskId) => {
    setBellStates(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const getTasksByStatus = (status) => {
    return (filteredTasks.length > 0 ? filteredTasks : allTasks).filter(task => task.status === status);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Board</h1>
        <FilterTask setFilteredTasks={setFilteredTasks} tasks={allTasks} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn title="To Do" color="gray" tasks={getTasksByStatus("To Do")} handleEditClick={handleEditClick} handleDelete={handleDelete} toggleViewDetails={toggleViewDetails} viewDetails={viewDetails} handleBellClick={handleBellClick} bellStates={bellStates} />
        <TaskColumn title="In Progress" color="blue" tasks={getTasksByStatus("In Progress")} handleEditClick={handleEditClick} handleDelete={handleDelete} toggleViewDetails={toggleViewDetails} viewDetails={viewDetails} handleBellClick={handleBellClick} bellStates={bellStates} />
        <TaskColumn title="Completed" color="green" tasks={getTasksByStatus("Completed")} handleEditClick={handleEditClick} handleDelete={handleDelete} toggleViewDetails={toggleViewDetails} viewDetails={viewDetails} handleBellClick={handleBellClick} bellStates={bellStates} />
      </div>

      {/* Update Modal */}
      {showModal && <UpdateTask setShowModal={setShowModal} task={selectedTask} onUpdate={handleTaskUpdate} />}
    </div>
  );
};

// Reusable Task Column Component
const TaskColumn = ({ title, tasks, handleEditClick, handleDelete, toggleViewDetails, viewDetails, handleBellClick, bellStates }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md relative h-full`}>
      <div className='bg-button flex-1 top-0 left-0 h-10 rounded-t-lg'>
        <h2 className={`text-lg flex justify-center items-center h-full font-semibold text-white uppercase`}>{title} ({tasks.length})</h2>
      </div>
      <div className="space-y-4 p-4">
        {tasks.length === 0 ? <p>No tasks</p> : tasks.map(task => (
          <TaskCard key={task._id} task={task} onEdit={handleEditClick} onDelete={handleDelete} toggleViewDetails={toggleViewDetails} viewDetails={viewDetails} handleBellClick={handleBellClick} bellStates={bellStates} />
        ))}
      </div>
    </div>
  );
};

// Reusable Task Card Component
const TaskCard = ({ task, onEdit, onDelete, toggleViewDetails, viewDetails, handleBellClick, bellStates }) => {
  const isBellActive = bellStates[task._id] ?? task.reminder;
  const daysLeft = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 3600 * 24));

  return (
    <div className={`p-4 rounded-lg shadow-md border border-gray-200`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-button cursor-pointer" onClick={() => toggleViewDetails(task._id)}>{task.title}</h3>
        {task.reminder && (
          <span className="text-red-500 cursor-pointer text-nowrap" onClick={() => handleBellClick(task._id)}>
            {isBellActive ? '🔔' : '🔕'} <span className="ml-1 ">{daysLeft} days</span>
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="font-semibold">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

        <p className={`text-sm text-white rounded-md p-1 px-2 text-center w-1/4 ${
          task.priority === 'High' ? 'bg-red-500' : task.priority === 'Low' ? 'bg-yellow-500' : 'bg-orange-500'
        }`}>
          {task.priority}
        </p>
      </div>

      <p className="my-2">{task.description}</p>

      <div className="flex justify-between items-center my-2">
        <div className="flex space-x-2">
          {task.tags?.length ? (
            task.tags.map((tag, index) => (
              <p key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm my-2">
                {tag}
              </p>
            ))
          ) : (
            <p className='hidden'>No tags available</p>
          )}
        </div>
      </div>

      <div className="flex space-x-2 mt-3">
        <EditButton text={"Edit"} onClick={() => onEdit(task)} />
        <EditButton text={"Delete"} deleting onClick={() => onDelete(task._id)} />
      </div>

      {/* View Details Section */}
      {viewDetails === task._id && (
        <div className="mt-2 p-2 rounded-md bg-gray-100">
          <h1><strong>Assignee:</strong> {task.assignee || 'Not Assigned'}</h1>
          <h1><strong>Comments:</strong> {task.comments || 'No Comments'}</h1>
        </div>
      )}
    </div>
  );
};

export default ListTask;
