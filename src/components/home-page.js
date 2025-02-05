// HomePage.js
import AddTask from "./Modal/AddTaskModal/add-task";
import Button from "./Button/button";
import Header from "./header";
import { useState } from "react";
import ListTask from "../app/task/page";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession(); 

  const handleCreateTask = () => {
    if (!session) {
      alert("Please login to create a task.");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div>
      <Header  />

      <div className="border-2 border-white border-solid w-full rounded-xl p-4">
        <Button text={"Create New Task"} onClick={handleCreateTask} />

        {showModal && session  && <AddTask setShowModal={setShowModal} />}
      </div>

      {session  ? (
        <ListTask />
      ) : (
        <p className="text-center text-xl font-semibold mb-4 mt-8">
          Please login by clicking on user icon to view and manage tasks.
        </p>
      )}
    </div>
  );
};

export default HomePage;
