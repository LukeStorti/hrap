import { Box, Typography } from "@mui/material";

import CreateDepartmentForm from "../components/CreateDepartmentForm";
import { getManagers } from "@/app/actions";

const CreateDepartmentPage = async () => {
  const managerList = await getManagers();
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5">Create Department</Typography>
      <CreateDepartmentForm managerList={managerList} />
    </Box>
  );
};

export default CreateDepartmentPage;
