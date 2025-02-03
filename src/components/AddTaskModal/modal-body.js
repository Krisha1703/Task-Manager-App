import InputField from './input-field';
import SubmitButton from './submit-button';
import { useState } from 'react';
import { createTask } from "../../app/actions/create";

const ModalBody = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    tags: "",
    comments: "",
    assignee: "",
    reminder: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createTask(formData);
    if (result.success) {
      alert("Task created successfully!");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-primary to-secondary">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Row 1: Title, Due Date, Assignee */}
        <InputField 
          id="title"
          label="Title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter the task title"
        />

        <InputField 
          id="dueDate"
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <InputField 
          id="assignee"
          label="Assignee"
          type="text"
          value={formData.assignee}
          onChange={handleChange}
          required
        />

        {/* Row 2: Priority, Status, Tags */}
        <div>
          <label htmlFor="priority" className="block text-md font-medium">Priority</label>
          <select 
            id={"priority"}
            name={"priority"}
            value={formData.priority} 
            onChange={handleChange}
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-md font-medium">Status</label>
          <select 
            id={"status"} 
            name={"status"}
            value={formData.status} 
            onChange={handleChange}
            required 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <InputField 
          id={"tags"}
          name={"tags"}
          label="Tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Enter tags separated by commas"
        />

        {/* Row 3: Description, Comments, Reminder */}
        <div className="md:col-span-1">
          <InputField 
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            required
            description
            placeholder="Enter the task description"
          />
        </div>

        <div className="md:col-span-1">
          <InputField 
            id="comments"
            label="Comments/Notes"
            value={formData.comments}
            onChange={handleChange}
            description
            placeholder="Add any additional notes"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input 
            id={"reminder"}
            type={"checkbox"} 
            name={"reminder"}
            checked={formData.reminder} 
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="reminder" className="text-md font-medium">Reminder</label>
        </div>

        <div className="w-full md:ml-[70vw] ml-[-5vw]">
          <SubmitButton type="submit" create={true}/>
        </div>
      </form>
    </div>
  );
};

export default ModalBody;
