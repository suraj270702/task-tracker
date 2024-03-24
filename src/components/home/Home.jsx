import React, { useEffect, useState } from "react";
import userImg from "../../assets/user-image.jpg";
import AddTask from "../cards/AddTask";
import threeDotImg from "../../assets/three-dot.svg";
import ToggleButton from "../cards/ToggleButton";
import EditTask from "../cards/EditTask";
import DeleteTask from "../cards/DeleteTask";
import Datepicker from "react-tailwindcss-datepicker";

const Home = () => {
  const [taskStateOpen, setTaskStateOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTaskStateOpen, setEditTaskStateOpen] = useState(false);
  const [deleteTaskStateOpen, setDeleteTaskStateOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [pendingTasks, setPendingTasks] = useState();
  const [isProgressTasks, setIsProgressTasks] = useState();
  const [completedTasks, setCompletedTasks] = useState();
  const [deployedTasks, setDeployedTasks] = useState();
  const [defferedTasks, setDefferedTasks] = useState();
  const [assigneeName, setAssigneeName] = useState();
  const [priority, setPriority] = useState();
  const [date, setDate] = useState(new Date());
  const [sort,setSort] = useState("high-to-low")
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [singleTask, setSingleTask] = useState();
  useEffect(() => {
    // Sort tasks based on the `sort` state
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorities = ['low', 'medium', 'high']; // Define priority order
      const priorityA = priorities.indexOf(a.priority);
      const priorityB = priorities.indexOf(b.priority);
  
      // Sort high-to-low
      if (sort === 'high-to-low') {
        return priorityB - priorityA;
      }
      // Sort low-to-high
      else if (sort === 'low-to-high') {
        return priorityA - priorityB;
      }
      // Default to no sorting change if sort state is not recognized
      return 0;
    });
  
    const pendingTasks = [];
    const progressTasks = [];
    const completedTasks = [];
    const deployedTasks = [];
    const defferedTasks = [];
  
    // Categorize sorted tasks by status
    for (const task of sortedTasks) {
      if (task.status === "pending") {
        pendingTasks.push(task);
      } else if (task.status === "in progress") {
        progressTasks.push(task);
      } else if (task.status === "completed") {
        completedTasks.push(task);
      } else if (task.status === "deployed") {
        deployedTasks.push(task);
      } else if (task.status === "deffered") {
        defferedTasks.push(task);
      }
    }
  
    // Update state for each task category
    setPendingTasks(pendingTasks);
    setIsProgressTasks(progressTasks);
    setCompletedTasks(completedTasks);
    setDeployedTasks(deployedTasks);
    setDefferedTasks(defferedTasks);
  }, [tasks, sort]);

  const [originalTasks, setOriginalTasks] = useState([]);

  useEffect(() => {
    if (tasks.length > 0 && originalTasks.length === 0) {
      setOriginalTasks(tasks);
    }
  }, [tasks, originalTasks]);

  useEffect(() => {
    let filteredTasks = originalTasks;

    if (
      assigneeName !== undefined &&
      priority !== undefined &&
      priority !== "priority"
    ) {
      filteredTasks = originalTasks.filter(
        (task) =>
          task.assignee.includes(assigneeName) && task.priority === priority
      );
    } else if (assigneeName !== undefined || priority !== undefined) {
      filteredTasks = originalTasks.filter((task) => {
        if (assigneeName !== undefined && priority === undefined) {
          return task.assignee.includes(assigneeName);
        } else if (
          assigneeName === undefined &&
          priority !== undefined &&
          priority !== "priority"
        ) {
          return task.priority === priority;
        }
      });
    }

    const startDate = value.startDate ? new Date(value.startDate) : null;
    const endDate = value.endDate ? new Date(value.endDate) : null;
    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(0, 0, 0, 0);
    console.log("startdate", startDate);
    console.log("end date", endDate);

    if (startDate && endDate) {
      filteredTasks = filteredTasks.filter((task) => {
        const taskCreatedAt = new Date(task.createdAt);
        const taskCompletedAt = new Date(task.completedAt || task.createdAt);
        console.log("taskcompleted", taskCompletedAt);
        console.log("taskcreated At", taskCreatedAt);

        return taskCreatedAt >= startDate && taskCompletedAt <= endDate;
      });
    }

    setTasks(filteredTasks);
  }, [assigneeName, priority, value, originalTasks]);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div className="relative">
      <div
        className={`w-[96%]  2xl:w-[85%] mx-auto z-10 ${
          taskStateOpen
            ? "opacity-10"
            : editTaskStateOpen
            ? "opacity-10"
            : deleteTaskStateOpen
            ? "opacity-10"
            : ""
        }`}
      >
        <div className="mt-5 md:mt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-[30px] font-bold text-white">TaskBoard</h1>
            <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full bg-white flex items-center justify-center">
              <img src={userImg} alt="user" className=" mix-blend-multiply" />
            </div>
          </div>
          <div className="mt-10 border border-solid border-white rounded-lg h-full  p-5 lg:p-10">
            <div>
              <div className="flex flex-col lg:flex-row gap-y-5 items-center justify-between">
                <div className="flex flex-col lg:flex-row gap-y-5 items-center gap-x-3">
                  <h1 className="text-[15px] md:text-[20px] font-medium text-white/80">
                    Filter By
                  </h1>
                  <input
                    value={assigneeName}
                    onChange={(e) => setAssigneeName(e.target.value)}
                    className="w-full lg:w-[200px] py-2.5 rounded-lg pl-4  bg-transparent placeholder:text-white/80  bg-slate-800 text-white/80"
                    placeholder="assignee name"
                  />
                  <select
                    value={priority === "priority" ? "" : priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full lg:w-[200px] py-2.5 pl-4 rounded-lg  bg-transparent bg-slate-800 text-white/80"
                  >
                    <option value="" hidden>
                      priority
                    </option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                  </select>
                  <Datepicker value={value} onChange={handleValueChange} />
                </div>
                <button
                  onClick={() => setTaskStateOpen(true)}
                  className="lg:w-[200px] w-full bg-slate-800 rounded-lg  text-[20px] font-bold py-3 text-white/80 transition ease-in-out hover:bg-white hover:text-[#292B32]"
                >
                  Add a new Task
                </button>
              </div>
              <div className="flex items-center justify-between lg:justify-start lg:gap-x-5 mt-5">
                <h1 className="text-[15px] md:text-[20px] font-medium text-white/80">
                  Sort By
                </h1>
                <select value={sort} onChange={(e)=>setSort(e.target.value)} className="w-full lg:w-[200px] py-2.5 pl-4 rounded-lg  bg-transparent bg-slate-800 text-white/80">
                  
                  <option value="high-to-low">High to Low</option>
                  <option value="low-to-high">Low to High</option>
                  
                </select>
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-5">
                <div className="h-full  bg-slate-800">
                  <div className="bg-gray-500 py-3">
                    <h1 className="text-center text-white font-bold text-[20px]">
                      Pending
                    </h1>
                  </div>
                  <div className="mt-5">
                    {pendingTasks &&
                      pendingTasks.length > 0 &&
                      pendingTasks.map((item, i) => (
                        <div
                          className="w-[95%] mx-auto  bg-[#292B32] rounded-lg h-full p-3 mb-3"
                          key={i}
                        >
                          <div>
                            <div className="py-3 flex items-center justify-between border-b">
                              <h1 className="text-white/80 font-bold ">
                                {item.task}
                              </h1>
                              <span className="text-white/80 text-sm font-bold px-3 py-2  rounded-lg bg-slate-800">
                                {item.priority}
                              </span>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-white/80">
                                {item.description}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <h1 className="text-white/80 font-bold ">
                                @{item.assignee}
                              </h1>
                              <button
                                className="text-[#292B32] font-bold p-1 rounded-md bg-slate-800"
                                onClick={() => {
                                  setSingleTask(item);
                                  taskId !== ""
                                    ? setTaskId("")
                                    : setTaskId(item.id);
                                }}
                              >
                                <img
                                  src={threeDotImg}
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                              </button>
                            </div>
                            {taskId === item.id && (
                              <div className="w-full">
                                <ToggleButton
                                  toggle={taskId}
                                  setToggle={setTaskId}
                                  editTaskOpen={editTaskStateOpen}
                                  setEditTaskOpen={setEditTaskStateOpen}
                                  singleTask={singleTask}
                                  setSingleTask={setSingleTask}
                                  deleteTask={deleteTaskStateOpen}
                                  setDeleteTask={setDeleteTaskStateOpen}
                                />
                              </div>
                            )}
                            <div className="w-full bg-gray-500 py-2 mt-3">
                              <h1 className=" text-white/80 font-bold text-center">
                                {item.status}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="h-full bg-slate-800">
                  <div className="bg-yellow-500 py-3">
                    <h1 className="text-center text-white font-bold text-[20px]">
                      In Progress
                    </h1>
                  </div>
                  <div className="mt-5">
                    {isProgressTasks &&
                      isProgressTasks.length > 0 &&
                      isProgressTasks.map((item, i) => (
                        <div
                          className="w-[95%] mx-auto bg-[#292B32] rounded-lg h-full p-3 mb-3"
                          key={i}
                        >
                          <div>
                            <div className="py-3 flex items-center justify-between border-b">
                              <h1 className="text-white/80 font-bold ">
                                {item.task}
                              </h1>
                              <span className="text-white/80 text-sm font-bold px-3 py-2  rounded-lg bg-slate-800">
                                {item.priority}
                              </span>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-white/80">
                                {item.description}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <h1 className="text-white/80 font-bold ">
                                @{item.assignee}
                              </h1>
                              <button
                                className="text-[#292B32] font-bold p-1 rounded-md bg-slate-800"
                                onClick={() => {
                                  setSingleTask(item);
                                  taskId !== ""
                                    ? setTaskId("")
                                    : setTaskId(item.id);
                                }}
                              >
                                <img
                                  src={threeDotImg}
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                              </button>
                            </div>
                            {taskId === item.id && (
                              <div className="w-full">
                                <ToggleButton
                                  toggle={taskId}
                                  setToggle={setTaskId}
                                  editTaskOpen={editTaskStateOpen}
                                  setEditTaskOpen={setEditTaskStateOpen}
                                  singleTask={singleTask}
                                  setSingleTask={setSingleTask}
                                  deleteTask={deleteTaskStateOpen}
                                  setDeleteTask={setDeleteTaskStateOpen}
                                />
                              </div>
                            )}
                            <div className="w-full bg-yellow-500 py-2 mt-3">
                              <h1 className=" text-white font-bold text-center">
                                {item.status}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="h-full  bg-slate-800">
                  <div className="bg-green-500 py-3">
                    <h1 className="text-center text-white font-bold text-[20px]">
                      Completed
                    </h1>
                  </div>
                  <div className="mt-5">
                    {completedTasks &&
                      completedTasks.length > 0 &&
                      completedTasks.map((item, i) => (
                        <div
                          className="w-[95%] mx-auto bg-[#292B32] rounded-lg h-full p-3 mb-3"
                          key={i}
                        >
                          <div>
                            <div className="py-3 flex items-center justify-between border-b">
                              <h1 className="text-white/80 font-bold ">
                                {item.task}
                              </h1>
                              <span className="text-white/80 text-sm font-bold px-3 py-2  rounded-lg bg-slate-800">
                                {item.priority}
                              </span>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-white/80">
                                {item.description}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <h1 className="text-white/90 font-bold ">
                                @{item.assignee}
                              </h1>
                              <button
                                className="text-[#292B32] font-bold p-1 rounded-md bg-slate-800"
                                onClick={() => {
                                  setSingleTask(item);
                                  taskId !== ""
                                    ? setTaskId("")
                                    : setTaskId(item.id);
                                }}
                              >
                                <img
                                  src={threeDotImg}
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                              </button>
                            </div>
                            {taskId === item.id && (
                              <div className="w-full">
                                <ToggleButton
                                  toggle={taskId}
                                  setToggle={setTaskId}
                                  editTaskOpen={editTaskStateOpen}
                                  setEditTaskOpen={setEditTaskStateOpen}
                                  singleTask={singleTask}
                                  setSingleTask={setSingleTask}
                                  deleteTask={deleteTaskStateOpen}
                                  setDeleteTask={setDeleteTaskStateOpen}
                                />
                              </div>
                            )}
                            <div className="w-full bg-green-500 py-2 mt-3">
                              <h1 className=" text-white font-bold text-center">
                                {item.status}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="h-full  bg-slate-800">
                  <div className="bg-blue-500 py-3">
                    <h1 className="text-center text-white font-bold text-[20px]">
                      Deployed
                    </h1>
                  </div>
                  <div className="mt-5">
                    {deployedTasks &&
                      deployedTasks.length > 0 &&
                      deployedTasks.map((item, i) => (
                        <div
                          className="w-[95%] mx-auto  rounded-lg h-full p-3 mb-3 bg-[#292B32]"
                          key={i}
                        >
                          <div>
                            <div className="py-3 flex items-center justify-between border-b">
                              <h1 className="text-white/80 font-bold ">
                                {item.task}
                              </h1>
                              <span className="text-white/80 text-sm font-bold px-3 py-2  rounded-lg bg-slate-800">
                                {item.priority}
                              </span>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-white/80">
                                {item.description}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <h1 className="text-white/80 font-bold ">
                                @{item.assignee}
                              </h1>
                              <button
                                className="text-[#292B32] font-bold p-1 rounded-md bg-slate-800"
                                onClick={() => {
                                  setSingleTask(item);
                                  taskId !== ""
                                    ? setTaskId("")
                                    : setTaskId(item.id);
                                }}
                              >
                                <img
                                  src={threeDotImg}
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                              </button>
                            </div>
                            {taskId === item.id && (
                              <div className="w-full">
                                <ToggleButton
                                  toggle={taskId}
                                  setToggle={setTaskId}
                                  editTaskOpen={editTaskStateOpen}
                                  setEditTaskOpen={setEditTaskStateOpen}
                                  singleTask={singleTask}
                                  setSingleTask={setSingleTask}
                                  deleteTask={deleteTaskStateOpen}
                                  setDeleteTask={setDeleteTaskStateOpen}
                                />
                              </div>
                            )}
                            <div className="w-full bg-blue-500 py-2 mt-3">
                              <h1 className=" text-white font-bold text-center">
                                {item.status}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="h-full bg-slate-800">
                  <div className="bg-red-500 py-3">
                    <h1 className="text-center text-white font-bold text-[20px]">
                      Deffered
                    </h1>
                  </div>
                  <div className="mt-5">
                    {defferedTasks &&
                      defferedTasks.length > 0 &&
                      defferedTasks.map((item, i) => (
                        <div
                          className="w-[95%] mx-auto bg-[#292B32] rounded-lg h-full p-3 mb-3"
                          key={i}
                        >
                          <div>
                            <div className="py-3 flex items-center justify-between border-b">
                              <h1 className="text-white/80 font-bold ">
                                {item.task}
                              </h1>
                              <span className="text-white/80 text-sm font-bold px-3 py-2  rounded-lg bg-slate-800">
                                {item.priority}
                              </span>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-white/80">
                                {item.description}
                              </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <h1 className="text-white/80 font-bold ">
                                @{item.assignee}
                              </h1>
                              <button
                                className="text-[#292B32] font-bold p-1 rounded-md bg-slate-800"
                                onClick={() => {
                                  setSingleTask(item);
                                  taskId !== ""
                                    ? setTaskId("")
                                    : setTaskId(item.id);
                                }}
                              >
                                <img
                                  src={threeDotImg}
                                  alt=""
                                  className="w-[20px] h-[20px]"
                                />
                              </button>
                            </div>
                            {taskId === item.id && (
                              <div className="w-full">
                                <ToggleButton
                                  toggle={taskId}
                                  setToggle={setTaskId}
                                  editTaskOpen={editTaskStateOpen}
                                  setEditTaskOpen={setEditTaskStateOpen}
                                  singleTask={singleTask}
                                  setSingleTask={setSingleTask}
                                  deleteTask={deleteTaskStateOpen}
                                  setDeleteTask={setDeleteTaskStateOpen}
                                />
                              </div>
                            )}
                            <div className="w-full bg-red-500 py-2 mt-3">
                              <h1 className=" text-white font-bold text-center">
                                {item.status}
                              </h1>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {taskStateOpen && (
        <div className=" absolute top-[10%] left-0 z-50 w-full">
          <AddTask
            state={taskStateOpen}
            setState={setTaskStateOpen}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      )}
      {editTaskStateOpen && (
        <div className=" absolute top-[10%] left-0 z-50 w-full">
          <EditTask
            setState={setEditTaskStateOpen}
            singleTask={singleTask}
            setTasks={setTasks}
            tasks={tasks}
            setSingleTask={setSingleTask}
          />
        </div>
      )}
      {deleteTaskStateOpen && (
        <div className=" absolute top-[10%] left-0 z-50 w-full">
          <DeleteTask
            setState={setDeleteTaskStateOpen}
            state={deleteTaskStateOpen}
            tasks={tasks}
            setTasks={setTasks}
            singleTask={singleTask}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
