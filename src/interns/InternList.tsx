import {
    Datagrid,
    DateField,
    DeleteButton,
    EditButton,
    FilterButton,
    List,
    ReferenceField,
    SearchInput,
    TextField,
    TopToolbar,
    CreateButton,
    FunctionField,
} from "react-admin";

const internFilters = [
    <SearchInput key="search" source="q" alwaysOn />,
];

const ListActions = () => (
    <TopToolbar>
        <FilterButton />
        <CreateButton />
    </TopToolbar>
);

export const InternList = () => (
    <List
        filters={internFilters}
        perPage={5}
        actions={<ListActions />}
    >
        <Datagrid rowClick="show">
            <TextField source="firstname" label="Prénom" />
            <TextField source="lastname" label="Nom" />
            <TextField source="email" label="Email" />
            <TextField source="school" label="École" />
            <DateField source="startDate" label="Début" />
            <DateField source="endDate" label="Fin" />
            <ReferenceField
                source="supervisorId"
                reference="employees"
                label="Encadreur"
            >
                <FunctionField render={(record: { firstname: string; lastname: string }) => `${record.firstname} ${record.lastname}`} />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);