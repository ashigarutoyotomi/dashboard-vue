import http from '../api'
import { APIResponse } from '../types'
import { Department, InputCreateDepartment, InputUpdateDepartment } from './types'

async function getDepartments() {
  return await http.get<APIResponse<Department[]>>('departments')
}

async function deleteDepartment(id: number) {
  return await http.delete<APIResponse<boolean>>(`departments/${id}`)
}

async function createDepartment(input: InputCreateDepartment) {
  return await http.post<APIResponse<Department>>('departments', input)
}

async function updateDepartment(input: InputUpdateDepartment) {
  return await http.put<APIResponse<boolean>>('departments', input)
}

export default {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments
}
