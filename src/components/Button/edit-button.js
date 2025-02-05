//Animated button for editing and filtering task
import {motion} from "framer-motion";

const EditButton = ({text, onClick, type, deleting}) => {
  return (
    <motion.button 
        initial={{y: 0, opacity: 1}}
        whileHover={{y: 5, opacity: 0.9}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        type={type}
        className={` ${deleting ? "bg-delete" : "bg-button"} w-full  text-white font-medium text-center p-2  rounded-md`}
        onClick={onClick}>
            {text}
    </motion.button>
  )
}

export default EditButton