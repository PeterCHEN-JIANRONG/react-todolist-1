const { useState } = React;

// function App(){
//   return (
//     <>
//       <input value={value} type="text" onChange={(e)=> setValue(e.target.value)} />
//       <input type="button" value="儲存" onClick={addTodo} />
//       <ul>
//         {
//           todo.map((item,i)=> <li key={i}>{item}</li>)
//         }
//       </ul>
//     </>
//   )
// }
function App() {
  const [todo,setTodo]= useState([
    {content:'今天要刷牙1', finished:false},
    {content:'今天要刷牙2', finished:false},
    {content:'今天要刷牙3', finished:false},
  ]);
  const [value,setValue] = useState("");
  
  function addTodo(){
    setTodo([...todo,value]);
  }

  function TodoItem(props){
    return (
      <li>
        <label className="todoList_label">
          <input
            className="todoList_input"
            type="checkbox"
            value="true"
          />
          <span>{props.content}</span>
        </label>
        <a href="#">
          <i className="fa fa-times"></i>
        </a>
      </li>
    )
  }

  const todoListRender = () => {
    // todo 有值
    if(todo.length){
      const todolist = todo.map((item, i)=>{
        return <TodoItem key={i} content={item.content}/>
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
              <input value={value} onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder="請輸入待辦事項" />
              <a href="#">
                <i className="fa fa-plus"></i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  { todoListRender() }
                </ul>
                <div className="todoList_statistics">
                  <p> 5 個已完成項目</p>
                  <a href="#">清除已完成項目</a>
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
