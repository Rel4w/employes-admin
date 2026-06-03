import { useRecordContext, useGetList } from "react-admin";
import {
    Box,
    Typography,
    Chip,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
    Link,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";


export const InternsByManager = () => {
    const employee = useRecordContext();
    const navigate = useNavigate();

    const {
        data: interns,
        total,
        isPending,
        error,
    } = useGetList(
        "interns",
        {
            filter: { supervisorId: employee?.id },
            pagination: { page: 1, perPage: 100 },
            sort: { field: "startDate", order: "DESC" },
        },
        { enabled: !!employee?.id }
    );

    if (!employee) return null;

    return (
        <Box sx={{ mt: 3, mx: 2 }}>
            <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                display="flex"
                alignItems="center"
                gap={1}
            >
                <SchoolIcon fontSize="small" color="primary" />
                Stagiaires encadrés ({isPending ? "…" : (total ?? 0)})
            </Typography>

            {isPending && (
                <Box display="flex" alignItems="center" gap={2} py={2}>
                    <CircularProgress size={18} />
                    <Typography color="text.secondary" variant="body2">
                        Chargement…
                    </Typography>
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Impossible de charger les stagiaires.
                </Alert>
            )}

            {!isPending && !error && interns?.length === 0 && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ py: 2, fontStyle: "italic" }}
                >
                    Aucun stagiaire encadré pour le moment.
                </Typography>
            )}

            {!isPending && !error && interns && interns.length > 0 && (
                <Box
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    <List disablePadding>
                        {interns.map((intern, index) => (
                            <Box key={intern.id}>
                                {index > 0 && <Divider />}
                                <ListItem
                                    sx={{
                                        transition: "background 0.15s",
                                        "&:hover": { bgcolor: "action.hover" },
                                        pr: 2,
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Link
                                                component="button"
                                                underline="hover"
                                                fontWeight={600}
                                                onClick={() =>
                                                    navigate(
                                                        `/interns/${intern.id}/show`
                                                    )
                                                }
                                                sx={{ cursor: "pointer" }}
                                            >
                                                {intern.firstname}{" "}
                                                {intern.lastname}
                                            </Link>
                                        }
                                        secondary={
                                            <Box
                                                component="span"
                                                display="flex"
                                                gap={1}
                                                alignItems="center"
                                                flexWrap="wrap"
                                                mt={0.5}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {intern.school} —{" "}
                                                    {intern.mission}
                                                </Typography>
                                                <Chip
                                                    label={`${new Date(intern.startDate).toLocaleDateString("fr-FR")} → ${new Date(intern.endDate).toLocaleDateString("fr-FR")}`}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                                {intern.isRemunerate && (
                                                    <Chip
                                                        label="Rémunéré"
                                                        size="small"
                                                        color="success"
                                                    />
                                                )}
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};