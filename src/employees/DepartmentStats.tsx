import { useRecordContext, useGetList } from "react-admin";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

export const DepartmentStats = () => {
    const employee = useRecordContext();

    const { total, isPending } = useGetList(
        "employees",
        {
            filter: {
                active: true,
                department: employee?.department,
            },
            pagination: { page: 1, perPage: 1 },
            sort: { field: "id", order: "ASC" },
        },
        { enabled: !!employee?.department }
    );

    if (!employee) return null;

    const colleagues =
        total != null
            ? Math.max(0, total - (employee.active ? 1 : 0))
            : null;

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
                mt: 2,
                mx: 2,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
            }}
        >
            <GroupIcon color="primary" />
            <Typography variant="body2" fontWeight={600}>
                Collègues actifs dans le département{" "}
                <em>{employee.department}</em>
            </Typography>

            {isPending ? (
                <CircularProgress size={16} />
            ) : (
                <Chip
                    label={colleagues ?? "—"}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 700 }}
                />
            )}
        </Box>
    );
};