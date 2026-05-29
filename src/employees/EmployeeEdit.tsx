import {
  BooleanInput,
  Edit,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
  minValue,
  required,
  useRecordContext,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const EmployeeTitle = () => {
  const record = useRecordContext();
  if (!record) return <span>Modifier un employé</span>;
  return <span>Modifier : {record.firstname} {record.lastname}</span>;
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={required()} />
      <SelectInput
        source="department"
        label="Département"
        choices={departmentChoices}
        validate={required()}
      />
      <NumberInput
        source="salary"
        label="Salaire (€)"
        validate={[required(), minValue(1500, "Le salaire minimum est 1 500 €")]}
      />
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);