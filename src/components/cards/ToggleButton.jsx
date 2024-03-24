import React from 'react'

const ToggleButton = ({toggle,setToggle,editTaskOpen,setEditTaskOpen,singleTask,setSingleTask,deleteTask,setDeleteTask}) => {
  return (
    <div className='w-full bg-transparent border border-solid border-white p-3 mt-3'>

        <div className='flex flex-col gap-y-3'>
            <button className='text-white text-md font-medium py-2 border border-solid border-white hover:border-[#292B32] hover:bg-white hover:text-[#292B32]' 
            onClick={()=>{
                setToggle("")
                setEditTaskOpen(true)
            }
            }
            >Edit</button>
            {
              singleTask.status !== "completed" && <button className='text-white text-md font-medium py-2 border border-solid border-white hover:bg-red-800 hover:text-white hover:border-[#292B32]' onClick={
                ()=>{
                  setToggle("")
                  setDeleteTask(true)
                }
              }>Delete</button>
            }
        </div>

    </div>
  )
}

export default ToggleButton