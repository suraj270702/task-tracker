import React, { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
const AddTask = ({ state, setState,tasks,setTasks }) => {
    const  [newTask, setNewTask] = useState("")
    const [description,setDescription] = useState("")
    const [assignee,setAssignee] = useState("")
    const [priority,setPriority] = useState("high")
    const handleSubmit = () => {
        // Validation checks
        if (!newTask || !description || !assignee) {
            if (!newTask) toast.error("Task is required");
            if (!description) toast.error("Description is required");
            if (!assignee) toast.error("Assignee is required");
            return; // Stop the function if any validation fails
        }

        const date = new Date();
        const id = uuidv4();

        const newData = {
            id: id,
            task: newTask,
            description: description,
            assignee: assignee,
            priority: priority,
            status: "pending",
            createdAt: date.toDateString(),
            completedAt: null
        };

        const updatedTasks = [...tasks, newData];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        // Reset form fields
        setNewTask("");
        setDescription("");
        setAssignee("");
        setPriority("");
        setState(false)
    };
  return (
    <div className="flex items-center justify-center lg:h-screen">
        <Toaster />
      <div className="w-[95%] h-full lg:w-[500px] lg:h-[550px] mx-auto border border-solid border-white text-white p-5 md:p-10">
        <div className=" relative">
          <h1 className="text-center text-white text-[30px] font-bold">
            Add Task
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
             value={newTask}
             onChange={(e)=>setNewTask(e.target.value)}
             className="w-full  py-2.5 rounded-lg pl-4   placeholder:text-white/80  bg-slate-800 text-white/80"
              placeholder="Enter a Task"
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">
              Description
            </label>
            <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full  py-2.5 rounded-lg pl-4   placeholder:text-white/80  bg-slate-800 text-white/80"
              placeholder="Enter a Description"
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">Assignee</label>
            <input
            value={assignee}
            onChange={(e)=>setAssignee(e.target.value)}
            className="w-full  py-2.5 rounded-lg pl-4   placeholder:text-white/80  bg-slate-800 text-white/80"
              placeholder="Enter a Assignee Name"
            />
          </div>
          <div className="flex flex-col gap-y-1 mb-3 w-full">
            <label className="text-md text-white/80 font-medium">Priority</label>
            <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full  py-2.5 pl-4 rounded-lg  bg-slate-800 text-white/80">
              
              <option value="high" >High</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <div className="w-full">

          <button onClick={handleSubmit}  className=" w-full bg-slate-800 rounded-lg  text-[20px] font-bold py-3 text-white/80 transition ease-in-out hover:bg-white hover:text-[#292B32]">
                Add a new Task
              </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
