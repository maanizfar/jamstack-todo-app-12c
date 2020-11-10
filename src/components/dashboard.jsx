import React, { useReducer, useState } from "react"

const Dashboard = () => {
  const [inputText, setInputText] = useState("")

  const todosReducer = (state, action) => {
    switch (action.type) {
      case "addTodo":
        return [{ title: inputText, done: false }, ...state]
      case "toggleTodo":
        const newState = [...state]
        newState[action.payload] = {
          done: !newState[action.payload].done,
          title: newState[action.payload].title,
        }

        return newState
    }
  }
  const [todos, dispatch] = useReducer(todosReducer, [])

  const onAddTodoClick = () => {
    if (!inputText || !inputText.trim()) {
      return
    }

    dispatch({ type: "addTodo" })
  }

  return (
    <div>
      <input
        type="text"
        name="todo"
        id="todo"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button onClick={() => onAddTodoClick()}>Add</button>

      <ul>
        {todos &&
          todos.map((todo, i) => {
            return (
              <li
                key={i}
                onClick={() => dispatch({ type: "toggleTodo", payload: i })}
              >
                <input type="checkbox" name="done" value={todo.done} />
                <p>{todo.title}</p>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Dashboard
