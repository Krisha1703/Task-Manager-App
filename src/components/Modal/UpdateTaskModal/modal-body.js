//Update Task - Modal Body
import InputField from '../input-field';
import SubmitButton from '../submit-button';
import { useState, useEffect } from 'react';
import { updateTask } from "@/app/actions/update"; 

const ModalBody = ({ taskId, existingData, setShowModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
    tags: [],
    comments: "",
    assignee: "",
    reminder: false,
  });

  const [tagInput, setTagInput] = useState("");

const handleTagAdd = () => {
  if (tagInput.trim() !== "" && !formData.tags.includes(tagInput.trim())) {
    setFormData({
      ...formData,
      tags: [...formData.tags, tagInput.trim()],
    });
    setTagInput("");
  }
};

const handleTagRemove = (tagToRemove) => {
  setFormData({
    ...formData,
    tags: formData.tags.filter(tag => tag !== tagToRemove),
  });
};

  useEffect(() => {
    if (existingData) {
      setFormData({
        title: existingData.title || "",
        description: existingData.description || "",
        dueDate: existingData.dueDate ? new Date(existingData.dueDate).toISOString().split('T')[0] : "",
        priority: existingData.priority || "",
        status: existingData.status || "",
        tags: Array.isArray(existingData.tags) ? existingData.tags : [], 
        comments: existingData.comments || "",
        assignee: existingData.assignee || "",
        reminder: existingData.reminder || false,
      });
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    const updatedTask = {
      taskId, 
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      tags: formData.tags,
      dueDate: formData.dueDate,
      comments: formData.comments,
      assignee: formData.assignee,
      reminder: formData.reminder,
    };

    try {
      const result = await updateTask(updatedTask); 
      if (result.success) {
        alert("Task updated successfully:", result.data);
        setShowModal(false);
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-primary to-secondary">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Title, Due Date, Assignee */}
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

        {/* Priority, Status, Tags */}
        <div>
          <label htmlFor="priority" className="block text-md font-medium">Priority</label>
          <select 
            id="priority"
            name="priority"
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
            id="status"
            name="status"
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

        {/* Tags Input */}
        <div>
          <label htmlFor="tags" className="block text-md font-medium">Tags</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            />
            <button
              onClick={handleTagAdd}
              className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary transition"
              type="button"
            >
              Add
            </button>
          </div>

          {/* Display Added Tags */}
          <div className="flex flex-wrap mt-2 space-x-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center space-x-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Description, Comments, Reminder */}
        <div className="md:col-span-1">
          <InputField 
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter the task description"
          />
        </div>

        <div className="md:col-span-1">
          <InputField 
            id="comments"
            label="Comments/Notes"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Add any additional notes"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input 
            id="reminder"
            type="checkbox" 
            name="reminder"
            checked={formData.reminder} 
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="reminder" className="text-md font-medium">Reminder</label>
        </div>

        <div className="w-full md:ml-[70vw] ml-[-5vw]">
          <SubmitButton type="submit" create={true} text="Update Task"/>
        </div>
      </form>
    </div>
  );
};

export default ModalBody;
