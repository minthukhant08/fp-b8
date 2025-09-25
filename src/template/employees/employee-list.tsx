import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"
import CreateButton from "./create-button"
import EmployeeDialog from "./employee-dialog"
type EmployeeListTemplateProps = {
    employees? : Array<Employee>
}

export default function EmployeeListTemplate({ employees } : EmployeeListTemplateProps){

    return (
         <div className="container mx-auto py-10">
            <CreateButton/>
            <EmployeeDialog/>
            <DataTable columns={columns} data={employees ? employees : []} />
        </div>
    )
}