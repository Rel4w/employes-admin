import {
    useRecordContext,
    useGetOne,
} from "react-admin";
import {
    Box,
    Typography,
    Chip,
    Alert,
    CircularProgress,
    Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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

export const ManagerCard = () => {
    const intern = useRecordContext();

    const {
        data: manager,
        isPending,
        error,
    } = useGetOne(
        "employees",
        { id: intern?.supervisorId },
        { enabled: !!intern?.supervisorId }
    );

    if (!intern) return null;

    if (isPending) {
        return (
            <Box display="flex" alignItems="center" gap={2} p={3}>
                <CircularProgress size={20} />
                <Typography color="text.secondary">
                    Chargement du manager…
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                Impossible de charger les informations du manager.
            </Alert>
        );
    }

    return (
        <Box>
            <Row
                icon={<AccountCircleIcon fontSize="small" />}
                label="Nom complet"
                value={`${manager.firstname} ${manager.lastname}`}
            />
            <Row
                icon={<WorkIcon fontSize="small" />}
                label="Département"
                value={manager.department}
            />
            <Row
                icon={<EmailIcon fontSize="small" />}
                label="Email"
                value={
                    <Link href={`mailto:${manager.email}`} underline="hover">
                        {manager.email}
                    </Link>
                }
            />
            <Row
                icon={
                    manager.active ? (
                        <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                        <CancelIcon fontSize="small" color="disabled" />
                    )
                }
                label="Statut"
                value={
                    <Chip
                        label={manager.active ? "Actif" : "Inactif"}
                        color={manager.active ? "success" : "default"}
                        size="small"
                    />
                }
            />
        </Box>
    );
};