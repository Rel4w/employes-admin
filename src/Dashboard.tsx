import { useGetList } from "react-admin";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";

interface StatCardProps {
    title: string;
    value: number | undefined;
    isPending: boolean;
    icon: React.ReactNode;
    color: string;
}

const StatCard = ({ title, value, isPending, icon, color }: StatCardProps) => (
    <Card
        elevation={2}
        sx={{
            flex: "1 1 200px",
            minWidth: 180,
            borderRadius: 3,
            borderTop: `4px solid ${color}`,
            transition: "box-shadow 0.2s",
            "&:hover": { boxShadow: 6 },
        }}
    >
        <CardContent>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <Box sx={{ color }}>{icon}</Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ lineHeight: 1.3 }}
                >
                    {title}
                </Typography>
            </Box>

            {isPending ? (
                <CircularProgress size={28} sx={{ color }} />
            ) : (
                <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{ color, lineHeight: 1 }}
                >
                    {value ?? "—"}
                </Typography>
            )}
        </CardContent>
    </Card>
);

export const Dashboard = () => {
    const { total: totalEmployees, isPending: p1 } = useGetList("employees", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
    });

    const { total: activeEmployees, isPending: p2 } = useGetList("employees", {
        filter: { active: true },
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
    });

    const { total: totalInterns, isPending: p3 } = useGetList("interns", {
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
    });

    const { total: remuneratedInterns, isPending: p4 } = useGetList("interns", {
        filter: { isRemunerate: true },
        pagination: { page: 1, perPage: 1 },
        sort: { field: "id", order: "ASC" },
    });

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={700} gutterBottom mb={3}>
                Tableau de bord
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
            >
                <StatCard
                    title="Total employés"
                    value={totalEmployees}
                    isPending={p1}
                    icon={<PeopleIcon />}
                    color="#1976d2"
                />
                <StatCard
                    title="Employés actifs"
                    value={activeEmployees}
                    isPending={p2}
                    icon={<CheckCircleIcon />}
                    color="#2e7d32"
                />
                <StatCard
                    title="Total stagiaires"
                    value={totalInterns}
                    isPending={p3}
                    icon={<SchoolIcon />}
                    color="#7b1fa2"
                />
                <StatCard
                    title="Stagiaires rémunérés"
                    value={remuneratedInterns}
                    isPending={p4}
                    icon={<EuroIcon />}
                    color="#e65100"
                />
            </Box>
        </Box>
    );
};