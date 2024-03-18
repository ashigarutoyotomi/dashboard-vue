import http from '../api'
import { APIResponse } from '../types'
import { User, InputCreateUser } from './types'

// async function getUsers() {
//   return await http.get<APIResponse<User[]>>('school')
// }

// async function deleteUser(id: number) {
//   return await http.delete<APIResponse<boolean>>(`school/${id}`)
// }

async function createUser(input: InputCreateUser) {
  return await http.post<APIResponse<User>>('school', input)
}

// async function updateUser(input: InputUpdateUser) {
//   return await http.put<APIResponse<boolean>>('school', input)
// }

export default {
  createUser
}
