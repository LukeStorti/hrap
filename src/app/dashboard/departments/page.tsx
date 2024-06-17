import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Filter from "./components/Filter";
import DepartmentsTable from "./components/Table";
import { getCurrentUser, getDepartments } from "@/app/actions";

export interface Row {
  id: string;
  departmentName: string;
  managerName: string;
  status: "Active" | "Inactive";
}

const DepartmentsPage = async ({ searchParams }: { searchParams?: { status?: string } }) => {
  const currentUserRole = await getCurrentUser();
  const departments = await getDepartments(searchParams?.status);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Departments</Typography>
        {currentUserRole?.role !== "employee" && (
          <Link href="/dashboard/departments/create">
            <Button sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="outlined">
              <AddCircleIcon />
              Add Department
            </Button>
          </Link>
        )}
      </Box>
      <Filter />
      <DepartmentsTable rows={departments} role={currentUserRole?.role!} />
    </Box>
  );
};

export default DepartmentsPage;
