import React, { useState } from "react"
import { useQuery, useMutation, NetworkStatus } from "@apollo/client"
import gql from "graphql-tag"

const todosQuery = gql`
  {
    todos {
      id
      title
      done
    }
  }
`

const addTodoMutation = gql`
  mutation addTodo($title: String!) {
    addTodo(title: $title) {
      id
    }
  }
`
const updateTodoMutation = gql`
  mutation updateTodo($id: ID!, $done: Boolean!) {
    updateTodo(id: $id, done: $done) {
      id
    }
  }
`

const Dashboard = () => {
  const { loading, error, data, networkStatus } = useQuery(todosQuery, {
    notifyOnNetworkStatusChange: true,
  })
  const [addTodo] = useMutation(addTodoMutation)
  const [updateTodo] = useMutation(updateTodoMutation)

  const [inputText, setInputText] = useState("")

  const onAddTodoClick = () => {
    if (!inputText || !inputText.trim()) {
      return
    }

    addTodo({
      variables: {
        title: inputText,
      },
      refetchQueries: [{ query: todosQuery }],
    }).then(() => setInputText(""))
  }

  const updateTodoClick = (id, value) => {
    updateTodo({
      variables: {
        id,
        done: value,
      },
      refetchQueries: [{ query: todosQuery }],
    })
  }

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching</p>

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>

  const { todos } = data

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
              <li key={i}>
                <input
                  type="checkbox"
                  name="done"
                  defaultChecked={todo.done}
                  onChange={e => updateTodoClick(todo.id, e.target.checked)}
                />
                <p>{todo.title}</p>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Dashboard
