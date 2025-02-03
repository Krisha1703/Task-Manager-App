import Button from "../Button/button";

const SubmitButton = ({type, create}) => {
  return (
    <Button type={type} text={"Create Task"} create={create}/>
  )
}

export default SubmitButton