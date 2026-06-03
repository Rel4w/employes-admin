import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternEdit } from "./interns/InternEdit";
import { InternShow } from "./interns/InternShow";
import { Dashboard } from "./Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource
            name="employees"
            list={EmployeeList}
            create={EmployeeCreate}
            edit={EmployeeEdit}
            show={EmployeeShow}
            icon={PeopleIcon}
            options={{ label: "Employés" }}
        />
        <Resource
            name="interns"
            list={InternList}
            create={InternCreate}
            edit={InternEdit}
            show={InternShow}
            icon={SchoolIcon}
            options={{ label: "Stagiaires" }}
        />
    </Admin>
);