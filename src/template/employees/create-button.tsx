'use client'

import { Button } from "@/components/ui/button";
import useEmployeeDialog from "./store";

export default function CreateButton() {
    const { isOpen , setIsOpen, setEmployee }  = useEmployeeDialog.getState()

    return <Button onClick={ () => {setEmployee(undefined); setIsOpen(true)}} >Create Employee</Button>
}