"use client";
import { updateDepartment } from "@/app/actions";
import { Department, Manager } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Department name is required"),
  manager: z.string().min(1, "Manager is required"),
  status: z.string().min(1, "Status is required"),
});

type FormData = z.infer<typeof formSchema>;

const EditDepartmentForm = ({
  managerList,
  department,
}: {
  managerList: Manager[];
  department: Department;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: department.name,
      manager: department.manager,
      status: department.status,
      id: department.id,
    },
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    updateDepartment(data).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} />
        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <Typography>Name</Typography>
          <TextField
            {...register("name")}
            label="Department Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <Typography>Manager</Typography>
          <Select
            {...register("manager")}
            label="Manager"
            sx={{ width: "222px" }}
            error={!!errors.manager}
            defaultValue={department.manager}
          >
            {managerList.map((item: Manager) => (
              <MenuItem key={item.id} value={`${item.firstName} ${item.lastName}`}>
                {item.firstName} {item.lastName}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <Typography>Status</Typography>
          <Select
            {...register("status")}
            label="Status"
            variant="outlined"
            error={!!errors.status}
            sx={{ width: "222px" }}
            defaultValue={department.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2} mt={2}>
          <Button type="submit" variant="outlined">
            {isLoading ? <CircularProgress size={25} /> : "Save"}
          </Button>
          <Link href="/dashboard/departments">
            <Button variant="outlined">Cancel</Button>
          </Link>
        </Box>
      </form>
    </>
  );
};

export default EditDepartmentForm;
