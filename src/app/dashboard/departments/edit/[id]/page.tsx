import { Box, Typography } from "@mui/material";

import EditDepartmentForm from "../../components/EditDepartmentForm";
import { getDepartment, getManagers } from "@/app/actions";

const EditDepartmentPage = async ({ params }: { params: { id: string } }) => {
  const managers = await getManagers();
  const department = await getDepartment(params.id);

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5">Edit Department</Typography>
      <EditDepartmentForm managerList={managers} department={department!} />
    </Box>
  );
};

export default EditDepartmentPage;
