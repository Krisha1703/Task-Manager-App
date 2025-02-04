
const ModalHeader = ({setShowModal}) => {
  return (
    <div className=" px-4 py-3 flex justify-between items-center rounded-t-lg">
        <h4 className="text-lg font-semibold">UPDATE TASK</h4>
        <button
            type="button"
            className="text-xl font-bold hover:text-red-500"
            onClick={() => setShowModal(false)}
        >
            &times;
        </button>
    </div>
  )
}

export default ModalHeader