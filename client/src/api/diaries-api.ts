import { apiEndpoint, subDirectory, devapiEndpoint } from '../config'
import { Todo } from '../types/Todo'
import { CreateTodoRequest } from '../types/CreateTodoRequest'
import Axios from 'axios'
import { UpdateTodoRequest } from '../types/UpdateTodoRequest'

console.log('is offline:', process.env.REACT_APP_IS_OFFLINE)
let Endpoint: string
let JWTtoken: string
if (!process.env.REACT_APP_IS_OFFLINE) {
  Endpoint = apiEndpoint
} else {
  Endpoint = devapiEndpoint
}
console.log(Endpoint)

export async function getTodos(idToken: string): Promise<Todo[]> {
  console.log('Fetching todos')
  if (!process.env.REACT_APP_IS_OFFLINE) {
    console.log('Offline')
    JWTtoken = idToken
  } else {
    JWTtoken = '123'
  }
  console.log('My token id:', JWTtoken)
  console.log('get link: ', `${Endpoint}/${subDirectory}`)
  const response = await Axios.get(`${Endpoint}/${subDirectory}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWTtoken}`
    }
  })
  console.log('Todos:', response.data)
  console.log('token', JWTtoken)
  return response.data.items
}

export async function createTodo(
  idToken: string,
  newTodo: CreateTodoRequest
): Promise<Todo> {
  if (!process.env.REACT_APP_IS_OFFLINE) {
    console.log('Offline')
    JWTtoken = idToken
  } else {
    JWTtoken = '123'
  }
  const response = await Axios.post(
    `${Endpoint}/${subDirectory}`,
    JSON.stringify(newTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWTtoken}`
      }
    }
  )
  console.log(response.data)

  return response.data.newItem
}

export async function patchTodo(
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<void> {
  if (!process.env.REACT_APP_IS_OFFLINE) {
    JWTtoken = idToken
  } else {
    console.log('Offline')
    JWTtoken = '123'
  }
  await Axios.patch(
    `${Endpoint}/${subDirectory}/${todoId}`,
    JSON.stringify(updatedTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWTtoken}`
      }
    }
  )
}

export async function deleteTodo(
  idToken: string,
  todoId: string
): Promise<void> {
  if (!process.env.REACT_APP_IS_OFFLINE) {
    console.log('Offline')
    JWTtoken = idToken
  } else {
    JWTtoken = '123'
  }
  console.log('Deletion endpoint', `${Endpoint}/${subDirectory}/${todoId}`)
  await Axios.delete(`${Endpoint}/${subDirectory}/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWTtoken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  todoId: string
): Promise<string> {
  if (!process.env.REACT_APP_IS_OFFLINE) {
    console.log('Offline')
    JWTtoken = idToken
  } else {
    JWTtoken = '123'
  }
  const response = await Axios.post(
    `${Endpoint}/${subDirectory}/${todoId}/attachment`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWTtoken}`
      }
    }
  )
  console.log(response.data)

  return response.data.uploadUrl
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await Axios.put(uploadUrl, file)
}

export const checkAttachmentURL = async (
  attachmentUrl: string
): Promise<boolean> => {
  await Axios.get(attachmentUrl)

  return true
}
