import {
    Datagrid,
    DateField,
    DeleteButton,
    EditButton,
    FilterButton,
    FunctionField,
    List,
    NumberField,
    ReferenceField,
    SearchInput,
    SelectInput,
    TextField,
    TopToolbar,
    CreateButton,
    BooleanField,
} from "react-admin";

const internFilters = [
    <SearchInput key="search" source="q" alwaysOn />,
    <SelectInput
        key="department"
        source="department"
        label="Département"
        choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" },
        ]}
    />,
    <SelectInput
        key="isRemunerate"
        source="isRemunerate"
        label="Rémunéré"
        choices={[
            { id: true, name: "Rémunéré" },
            { id: false, name: "Non rémunéré" },
        ]}
    />,
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
            <TextField source="department" label="Département" />
            <DateField source="startDate" label="Début" />
            <DateField source="endDate" label="Fin" />
            <BooleanField source="isRemunerate" label="Rémunéré" />
            <FunctionField
                label="Rémunération"
                render={(record: { isRemunerate?: boolean; remuneration?: number }) =>
                    record.isRemunerate && record.remuneration != null
                        ? new Intl.NumberFormat("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                          }).format(record.remuneration)
                        : "—"
                }
            />
            <ReferenceField
                source="supervisorId"
                reference="employees"
                label="Manager"
                link={false}
            >
                <FunctionField
                    render={(record: { firstname: string; lastname: string }) =>
                        `${record.firstname} ${record.lastname}`
                    }
                />
            </ReferenceField>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);