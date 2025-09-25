import { authAxios } from "..";
import routes from "../employee/route";

const API = {
    all: () => authAxios.get<ResponseBody<Array<Employee>>>(routes.all),
    create: (employee : Employee) => authAxios.post(routes.create, employee) ,
    update: (employee: Employee) => authAxios.put(routes.update + employee.id, employee)
}

export default API