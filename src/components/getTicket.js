import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ticketFormSchema = yup
  .object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    location: yup.string(),
  })
  .required();

export default function GetTicket({ open, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketFormSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const finalData = {
      ...data,
    };
    console.log(finalData);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>GETTING YOUR TICKET {"🎉"}</DialogTitle>
      <Divider variant="middle" />
      <Paper
        elevation={0}
        sx={{ width: "100%", p: 2 }}
        component={"form"}
        action="#"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          flexDirection={"row"}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          gap={2}
        >
          <Box width={{ xs: "100%", md: "50%" }}>
            <InputLabel shrink htmlFor="fullname">
              Full name
            </InputLabel>
            <TextField
              fullWidth
              id="fullname"
              {...register("fullname")}
              variant="outlined"
              type={"text"}
              onChange={() => setSaved(false)}
              error={errors.fullname ? true : false}
              helperText={errors.fullname ? errors.fullname?.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder="Your full name"
            />
          </Box>
          <Box width={{ xs: "100%", md: "50%" }}>
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <TextField
              fullWidth
              id="email"
              {...register("email")}
              variant="outlined"
              type={"email"}
              onChange={() => setSaved(false)}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email?.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder="example@gmail.com"
            />
          </Box>
        </Stack>
        <Stack
          flexDirection={"row"}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          mt={4}
          gap={2}
        >
          <Box width={{ xs: "100%", md: "50%" }}>
            <InputLabel shrink htmlFor="fullname">
              Phone number
            </InputLabel>
            <TextField
              fullWidth
              id="phone"
              {...register("phone")}
              variant="outlined"
              type={"text"}
              onChange={() => setSaved(false)}
              error={errors.phone ? true : false}
              helperText={errors.phone ? errors.phone?.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder="Phone number"
            />
          </Box>
          <Box width={{ xs: "100%", md: "50%" }}>
            <InputLabel shrink htmlFor="email">
              Location
            </InputLabel>
            <TextField
              fullWidth
              id="location"
              {...register("location")}
              variant="outlined"
              type={"text"}
              onChange={() => setSaved(false)}
              error={errors.location ? true : false}
              helperText={errors.location ? errors.location?.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder=""
            />
          </Box>
        </Stack>
        <Button
          disableElevation
          type="submit"
          sx={{ mt: 2, ml: "auto" }}
          variant="contained"
        >
          Proceed
        </Button>
      </Paper>
    </Dialog>
  );
}
