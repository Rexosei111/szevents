import { Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@/components/Link";
import { signIn } from "next-auth/react";
import { Person2Outlined, Save } from "@mui/icons-material";
import { APIClient } from "@/components/config/axios";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";

const newUserSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string(),
  })
  .required();

export default function NewUserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(newUserSchema),
  });

  const onSubmit = async (final_data) => {
    setLoading(true);
    try {
      const { data } = await APIClient.post("/users", final_data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/admin/users");
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper sx={{ p: 3 }}>
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"column"} gap={2}>
          <TextField
            {...register("name")}
            variant="outlined"
            type={"text"}
            label="Name"
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person2Outlined fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            focused
            placeholder="Random Name"
          />
          <TextField
            {...register("email")}
            variant="outlined"
            type={"email"}
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            focused
            placeholder="example@provider.com"
          />
          <TextField
            {...register("password")}
            variant="outlined"
            type={"password"}
            label="Password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            focused
            fullWidth
          />
          <LoadingButton
            loadingPosition="start"
            disabled={!isValid}
            loading={loading}
            startIcon={<Save />}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  );
}
