import AddTask from "./AddTaskModal/add-task"
import Button from "./Button/button"
import Header from "./header"
import { useState } from "react"
import ListTask from "../app/task/page"

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div>
        <Header />

        <div className="border-2 border-white border-solid w-full rounded-xl">
            {/*Button to add new task*/ }
            <Button text={"Create New Task"} onClick={() => {setShowModal(true)}}/>

            {showModal && (
                <AddTask setShowModal={setShowModal} />
            )}

        </div>
        <ListTask />
    </div>
  )
}

export default HomePage