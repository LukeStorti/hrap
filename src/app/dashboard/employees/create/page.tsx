import { Box, Typography } from "@mui/material";
import CreateEmployeeForm from "../components/CreateEmployeeForm";
import { getManagers } from "@/app/actions";

const CreateEmplyeePage = async () => {
  const managerList = await getManagers();
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5">Create Employee</Typography>
      <CreateEmployeeForm managerList={managerList} />
    </Box>
  );
};

export default CreateEmplyeePage;
