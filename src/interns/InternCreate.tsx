import {
    AutocompleteInput,
    BooleanInput,
    Create,
    DateInput,
    NumberInput,
    ReferenceInput,
    SimpleForm,
    TextInput,
    email,
    minValue,
    required,
} from "react-admin";
import { useWatch } from "react-hook-form";

const departmentChoices = [
    { id: "Informatique", name: "Informatique" },
    { id: "Marketing", name: "Marketing" },
    { id: "RH", name: "RH" },
    { id: "Finance", name: "Finance" },
];

const RemunerationField = () => {
    const isRemunerate = useWatch({ name: "isRemunerate" });

    return (
        <NumberInput
            source="remuneration"
            label="Rémunération (€)"
            validate={
                isRemunerate
                    ? [required("La rémunération est obligatoire si le stage est rémunéré"), minValue(1, "La rémunération doit être positive")]
                    : undefined
            }
            disabled={!isRemunerate}
            helperText={!isRemunerate ? "Cochez « Rémunéré » pour activer ce champ" : undefined}
        />
    );
};

const SupervisorInput = () => {
    const department = useWatch({ name: "department" });

    return (
        <ReferenceInput
            source="supervisorId"
            reference="employees"
            filter={{ active: true, ...(department ? { department } : {}) }}
        >
            <AutocompleteInput
                label="Manager (actif, même département)"
                optionText={(record) =>
                    `${record.firstname} ${record.lastname} — ${record.department}`
                }
                validate={required()}
                noOptionsText={
                    department
                        ? "Aucun manager actif dans ce département"
                        : "Aucun manager actif disponible"
                }
            />
        </ReferenceInput>
    );
};

export const InternCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" validate={required()} />
            <TextInput source="lastname" label="Nom" validate={required()} />
            <TextInput
                source="email"
                label="Email"
                validate={[required(), email("Email invalide")]}
            />
            <TextInput source="school" label="École / Université" validate={required()} />
            <TextInput source="mission" label="Mission" validate={required()} multiline />
            <DateInput source="startDate" label="Date de début" validate={required()} />
            <DateInput source="endDate" label="Date de fin" validate={required()} />
            {/* Département du stagiaire — utilisé par SupervisorInput pour filtrer */}
            <AutocompleteInput
                source="department"
                label="Département"
                choices={departmentChoices}
                validate={required()}
            />
            <BooleanInput source="isRemunerate" label="Rémunéré" defaultValue={false} />
            <RemunerationField />
            <SupervisorInput />
        </SimpleForm>
    </Create>
);