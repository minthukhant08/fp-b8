import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"


type EmployeeDialogStore = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    employee?: Employee,
    setEmployee: (employee: Employee | undefined) => void
}
const useEmployeeDialogStore = create<EmployeeDialogStore>()(
  persist(
    (set, get) => ({
        isOpen: false,
        employee: undefined,
        setIsOpen: (value: boolean) => set({ isOpen: value}),
        setEmployee: (employee: Employee | undefined) => set({ employee: employee})
    }),
    {
      name: 'employee-dialog', 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
)

export default useEmployeeDialogStore