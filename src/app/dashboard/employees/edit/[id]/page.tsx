import { Box, Typography } from "@mui/material";
import EditEmployeeForm from "../../components/EditEmployeeForm";

import { getCurrentUser, getEmployee, getManagers } from "@/app/actions";

const EditEmployeesPage = async ({ params }: { params: { id: string } }) => {
  const managersList = await getManagers();
  const employee = await getEmployee(params.id);
  const currentUserRole = await getCurrentUser();

  if (!employee) {
    return (
      <Box>
        <Typography>Oops! Something went wrong</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5">Edit Employee</Typography>
      <EditEmployeeForm
        managerList={managersList}
        employee={employee}
        role={currentUserRole?.role!}
      />
    </Box>
  );
};

export default EditEmployeesPage;
