'use server'
import employeeAPI from '@/api/employee'
import { revalidatePath } from 'next/cache'

export const create = async (employee: Employee) => {
    await employeeAPI.create(employee)
    revalidatePath("/employees")
}

export const update = async (employee: Employee) => {
    const res = await employeeAPI.update(employee)
    console.log(res)
    revalidatePath("/employees")
}