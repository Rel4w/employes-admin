import {
    AutocompleteInput,
    Create,
    DateInput,
    FunctionField,
    ReferenceInput,
    SimpleForm,
    TextInput,
    required,
} from "react-admin";

export const InternCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" validate={required()} />
            <TextInput source="lastname" label="Nom" validate={required()} />
            <TextInput source="email" label="Email" validate={required()} />
            <TextInput source="school" label="École / Université" validate={required()} />
            <TextInput source="mission" label="Mission" validate={required()} multiline />
            <DateInput source="startDate" label="Date de début" validate={required()} />
            <DateInput source="endDate" label="Date de fin" validate={required()} />
            <ReferenceInput source="supervisorId" reference="employees" label="Encadreur">
                <AutocompleteInput
                    label="Encadreur"
                    optionText={(record) => `${record.firstname} ${record.lastname} — ${record.department}`}
                    validate={required()}
                />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);