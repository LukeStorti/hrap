"use client";
import { createEmployee } from "@/app/actions";
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

const CreateEmployeeForm = ({ managerList }: { managerList: Manager[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    telephoneNumber: z
      .string()
      .min(7, "Telephone number must be at least 7 digits")
      .max(15, "Telephone number cannot be longer that 15 digits"),
    emailAddress: z.string().email("Invalid email address"),
    manager: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    createEmployee(data).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
        <Typography>Name</Typography>
        <TextField
          {...register("firstName")}
          label="Name"
          variant="outlined"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          required
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
        <Typography>Surname</Typography>
        <TextField
          {...register("lastName")}
          label="Surname"
          variant="outlined"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          required
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
        <Typography>Telephone Number</Typography>
        <TextField
          {...register("telephoneNumber")}
          label="Telephone Number"
          variant="outlined"
          error={!!errors.telephoneNumber}
          helperText={errors.telephoneNumber?.message}
          required
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
        <Typography>Email Address</Typography>
        <TextField
          {...register("emailAddress")}
          label="Email Address"
          variant="outlined"
          error={!!errors.emailAddress}
          helperText={errors.emailAddress?.message}
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
          {managerList.map((manager) => (
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
        <Link href="/dashboard/employees">
          <Button variant="outlined">Cancel</Button>
        </Link>
      </Box>
    </form>
  );
};

export default CreateEmployeeForm;
