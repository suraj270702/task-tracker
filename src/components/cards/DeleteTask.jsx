import React, { useEffect } from 'react'

const DeleteTask = ({state,setState,tasks,setTasks,singleTask}) => {
    useEffect(()=>{
    console.log("single task from delete",singleTask)
    },[singleTask])
    const  handleDelete=()=>{
        const newTasks = tasks.filter((item)=>item.id !== singleTask.id)
        localStorage.setItem("tasks",JSON.stringify(newTasks))
        setTasks(newTasks)
        setState(false)
    }
  return (
    <div className="flex items-center justify-center lg:h-screen">
        
      <div className="w-[95%] h-full lg:w-[300px] lg:h-[200px] mx-auto border border-solid border-white text-white p-5 md:p-10">
        <h1 className='text-center text-md md:text-xl text-red-900 font-bold'>Are you sure you want to delete this </h1>
        <div className='mt-5 flex items-center gap-x-3 md:justify-between'>

            <button onClick={()=>setState(false)} className='w-1/2 py-3 border border-solid border-white text-white hover:bg-white hover:border-[#292B32] hover:text-[#292B32]'>
Cancel
            </button>

            <button onClick={handleDelete} className='w-1/2 py-3 border border-solid border-white text-white hover:bg-red-800 hover:border-[#292B32] hover:text-white'>
Delete
            </button>

        </div>
      </div>
    </div>
  )
}

export default DeleteTask