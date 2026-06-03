import { useState } from "react";
import { useCreate, useRefresh, useGetList } from "react-admin";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Alert,
    CircularProgress,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const QuickInternCreate = () => {
    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [supervisorId, setSupervisorId] = useState<number | "">("");
    const [formError, setFormError] = useState("");

    const refresh = useRefresh();

    const { data: managers } = useGetList("employees", {
        filter: { active: true },
        pagination: { page: 1, perPage: 100 },
        sort: { field: "lastname", order: "ASC" },
    });

    const [create, { isPending, error }] = useCreate();

    const handleOpen = () => {
        setOpen(true);
        setFirstname("");
        setLastname("");
        setSupervisorId("");
        setFormError("");
    };

    const handleClose = () => {
        if (!isPending) setOpen(false);
    };

    const handleSubmit = () => {
        if (!firstname.trim() || !lastname.trim() || !supervisorId) {
            setFormError("Tous les champs sont obligatoires.");
            return;
        }
        setFormError("");

        create(
            "interns",
            {
                data: {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    supervisorId: Number(supervisorId),
                    email: "",
                    school: "",
                    mission: "",
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date().toISOString().split("T")[0],
                    isRemunerate: false,
                },
            },
            {
                onSuccess: () => {
                    refresh();
                    setOpen(false);
                },
            }
        );
    };

    const errorMessage =
        formError ||
        (error instanceof Error
            ? error.message
            : error
            ? "Une erreur est survenue lors de la création."
            : "");

    return (
        <>
            <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ textTransform: "none", fontWeight: 600 }}
            >
                Ajouter stagiaire rapide
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>
                    Ajout rapide — Stagiaire
                </DialogTitle>

                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} pt={1}>
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}

                        <TextField
                            label="Prénom"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                            fullWidth
                            size="small"
                            disabled={isPending}
                        />

                        <TextField
                            label="Nom"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            fullWidth
                            size="small"
                            disabled={isPending}
                        />

                        <TextField
                            select
                            label="Manager"
                            value={supervisorId}
                            onChange={(e) =>
                                setSupervisorId(Number(e.target.value))
                            }
                            required
                            fullWidth
                            size="small"
                            disabled={isPending}
                        >
                            {(managers ?? []).map((m) => (
                                <MenuItem key={m.id} value={m.id}>
                                    {m.firstname} {m.lastname} —{" "}
                                    {m.department}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={handleClose}
                        disabled={isPending}
                        sx={{ textTransform: "none" }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isPending}
                        startIcon={
                            isPending ? (
                                <CircularProgress size={14} />
                            ) : undefined
                        }
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        {isPending ? "Création…" : "Créer"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};