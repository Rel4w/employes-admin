import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
  </Admin>
);