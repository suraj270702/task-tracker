import React, { useEffect, useState } from "react";

const EditTask = ({ state, setState,tasks,setTasks,singleTask,setSingleTask }) => {
    const [priority,setPriority] = useState(singleTask.priority ? singleTask.priority : "high")
    const [status,setStatus] = useState(singleTask.status ? singleTask.status : "pending")
    
    const updateTask = () => {
      
      const index = tasks.findIndex(task => task.id === singleTask.id);
  
      if (index !== -1) {
          
          const updatedTask = { ...tasks[index] };
  
          
          updatedTask.priority = priority;
          updatedTask.status = status;

          if(status==="completed"){
            let date = new Date()
            updatedTask.completedAt = date.toDateString()
          }
  
          
          const updatedTasks = [...tasks];
          updatedTasks[index] = updatedTask;
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          setTasks(updatedTasks);
          setState(false)
      }
  }
  return (
    <div className="flex items-center justify-center lg:h-screen">
        
      <div className="w-[95%] h-full lg:w-[500px] lg:h-[650px] mx-auto border border-solid border-white text-white p-5 md:p-10">
        <div className=" relative">
          <h1 className="text-center text-white/80 text-[30px] font-bold">
            Edit Task
          </h1>
          <button
            onClick={() => setState(false)}
            className="bg-white p-2 text-[#292B32] font-bold  absolute right-0 -top-0 "
          >
            X
          </button>
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">Task</label>
            <input
             //value={task}
             defaultValue={singleTask.task}
             className="w-full  py-2.5 rounded-lg pl-4   placeholder:text-white/80  bg-slate-800 text-white/80"
              placeholder="Enter a Task"
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">
              Description
            </label>
            <textarea
            //value={description}
            defaultValue={singleTask.description}
           
            className="w-full  py-2.5 rounded-lg pl-4   placeholder:text-white/80  bg-slate-800 text-white/80"
              placeholder="Enter a Description"
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">Assignee</label>
            <input
            //value={assignee}
            defaultValue={singleTask.assignee}
            onChange={(e)=>setAssignee(e.target.value)}
            className="w-full  py-2.5 rounded-lg pl-4   placeholder:text-white/80  bg-slate-800 text-white/80"
              placeholder="Enter a Assignee Name"
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">Priority</label>
            <select value={priority}  onChange={(e)=>setPriority(e.target.value)} className="w-full  py-2.5 pl-4 rounded-lg   bg-slate-800 text-white/80">
              
              <option value="high">High</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">Status</label>
            <select  value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full  py-2.5 pl-4 rounded-lg   bg-slate-800 text-white/80">
              
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="deployed">Deployed</option>
              <option value="deffered">Deffered</option>


            </select>
          </div>
          <div className="w-full">

          <button onClick={updateTask}  className=" w-full bg-slate-800 rounded-lg  text-[20px] font-bold py-3 text-white/80 transition ease-in-out hover:bg-white hover:text-[#292B32]">
                Update Task
              </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
