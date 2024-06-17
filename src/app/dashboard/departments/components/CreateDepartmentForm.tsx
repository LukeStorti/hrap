"use client";

import { createDepartment } from "@/app/actions";
import { Manager } from "@/app/types";
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
  name: z.string().min(1, "Department name is required"),
  manager: z.string().min(1, "Manager is required"),
});

type FormData = z.infer<typeof formSchema>;

const CreateDepartmentForm = ({ managerList }: { managerList: Manager[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    createDepartment(data).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <Typography>Name</Typography>
          <TextField
            {...register("name")}
            label="Department Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            required
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <Typography>Manager</Typography>
          <Select
            {...register("manager")}
            defaultValue=""
            label="Manager"
            sx={{ width: "222px" }}
            placeholder="Manager"
          >
            {managerList.map((manager: Manager) => (
              <MenuItem key={manager.id} value={`${manager.firstName} ${manager.lastName}`}>
                {manager.firstName} {manager.lastName}
              </MenuItem>
            ))}
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

export default CreateDepartmentForm;
