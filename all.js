const { useState } = React;

function App() {
  const [todos,setTodos]= useState([
    {id:1, content:'今天要刷牙1', completed:false},
    {id:2, content:'今天要洗臉2', completed:true},
    {id:3, content:'今天要漱口3', completed:false},
  ]);
  const [value,setValue] = useState("");
  
  function addTodo(e){
    e.preventDefault();
    if(value.trim() === "") {
      setValue('');
      return
    };
    const newTodo = {
      id: Date.now(),
      content: value.trim(),
      completed: false,
    }
    // console.log(newTodo);
    setTodos([newTodo, ...todos]);
    setValue('');
    document.getElementById("todoInput").focus();
  }

  function removeTodo(e, todo){
    e.preventDefault();
    setTodos(todos.filter(item=>item !== todo));
  }

  function removeCompletedAll(e){
    e.preventDefault();
    setTodos(todos.filter(item=>!item.completed));
  }

  // toggle todo completed
  function toggleTodo(todo){
    todo.completed = !todo.completed;
    setTodos([...todos]);
  }

  // TodoItem 元件
  function TodoItem(props){
    const {todo} = props;
    return (
      <li>
        <label className="todoList_label">
          <input
            className="todoList_input"
            type="checkbox"
            value="true"
            defaultChecked={todo.completed}
            onChange={()=>toggleTodo(todo)}
          />
          <span>{todo.content}</span>
        </label>
        <a href="#" onClick={(e)=>removeTodo(e, todo)}>
          <i className="fa fa-times"></i>
        </a>
      </li>
    )
  }

  const todoListRender = () => {
    // todo 有值
    if(todos.length){
      const todolist = todos.map((item, i)=>{
        return <TodoItem key={i} todo={item} />
      })
      return todolist
    } 
    
    // todo 無值
    return <li className="text-danger fw-bold">目前尚無代辦事項</li>
  }

  

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1>
            <a href="#">ONLINE TODO LIST</a>
          </h1>
          <ul>
            <li className="todo_sm">
              <a href="#">
                <span>王小明的代辦</span>
              </a>
            </li>
            <li>
              <a href="#loginPage">登出</a>
            </li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input id="todoInput" value={value} onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder="請輸入待辦事項" />
              <a href="#" onClick={addTodo}>
                <i className="fa fa-plus"></i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                  <li><a href="#" className="active">全部</a></li>
                  <li><a href="#">待完成</a></li>
                  <li><a href="#">已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  { todoListRender() }
                </ul>
                <div className="todoList_statistics">
                  <p> {todos.filter(i=>!i.completed).length} 個待完成項目</p>
                  <a href="#" onClick={removeCompletedAll}>清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
