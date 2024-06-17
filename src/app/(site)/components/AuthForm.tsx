"use client";

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard/employees");
    }
  }, [session?.status, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged In");
          router.push("/dashboard/employees");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
          <Typography variant="h6">Email</Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                placeholder="username@email.com"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? "Email is required" : ""}
                disabled={isLoading}
              />
            )}
            rules={{ required: true }}
          />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
          <Typography variant="h6">Password</Typography>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                placeholder="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? "Password is required" : ""}
                disabled={isLoading}
              />
            )}
            rules={{ required: true }}
          />
        </Box>

        <Button type="submit" variant="contained" sx={{ my: 2 }} disabled={isLoading} fullWidth>
          {isLoading ? <CircularProgress /> : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;
