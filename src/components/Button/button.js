import {motion} from "framer-motion";

const Button = ({text, onClick, type, create}) => {
  return (
    <motion.button 
        initial={{y: 0, opacity: 1}}
        whileHover={{y: 5, opacity: 0.9}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        type={type}
        className={`bg-button ${create ? "md:w-1/2 w-full": "md:w-1/6 w-1/2 my-10"} text-white font-medium text-center p-2 mx-5 rounded-md`}
        onClick={onClick}>
            {text}
    </motion.button>
  )
}

export default Button