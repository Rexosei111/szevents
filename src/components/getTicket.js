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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Money } from "@mui/icons-material";
import { usePaystackPayment } from "react-paystack";
import { isAxiosError } from "axios";
import { APIClient } from "../config/axios";
import { useRouter } from "next/router";

const ticketFormSchema = yup
  .object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string(),
    location: yup.string(),
    amount: yup
      .number()
      .transform((value, originalValue) => {
        // The `value` parameter contains the value as a string
        // The `originalValue` parameter contains the original value before being transformed
        return parseFloat(value); // Convert the string value to a decimal number
      })
      .positive()
      .required(),
  })
  .required();

export default function GetTicket({
  open,
  handleClose,
  amount,
  eventName,
  setAlertOpen,
  handleAlertClose,
  setMessage,
  setSeverity,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketFormSchema),
  });

  useEffect(() => {
    reset({ amount: amount });
  }, [amount]);

  const initializePayment = usePaystackPayment({
    label: eventName,
    email: getValues()?.email,
    amount: amount,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: "GHS",
  });

  const onSuccess = (respone) => {
    saveTransaction(respone);
  };

  const onClose = () => {
    setSeverity("warning");
    setMessage("Unable to complete transaction. Please try again.");
    setAlertOpen(true);
    handleClose();
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // toast.warn("The payment flow was interrupted, please try again");
  };

  const saveTransaction = async (transactionDetails) => {
    setLoading(true);
    try {
      const { data } = await APIClient.post(
        "/events/" + router.query.id + "/tickets",
        {
          ...getValues(),
          ...transactionDetails,
          eventId: router.query.id,
        }
      );
      console.log(data);
      // console.log(transactionDetails);
      reset({});
      setSeverity("success");

      setMessage("Transaction Completed!! 🎉");
      setAlertOpen(true);
      handleClose();
    } catch (error) {
      // if (isAxiosError(error)) {
      console.log(error);
      // }
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    // setLoading(true);

    initializePayment(onSuccess, onClose);
    // setLoading(false);
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
              // onChange={() => setSaved(false)}
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
              // onChange={() => setSaved(false)}
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
              // onChange={() => setSaved(false)}
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
              // onChange={() => setSaved(false)}
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
        <Box width={{ xs: "100%" }} mt={2}>
          <InputLabel shrink htmlFor="email">
            Amount
          </InputLabel>
          <TextField
            fullWidth
            id="amount"
            disabled
            size="small"
            {...register("amount")}
            variant="outlined"
            type={"text"}
            // onChange={() => setSaved(false)}
            error={errors.amount ? true : false}
            helperText={errors.amount ? errors.amount?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    variant="subtitle2"
                    fontSize={16}
                    fontWeight={700}
                  >
                    GH
                  </Typography>
                </InputAdornment>
              ),
            }}
            placeholder=""
          />
        </Box>
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
