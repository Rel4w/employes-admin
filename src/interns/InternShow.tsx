import {
    BooleanField,
    DateField,
    EditButton,
    EmailField,
    ListButton,
    NumberField,
    ReferenceField,
    Show,
    TextField,
    TopToolbar,
    useRecordContext,
    useGetOne,
} from "react-admin";
import { useState } from "react";
import { Box, Typography, Tab, Tabs, Chip } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import EuroIcon from "@mui/icons-material/Euro";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
);

const Row = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) => (
    <Box
        display="flex"
        alignItems="center"
        gap={2}
        py={1.5}
        px={2}
        sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:last-child": { borderBottom: "none" },
            transition: "background 0.15s",
            "&:hover": { bgcolor: "action.hover" },
        }}
    >
        <Box sx={{ color: "text.secondary", display: "flex", minWidth: 24 }}>
            {icon}
        </Box>
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minWidth: 160, fontWeight: 500 }}
        >
            {label}
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight={400}>
            {value}
        </Typography>
    </Box>
);

const InternTab = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Box>
            <Row icon={<AccountCircleIcon fontSize="small" />} label="Prénom" value={record.firstname} />
            <Row icon={<AccountCircleIcon fontSize="small" />} label="Nom" value={record.lastname} />
            <Row icon={<EmailIcon fontSize="small" />} label="Email" value={record.email} />
            <Row icon={<SchoolIcon fontSize="small" />} label="École / Université" value={record.school} />
            <Row icon={<WorkIcon fontSize="small" />} label="Mission" value={record.mission} />
            <Row
                icon={<CalendarMonthIcon fontSize="small" />}
                label="Date de début"
                value={new Date(record.startDate).toLocaleDateString("fr-FR")}
            />
            <Row
                icon={<CalendarMonthIcon fontSize="small" />}
                label="Date de fin"
                value={new Date(record.endDate).toLocaleDateString("fr-FR")}
            />
        </Box>
    );
};

const SupervisorTab = () => {
    const intern = useRecordContext();
    const { data: supervisor } = useGetOne("employees", { id: intern?.supervisorId }, { enabled: !!intern?.supervisorId });

    if (!supervisor) return (
        <Box p={3} textAlign="center">
            <Typography color="text.secondary">Chargement…</Typography>
        </Box>
    );

    return (
        <Box>
            <Row icon={<AccountCircleIcon fontSize="small" />} label="Prénom" value={supervisor.firstname} />
            <Row icon={<AccountCircleIcon fontSize="small" />} label="Nom" value={supervisor.lastname} />
            <Row icon={<EmailIcon fontSize="small" />} label="Email" value={supervisor.email} />
            <Row icon={<WorkIcon fontSize="small" />} label="Département" value={supervisor.department} />
            <Row
                icon={<EuroIcon fontSize="small" />}
                label="Salaire"
                value={new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(supervisor.salary)}
            />
            <Row
                icon={supervisor.active ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                label="Statut"
                value={
                    <Chip
                        label={supervisor.active ? "Actif" : "Inactif"}
                        color={supervisor.active ? "success" : "default"}
                        size="small"
                    />
                }
            />
        </Box>
    );
};

const TabbedCard = () => {
    const [tab, setTab] = useState(0);

    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                m: 2,
            }}
        >
            {/* En-tête onglets */}
            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    "& .MuiTab-root": {
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        gap: 1,
                    },
                }}
            >
                <Tab
                    icon={<SchoolIcon fontSize="small" />}
                    iconPosition="start"
                    label="Stagiaire"
                />
                <Tab
                    icon={<BadgeIcon fontSize="small" />}
                    iconPosition="start"
                    label="Encadreur"
                />
            </Tabs>

            {/* Contenu */}
            <Box>
                {tab === 0 && <InternTab />}
                {tab === 1 && <SupervisorTab />}
            </Box>
        </Box>
    );
};

export const InternShow = () => (
    <Show actions={<ShowActions />}>
        <TabbedCard />
    </Show>
);