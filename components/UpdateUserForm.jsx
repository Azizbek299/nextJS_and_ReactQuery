import { useReducer } from "react";
import {BiBrush} from 'react-icons/bi'
import {useDispatch, useSelector} from 'react-redux'
import { flagChangeAction, toggleChangeAction } from '../redux/reducer'
import {getUsers, updateUser} from '../lib/helper'
import { useMutation, useQueryClient } from "react-query";



const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};




const UpdateUserForm = () => {
  
  const dispatch = useDispatch()

  let data = useSelector((state)=> state.app.client.user)
  const {name, date, email, salary, status} = data

  let s = name.split(' ')

  const firstname = s[0]
  const lastname= s[1]
  
  

  const [formData, setFormData] = useReducer(formReducer, {});


  const queryClient = useQueryClient()
  const updateMutation = useMutation((newData)=> updateUser(data._id, newData), {
      onSuccess: async(data)=> {
        queryClient.prefetchQuery('users', getUsers)
      }
  })

  const handleSubmit = async(e)=> { 
    e.preventDefault()
    
    let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`
    let updatedData = Object.assign({}, data, formData, {name:userName})   //  data , formData, {name:userName}  ларни уникальный ключ буйича бир-бирига кушиб ташлайди 

    await updateMutation.mutate(updatedData)

    dispatch(toggleChangeAction())
    dispatch(flagChangeAction(true))  
  }

  

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="firstname"
          defaultValue={firstname}
          placeholder="First Name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="lastname"
          defaultValue={lastname}
          placeholder="Last Name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="email"
          name="email"
          defaultValue={email}
          placeholder="Email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="salary"
          defaultValue={salary}
          placeholder="Salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="date"
          name="date"
          defaultValue={date}
          placeholder="Date"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            name="status"
            value="Active"
            defaultChecked={status=='Active'}
            id="radioDefault1"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>

        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            name="status"
            value="Inactive"
            defaultChecked={status=='Inactive'}
            id="radioDefault2"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-white hover:border-2 hover:border-green-500 hover:text-green-500"        
      >
        Update <span className='px-1'><BiBrush size={24}/></span>
      </button>
    </form>
  );
};

export default UpdateUserForm;
