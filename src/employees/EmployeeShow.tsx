import {
    BooleanField,
    EditButton,
    ListButton,
    NumberField,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
} from "react-admin";
import { Divider } from "@mui/material";
import { InternsByManager } from "./InternsByManager";
import { DepartmentStats } from "./DepartmentStats";

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

export const EmployeeShow = () => (
    <Show actions={<ShowActions />}>
        {/* Informations de base de l'employé */}
        <SimpleShowLayout>
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
        </SimpleShowLayout>

        {/* Exercice 9.2 — Stats du département (useGetList optimisé) */}
        <DepartmentStats />

        <Divider sx={{ mx: 2, mt: 3 }} />

        {/* Exercice 9.1 — Stagiaires encadrés (useGetList) */}
        <InternsByManager />
    </Show>
);