import AddUserForm from "./AddUserForm"
import UpdateUserForm from "./UpdateUserForm"
import {useSelector} from 'react-redux'


const Form = () => {

  const flag = useSelector((state)=> state.app.client.flag)
  
  return (
    <div className="container mx-auto py-5">
      {flag ? <AddUserForm/> : <UpdateUserForm />}
      
    </div>
  )
}

export default Form