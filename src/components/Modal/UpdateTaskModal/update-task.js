//Update Task Modal
import ModalHeader from '../modal-header';
import ModalBody from '../UpdateTaskModal/modal-body';
import ModalFooter from '@/components/Modal/modal-footer';

const UpdateTask = ({ setShowModal, task }) => {
  const { _id, title, description, dueDate, priority, status, tags, comments, assignee, reminder } = task;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12">
        <ModalHeader setShowModal={setShowModal} text={"UPDATE TASK"} />
        {/* Pass the task data to ModalBody as existingData */}
        <ModalBody setShowModal={setShowModal} taskId={_id} existingData={{ title, description, dueDate, priority, status, tags, comments, assignee, reminder }} />
        <ModalFooter />
      </div> 
    </div>
  );
};

export default UpdateTask;

