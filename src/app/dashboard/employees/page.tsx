import { Box, Button, Typography } from "@mui/material";
import Filter from "./components/Filter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";
import EmployeesTable from "./components/Table";
import {
  getAllEmployees,
  getAllEmployeesByManager,
  getCurrentUser,
  getDepartments,
  getEmployee,
  getManagers,
} from "@/app/actions";

const EmployeesPage = async ({
  searchParams,
}: {
  searchParams?: { status?: string; department?: string; manager?: string };
}) => {
  let employees = [];
  const managers = await getManagers();
  const departmentList = await getDepartments();

  const currentUserRole = await getCurrentUser();

  if (currentUserRole?.role === "admin") {
    employees = await getAllEmployees(searchParams?.status, searchParams?.department);
  } else if (currentUserRole?.role === "manager") {
    employees = await getAllEmployeesByManager(
      `${currentUserRole.firstName} ${currentUserRole.lastName}`,
      searchParams?.status
    );
  } else {
    const employee = await getEmployee(currentUserRole?.id!);
    employees = employee ? [employee] : [];
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Employees</Typography>
        {currentUserRole?.role !== "employee" && (
          <Link href="/dashboard/employees/create">
            <Button sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="outlined">
              <AddCircleIcon />
              Add Employee
            </Button>
          </Link>
        )}
      </Box>
      {currentUserRole?.role !== "employee" && (
        <Filter managersList={managers} departmentList={departmentList} />
      )}
      <EmployeesTable
        rows={employees}
        role={currentUserRole?.role!}
        currentUserId={currentUserRole?.id!}
      />
    </Box>
  );
};

export default EmployeesPage;
