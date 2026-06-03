import { useGetList } from "react-admin";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    LinearProgress,
    Avatar,
    Chip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";
import BarChartIcon from "@mui/icons-material/BarChart";
import BadgeIcon from "@mui/icons-material/Badge";

const DEPT_COLORS: Record<string, string> = {
    Informatique: "#378ADD",
    Finance: "#7F77DD",
    Marketing: "#1D9E75",
    RH: "#BA7517",
};

const AVATAR_COLORS = [
    { bg: "#EEEDFE", color: "#534AB7" },
    { bg: "#E6F1FB", color: "#185FA5" },
    { bg: "#FAEEDA", color: "#854F0B" },
    { bg: "#EAF3DE", color: "#3B6D11" },
];

const ACCENT_COLORS = {
    blue: { accent: "#378ADD", iconBg: "#E6F1FB", iconColor: "#185FA5", badgeBg: "#E6F1FB", badgeColor: "#185FA5" },
    green: { accent: "#639922", iconBg: "#EAF3DE", iconColor: "#3B6D11", badgeBg: "#EAF3DE", badgeColor: "#3B6D11" },
    purple: { accent: "#7F77DD", iconBg: "#EEEDFE", iconColor: "#534AB7", badgeBg: "#EEEDFE", badgeColor: "#534AB7" },
    amber: { accent: "#BA7517", iconBg: "#FAEEDA", iconColor: "#854F0B", badgeBg: "#FAEEDA", badgeColor: "#854F0B" },
};

interface StatCardProps {
    title: string;
    value: number | undefined;
    isPending: boolean;
    icon: React.ReactNode;
    colorKey: keyof typeof ACCENT_COLORS;
    badge: string;
    badgeIcon: React.ReactNode;
}

const StatCard = ({ title, value, isPending, icon, colorKey, badge, badgeIcon }: StatCardProps) => {
    const c = ACCENT_COLORS[colorKey];
    return (
        <Card
            elevation={0}
            sx={{
                flex: "1 1 150px",
                minWidth: 140,
                borderRadius: 3,
                border: "0.5px solid",
                borderColor: "divider",
                position: "relative",
                overflow: "visible",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: c.accent,
                    borderRadius: "12px 12px 0 0",
                },
            }}
        >
            <CardContent sx={{ pb: "16px !important" }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2,
                        background: c.iconBg,
                        color: c.iconColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5,
                    }}
                >
                    {icon}
                </Box>

                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5, letterSpacing: "0.02em" }}>
                    {title}
                </Typography>

                {isPending ? (
                    <CircularProgress size={24} sx={{ color: c.accent, mt: 0.5 }} />
                ) : (
                    <Typography variant="h4" fontWeight={500} sx={{ lineHeight: 1, mb: 1 }}>
                        {value ?? "—"}
                    </Typography>
                )}

                <Chip
                    icon={<Box sx={{ display: "flex", "& svg": { fontSize: "10px !important" } }}>{badgeIcon}</Box>}
                    label={badge}
                    size="small"
                    sx={{
                        fontSize: 11,
                        height: 20,
                        background: c.badgeBg,
                        color: c.badgeColor,
                        border: "none",
                        "& .MuiChip-icon": { color: c.badgeColor, ml: "6px", mr: "-2px" },
                    }}
                />
            </CardContent>
        </Card>
    );
};

const DepartmentStats = () => {
    const departments = ["Informatique", "Finance", "Marketing", "RH"];

    const results = departments.map((dept) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGetList("employees", {
            filter: { active: true, department: dept },
            pagination: { page: 1, perPage: 1 },
            sort: { field: "id", order: "ASC" },
        })
    );

    const max = Math.max(1, ...results.map((r) => r.total ?? 0));

    return (
        <Card elevation={0} sx={{ flex: 1, minWidth: 220, borderRadius: 3, border: "0.5px solid", borderColor: "divider" }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" fontWeight={500} display="flex" alignItems="center" gap={1}>
                        <BarChartIcon fontSize="small" sx={{ color: "#378ADD" }} />
                        Par département
                    </Typography>
                    <Chip label="Actifs" size="small" sx={{ fontSize: 11, height: 20, background: "action.hover" }} />
                </Box>

                {departments.map((dept, i) => {
                    const count = results[i].total ?? 0;
                    const pct = Math.round((count / max) * 100);
                    return (
                        <Box key={dept} sx={{ mb: 1.5, "&:last-child": { mb: 0 } }}>
                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                                <Typography variant="caption" color="text.primary">{dept}</Typography>
                                <Typography variant="caption" color="text.secondary">{count}</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={pct}
                                sx={{
                                    height: 6,
                                    borderRadius: 99,
                                    bgcolor: "action.hover",
                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 99,
                                        background: DEPT_COLORS[dept] ?? "#888",
                                    },
                                }}
                            />
                        </Box>
                    );
                })}
            </CardContent>
        </Card>
    );
};

