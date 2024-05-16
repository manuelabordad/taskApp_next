'use client';
import { ITask } from "@/types/tasks"
import React, { FormEventHandler, useState } from "react"
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import {useRouter} from "next/navigation"
import { deleteTodo, editTodo } from "@/api";

interface TaskProps{
    task:ITask
}

const Task: React.FC<TaskProps> = ({task}) => {

  const router = useRouter()

  const[openModalEdit ,setopenModalEdit]= useState<boolean>(false);
  const[openModalDelete, setopenModalDelete]= useState<boolean>(false);
  const [taskToEdit, settaskToEdit]= useState<string>(task.text)
  
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> =async(e)=>{
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setopenModalEdit(false)
    router.refresh()
  }
  const handleDeleteTask = async (id:string)=>{
    await deleteTodo(id);
    setopenModalDelete(false);
    router.refresh()

  }
  return (
    <tr key={task.id}>
    <td className="w-full">{task.text}</td>
    <td className="flex gap-5">
      <FiEdit onClick={()=>setopenModalEdit(true)} cursor="pointer" size={25} className="text-blue-500" />
      <Modal modalOpen={openModalEdit} setModalOpen={setopenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
            <input 
              value ={taskToEdit}
              onChange={e=>settaskToEdit(e.target.value)}
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full" 
            />
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
      <FiTrash2 onClick={()=>setopenModalDelete(true)} cursor="pointer" size={25} className="text-red-500"/>
      <Modal modalOpen={openModalDelete} setModalOpen={setopenModalDelete}>
          <h3>Are you sure you want to delete this task? </h3>
          <div className="modal-action">
              <button onClick={()=>handleDeleteTask(task.id)}>Yes</button>
          </div>
      </Modal>
    </td>
  </tr>
  )
}

export default Task