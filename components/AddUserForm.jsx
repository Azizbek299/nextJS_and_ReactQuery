import { useReducer } from "react";
import {BiPlus} from 'react-icons/bi'
import { useMutation, useQueryClient } from "react-query";
import {addUser, getUsers} from '../lib/helper'
import Bug from "./Bug";
import Success from "./Success";


const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};




const AddUserForm = () => {

  const [formData, setFormData] = useReducer(formReducer, {});

  const queryClient = useQueryClient()

  const addMutation = useMutation(addUser, {
    onSuccess:()=> {
      queryClient.prefetchQuery('users', getUsers)
    }
  })


  const handleSubmit = (e)=> { 
    e.preventDefault()

    // Validation for input fields fullfilled or ...
    if (Object.keys(formData).length == 0) {
        return console.log('Do not have Form Data') 
    }
    // console.log(formData) 
    let {firstname, lastname, email, salary, date, status} = formData

    const model = {
      name:`${firstname} ${lastname}`,
      avatar:`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg`,
      email, 
      salary,
      date,
      status:status ?? "Active"
    }

    addMutation.mutate(model)
  }


  if (addMutation.isLoading) {
    return <div>Loading ...</div>
  }

  if (addMutation.isError) {
    return <Bug messsage={addMutation.error.messsage}></Bug>
  }

  if (addMutation.isSuccess) {
    return <Success message={'New post added successfully'} ></Success>
  }
  

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 w-4/6 gap-4">
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="firstname"
          placeholder="First Name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="lastname"
          placeholder="Last Name"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="salary"
          placeholder="Salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <div className="input-type">
        <input
          onChange={setFormData}
          type="date"
          name="date"
          placeholder="Salary"
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
        className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-white hover:border-2 hover:border-green-500 hover:text-green-500"
      >
        Add <span className='px-1'><BiPlus size={24}/></span>
      </button>
    </form>
  );
};

export default AddUserForm;
