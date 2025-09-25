"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Pen } from "lucide-react"
import useEmployeeDialogStore from "../store"



export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
  },
  {
    accessorKey: "finger_print_template",
    header: "Finger Print Tempmlate",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { setEmployee, setIsOpen } = useEmployeeDialogStore.getState()
      return <Button onClick={() => { setEmployee(row.original); setIsOpen(true) }}><Pen/></Button>
    }
  },
]