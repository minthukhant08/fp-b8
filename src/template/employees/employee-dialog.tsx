'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import useEmployeeDialogStore from "./store"
import { create, update } from "./actions"
import { useShallow } from 'zustand/react/shallow';

export default function EmployeeDialog() {
  const { isOpen, setIsOpen, employee } = useEmployeeDialogStore(useShallow((state) => ({ isOpen: state.isOpen, setIsOpen: state.setIsOpen, employee: state.employee})))

  const employeeSchema = z.object({
    employee_id: z.string().min(1),
    finger_print_template: z.string().min(1),
  })

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee_id: employee ? employee.employee_id : "",
      finger_print_template: employee ? employee.finger_print_template : ""
    },
    values: {
      employee_id: employee ? employee.employee_id : "",
      finger_print_template: employee ? employee.finger_print_template : ""
    }
  })

  const handleSubmit = async (values : z.infer<typeof employeeSchema>) => {
    console.log(values)
    if (employee){
      console.log("update............")
      await update({...values, id: employee.id})
    }else{
      await create(values)
    }
      setIsOpen(false)
      form.reset()
  }
  return (
    <Dialog open={isOpen} onOpenChange={ () => setIsOpen(false)}>
      <form>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => { e.preventDefault()}}>
          <DialogHeader>
            <DialogTitle>{ employee? 'Update' : 'Create'} Employee</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="employee_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter empmloyee ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={form.control}
                name="finger_print_template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finger Print Template</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Finger Print Template" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={form.handleSubmit(handleSubmit)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


