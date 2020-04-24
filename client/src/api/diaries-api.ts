import { apiEndpoint, subDirectory, devapiEndpoint } from '../config'
import { Diary } from '../types/Diary'
import { CreateDiaryRequest } from '../types/CreateDiaryRequest'
import Axios from 'axios'
import { UpdateDiaryRequest } from '../types/UpdateDiaryRequest'

console.log('is offline:', process.env.REACT_APP_IS_OFFLINE)
let Endpoint: string
let JWTtoken: string
if (!process.env.REACT_APP_IS_OFFLINE) {
  Endpoint = apiEndpoint
} else {
  Endpoint = devapiEndpoint
}
console.log(Endpoint)

export async function getDiaries(idToken: string): Promise<Diary[]> {
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
  console.log('Diaries:', response.data)
  console.log('token', JWTtoken)
  return response.data.items
}

export async function createDiary(
  idToken: string,
  newDiary: CreateDiaryRequest
): Promise<Diary> {
  if (!process.env.REACT_APP_IS_OFFLINE) {
    console.log('Offline')
    JWTtoken = idToken
  } else {
    JWTtoken = '123'
  }
  const response = await Axios.post(
    `${Endpoint}/${subDirectory}`,
    JSON.stringify(newDiary),
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

export async function patchDiary(
  idToken: string,
  todoId: string,
  updatedDiary: UpdateDiaryRequest
): Promise<void> {
  if (!process.env.REACT_APP_IS_OFFLINE) {
    JWTtoken = idToken
  } else {
    console.log('Offline')
    JWTtoken = '123'
  }
  await Axios.patch(
    `${Endpoint}/${subDirectory}/${todoId}`,
    JSON.stringify(updatedDiary),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWTtoken}`
      }
    }
  )
}

export async function deleteDiary(
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
