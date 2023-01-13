import Head from "next/head";
import Image from "next/image";
import Table from "../components/Table";
import Form from "../components/Form";
import {useSelector, useDispatch} from 'react-redux'
import { toggleChangeAction, flagChangeAction, userDeleteAction } from "../redux/reducer";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import { deleteUser, getUsers } from "../lib/helper";
import { useQueryClient } from "react-query";



export default function Home() {

  const dispatch = useDispatch()

  const visible = useSelector((state)=> state.app.client.toggleForm)
  const deleteId = useSelector((state)=> state.app.client.deleteId)

  const handleVisible = ()=> { 
    dispatch(toggleChangeAction())  
    dispatch(flagChangeAction(true))
  }


  const queryClient = useQueryClient()


  const cancelhandler = async()=> { 
    await dispatch(userDeleteAction(null))
  }


  const deletehandler = async()=> { 
    if (deleteId) {
      await deleteUser(deleteId)
      await queryClient.prefetchQuery('users', getUsers)
      await dispatch(userDeleteAction(null))
    }
  }


  return (
    <section>
      <Head>
        <title>Crud Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        

      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">
          Employee Manager
        </h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button onClick={handleVisible} className="flex bg-indigo-500 text-white px-4 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
              Add Employee
              <span className="px-1">
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
          { deleteId ? DeleteComponent({ deletehandler, cancelhandler }) : <></>}
        </div>

      
          {visible ? <Form/> : <></>}          
      

        <div className="container mx-auto">
          <Table />
        </div>
      </main>
    </section>
  );
}




function DeleteComponent({ deletehandler, cancelhandler }){
  return (
    <div className='flex gap-5'>
        <button>Are you sure?</button>
        <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
          Yes <span className='px-1'><BiX color='rgb(255 255 255)' size={25} /></span></button>
        <button onClick={cancelhandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50'>
          No <span className='px-1'><BiCheck color='rgb(255 255 255)' size={25} /></span></button>
    </div>
  )
}