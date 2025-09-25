import EmployeeListTemplate from "@/template/employees/employee-list"
import employee from '@/api/employee'

export default async function Employees() {
    const employees = await employee.all()
    
    return (
        <EmployeeListTemplate employees={employees.data.data}/>
    )
}