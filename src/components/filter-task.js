import React, { useState } from 'react';
import EditButton from './Button/edit-button';
import ModalHeader from './Modal/modal-header';
import ModalFooter from './Modal/modal-footer';
import SubmitButton from './Modal/submit-button';

const FilterTask = ({ setFilteredTasks }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    taskTitle: '',
    tags: '',
    taskStatus: '',
    taskPriority: '',
    taskAssignee: '',
    dueDate: ''
  });

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });

      const data = await response.json();
      setFilteredTasks(data.tasks); // Update the parent component with filtered tasks
      toggleFilterModal();
    } catch (error) {
      console.error('Error filtering tasks:', error);
    }
  };

  return (
    <div className='w-1/6'>
      <EditButton text={"Filter Tasks"} onClick={toggleFilterModal} />

      {showFilterModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-0 rounded-lg w-1/3 shadow-lg">
            <ModalHeader text={"FILTER TASK"} setShowModal={toggleFilterModal} />

            <div className="p-4 bg-gradient-to-r from-primary to-secondary">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="taskTitle" className="block text-md font-medium">Task Title</label>
                  <input type="text" id="taskTitle" value={filters.taskTitle} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter title" />
                </div>

                <div className="mb-4">
                  <label htmlFor="tags" className="block text-md font-medium">Tags</label>
                  <input type="text" id="tags" value={filters.tags} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter tag" />
                </div>

                <div className='flex justify-between space-x-2'>
                  <div className="mb-4 w-full">
                    <label htmlFor="taskStatus" className="block text-md font-medium">Task Status</label>
                    <select id="taskStatus" value={filters.taskStatus} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">All</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <div className="mb-4 w-full">
                    <label htmlFor="taskPriority" className="block text-md font-medium">Task Priority</label>
                    <select id="taskPriority" value={filters.taskPriority} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
                      <option value="">All</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className='flex justify-between space-x-2'>
                  <div className="mb-4 w-full">
                    <label htmlFor="taskAssignee" className="block text-md font-medium">Assignee</label>
                    <input type="text" id="taskAssignee" value={filters.taskAssignee} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter assignee" />
                  </div>

                  <div className="mb-4 w-full">
                    <label htmlFor="dueDate" className="block text-md font-medium">Due Date</label>
                    <input type="date" id="dueDate" value={filters.dueDate} onChange={handleChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md" />
                  </div>
                </div>

                <div className="mt-4 w-2/3 ml-[18.5vw]">
                  <SubmitButton type="submit" create={true} text="Filter Task" />
                </div>
              </form>
            </div>
            <ModalFooter />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTask;