const RecentInterns = () => {
    const { data: interns, isPending } = useGetList("interns", {
        pagination: { page: 1, perPage: 4 },
        sort: { field: "startDate", order: "DESC" },
    });

    const today = new Date().toISOString().split("T")[0];

    return (
        <Card elevation={0} sx={{ flex: 1, minWidth: 220, borderRadius: 3, border: "0.5px solid", borderColor: "divider" }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="body2" fontWeight={500} display="flex" alignItems="center" gap={1}>
                        <BadgeIcon fontSize="small" sx={{ color: "#7F77DD" }} />
                        Stagiaires récents
                    </Typography>
                    <Chip label="4 derniers" size="small" sx={{ fontSize: 11, height: 20 }} />
                </Box>

                {isPending && <CircularProgress size={20} />}

                {interns?.map((intern, i) => {
                    const initials = `${intern.firstname?.[0] ?? ""}${intern.lastname?.[0] ?? ""}`.toUpperCase();
                    const colors = AVATAR_COLORS[i % AVATAR_COLORS.length];
                    const isActive = intern.endDate >= today;
                    return (
                        <Box
                            key={intern.id}
                            display="flex"
                            alignItems="center"
                            gap={1.5}
                            py={1}
                            sx={{
                                borderBottom: "0.5px solid",
                                borderColor: "divider",
                                "&:last-child": { borderBottom: "none" },
                            }}
                        >
                            <Avatar sx={{ width: 28, height: 28, fontSize: 11, fontWeight: 500, background: colors.bg, color: colors.color }}>
                                {initials}
                            </Avatar>
                            <Box flex={1} minWidth={0}>
                                <Typography variant="body2" noWrap>
                                    {intern.firstname} {intern.lastname}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" noWrap>
                                    {intern.school}
                                </Typography>
                            </Box>
                            <Chip
                                label={isActive ? "Actif" : "Terminé"}
                                size="small"
                                sx={{
                                    fontSize: 11,
                                    height: 20,
                                    ...(isActive
                                        ? { background: "#EAF3DE", color: "#3B6D11", border: "none" }
                                        : { background: "transparent" }),
                                }}
                                variant={isActive ? "filled" : "outlined"}
                            />
                        </Box>
                    );
                })}
            </CardContent>
        </Card>
    );
};

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

    const activePct =
        totalEmployees && activeEmployees != null
            ? Math.round((activeEmployees / totalEmployees) * 100)
            : null;

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={500} gutterBottom>
                Tableau de bord
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Vue d'ensemble — Employés &amp; Stagiaires
            </Typography>

            {/* Stat cards */}
            <Box display="flex" flexWrap="wrap" gap={1.5} mb={2}>
                <StatCard
                    title="Total employés"
                    value={totalEmployees}
                    isPending={p1}
                    icon={<PeopleIcon sx={{ fontSize: 16 }} />}
                    colorKey="blue"
                    badge="4 départements"
                    badgeIcon={<PeopleIcon />}
                />
                <StatCard
                    title="Employés actifs"
                    value={activeEmployees}
                    isPending={p2}
                    icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                    colorKey="green"
                    badge={activePct != null ? `${activePct} %` : "…"}
                    badgeIcon={<CheckCircleIcon />}
                />
                <StatCard
                    title="Total stagiaires"
                    value={totalInterns}
                    isPending={p3}
                    icon={<SchoolIcon sx={{ fontSize: 16 }} />}
                    colorKey="purple"
                    badge="En cours"
                    badgeIcon={<SchoolIcon />}
                />
                <StatCard
                    title="Stagiaires rémunérés"
                    value={remuneratedInterns}
                    isPending={p4}
                    icon={<EuroIcon sx={{ fontSize: 16 }} />}
                    colorKey="amber"
                    badge={`sur ${totalInterns ?? "…"}`}
                    badgeIcon={<EuroIcon />}
                />
            </Box>

            {/* Bottom panels */}
            <Box display="flex" flexWrap="wrap" gap={1.5}>
                <DepartmentStats />
                <RecentInterns />
            </Box>
        </Box>
    );
};