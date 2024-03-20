import userController from './users'
import employeeController from './employees'
import departmentController from './departments'
import StatsController from './stats'
export const API = {
  users: userController,
  employees: employeeController,
  departments: departmentController
  ,stats:StatsController
}
