import { useUpdate, useRecordContext, useRefresh } from "react-admin";
import { Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const QuickStatusToggle = () => {
    const record = useRecordContext();
    const refresh = useRefresh();

    const [update, { isPending }] = useUpdate(
        "employees",
        {
            id: record?.id,
            data: { active: !record?.active },
            previousData: record,
        },
        {
            mutationMode: "pessimistic",
            onSuccess: () => refresh(),
        }
    );

    if (!record) return null;

    return (
        <Button
            size="small"
            variant="outlined"
            color={record.active ? "error" : "success"}
            disabled={isPending}
            startIcon={
                isPending ? (
                    <CircularProgress size={14} />
                ) : record.active ? (
                    <CancelIcon fontSize="small" />
                ) : (
                    <CheckCircleIcon fontSize="small" />
                )
            }
            onClick={(e) => {
                e.stopPropagation();
                update();
            }}
            sx={{ textTransform: "none", fontWeight: 600, minWidth: 110 }}
        >
            {record.active ? "Désactiver" : "Activer"}
        </Button>
    );
};