import {
    EditButton,
    ListButton,
    ReferenceField,
    Show,
    TextField,
    TopToolbar,
    useRecordContext,
    FunctionField,
} from "react-admin";
import { useState } from "react";
import { Box, Typography, Tab, Tabs, Link } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ManagerCard } from "./ManagerCard";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    if (!record) return null;

    return (
        <Box>
            <Row
                icon={<AccountCircleIcon fontSize="small" />}
                label="Prénom"
                value={record.firstname}
            />
            <Row
                icon={<AccountCircleIcon fontSize="small" />}
                label="Nom"
                value={record.lastname}
            />
            <Row
                icon={<EmailIcon fontSize="small" />}
                label="Email"
                value={
                    <Link href={`mailto:${record.email}`} underline="hover">
                        {record.email}
                    </Link>
                }
            />
            <Row
                icon={<SchoolIcon fontSize="small" />}
                label="École / Université"
                value={record.school}
            />
            <Row
                icon={<WorkIcon fontSize="small" />}
                label="Mission"
                value={record.mission}
            />
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
            {/* Manager — lien cliquable vers la fiche employé (8.1) */}
            <Row
                icon={<BadgeIcon fontSize="small" />}
                label="Manager"
                value={
                    <ReferenceField
                        source="supervisorId"
                        reference="employees"
                        link="show"
                    >
                        <FunctionField
                            render={(emp: { firstname: string; lastname: string; id: number }) => (
                                <Link
                                    component="button"
                                    underline="hover"
                                    onClick={() =>
                                        navigate(`/employees/${emp.id}/show`)
                                    }
                                    sx={{ cursor: "pointer" }}
                                >
                                    {emp.firstname} {emp.lastname}
                                </Link>
                            )}
                        />
                    </ReferenceField>
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
                    label="Manager"
                />
            </Tabs>

            <Box>
                {tab === 0 && <InternTab />}
                {/* Exercice 8.2 — ManagerCard avec useGetOne */}
                {tab === 1 && <ManagerCard />}
            </Box>
        </Box>
    );
};

export const InternShow = () => (
    <Show actions={<ShowActions />}>
        <TabbedCard />
    </Show>
);