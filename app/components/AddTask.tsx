'use client';
import { AiOutlinePlus } from "react-icons/ai"
import Modal from "./Modal"
import { FormEventHandler, useState } from "react"
import { addTodo } from "@/api";
import {useRouter} from "next/navigation"
import {v4 as uuidv4} from 'uuid'

const AddTask = () => {
  const router = useRouter() // refreshing the page 
  const [modalOpen, setModalOpen]= useState<boolean>(false)
  const [newTaskValue, setnewTaskValue]= useState<string>("")

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement>=async(e)=>{
    e.preventDefault()
    await addTodo({
      id:uuidv4(),
      text: newTaskValue
    })
    setnewTaskValue("")
    setModalOpen(false)
    router.refresh()
  }
  return (
    <div>
        <button
          onClick={()=>setModalOpen(true)}
          className="btn btn-primary w-full"
        >
        ADD NEW TASK <AiOutlinePlus className="ml-2" size={18} />
        </button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add New Task</h3>
            <div className="modal-action">
            <input 
              value ={newTaskValue}
              onChange={e=>setnewTaskValue(e.target.value)}
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full" 
            />
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask