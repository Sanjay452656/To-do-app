import { useState,useEffect } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {

  const [todo, settodo] = useState("")
  const [showfinished, setshowfinished] = useState(true)

  const [todos, settodos] = useState(()=>{
    const saved=localStorage.getItem('todos');
    return saved?JSON.parse(saved):[];
  });

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])
  
  const togglefinished=()=>{
    setshowfinished(!showfinished)
  }

  const savetoLS=(newTodos)=>{
    localStorage.setItem("todos",JSON.stringify(newTodos))
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    // savetoLS();
  }

  const handleDelete=(e,id)=>{
    console.log(`the id is ${id}`)
    let newtodos=todos.filter(item=>{
      return item.id!==id;
    });
    settodos(newtodos);
    //  savetoLS();
  }

  const handleAdd=()=>{
    settodos( [...todos,{ id:uuidv4(), todo,isCompleted:false} ] )
    settodo("")
    console.log(todos)
    //  savetoLS();
  }

  const handleChange=(e)=>{
    settodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    console.log(e,e.target)
    let id=e.target.name;
    console.log(`This is a unique ${id}`)
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    console.log(index)
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    settodos(newtodos)
    console.log(newtodos,todo)
    //  savetoLS();
  }

  return (
    <>
    <Navbar/>
       <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2 ">
       <h1 className='font-bold text-center text-xl'>MyTask - Manage your task at one place</h1>
      <div className="addtodo my-3">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-3/4 rounded-lg px-5 py-1'  />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 disabled:bg-violet-900'>Add</button>
      </div>
      <input onClick={togglefinished} type="checkbox" name="" id="" checked={showfinished} /> Show Finished
          <h2 className='text-lg font-bold'>Your Todos</h2>

          <div className="todos">
            {todos.length===0 && <div className='my-1'>No todos to display</div> }
            {todos.map(item=>{
           return (showfinished|| !item.isCompleted) && <div key={item.id} className="todo flex w-2/3 my-3 justify-between ">
            <div className='flex gap-5'>
              <input onClick={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""} >
               {item.todo}
            </div>
      
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{ handleEdit(e,item.id)} } className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' >Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' >Delete</button>
              </div>
              </div>  
  })}
            </div> 

       </div>
    </>
  );
}

export default App
