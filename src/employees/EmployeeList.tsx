import {
    BooleanField,
    Datagrid,
    EditButton,
    DeleteButton,
    FilterButton,
    List,
    NumberField,
    SearchInput,
    SelectInput,
    TextField,
    TopToolbar,
    CreateButton,
} from "react-admin";

const employeeFilters = [
    <SearchInput key="search" source="q" alwaysOn />,
    <SelectInput
        key="department"
        source="department"
        choices={[
        { id: "Informatique", name: "Informatique" },
        { id: "Marketing", name: "Marketing" },
        { id: "RH", name: "RH" },
        { id: "Finance", name: "Finance" },
        ]}
    />,
];

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

export const EmployeeList = () => (
    <List
        filters={employeeFilters}
        perPage={5}
        actions={<ListActions />}
    >
        <Datagrid rowClick="show">
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />
        <NumberField
            source="salary"
            label="Salaire"
            options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source="active" label="Actif" />
        <EditButton />
        <DeleteButton />
        </Datagrid>
    </List>
);