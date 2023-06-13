import { Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
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

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      ...data,
      callbackUrl: "/admin",
    });
    console.log(result);
    return result;
  };
  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Typography variant="h3">Welcome back</Typography>
      <Typography variant="subtitle1" my={2} textAlign="center">
        Please log in with you credentials
      </Typography>
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"column"} gap={2}>
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
            startIcon={<LoginIcon />}
            variant="contained"
            type="submit"
          >
            Login
          </LoadingButton>
          {/* <Link href="#" style={{ marginLeft: "auto", fontSize: 15 }}>
            forgot your password?
          </Link> */}
        </Stack>
      </form>
    </Paper>
  );
}
