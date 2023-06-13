import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { newEventContext } from "@/components/pages/admin/events/new";
import { LoadingButton } from "@mui/lab";
import { DateRangeRounded } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";

const basicTicketFormSchema = yup
  .object({
    total: yup.number().required(),
    price: yup
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
export default function TicketsForm() {
  const { newEventForm, setNewEventForm } = useContext(newEventContext);
  const [saved, setSaved] = useState(true);
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(basicTicketFormSchema),
  });

  const onSubmit = async (data) => {
    setNewEventForm((prevState) => ({
      ...prevState,
      ticketInfo: { ...data, startDate: start_date, endDate: end_date },
    }));
    setSaved(true);
  };

  const handleStartDateChange = (value) => {
    setSaved(false);
    setStart_date(value?.$d);
  };

  const handleEndDateChange = (value) => {
    setSaved(false);
    setEnd_date(value?.$d);
  };
  return (
    <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack flexDirection={"column"} gap={2}>
        <Stack
          flexDirection={"row"}
          gap={2}
          justifyContent={"space-between"}
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
        >
          <Box width={"100%"}>
            <InputLabel shrink htmlFor="total">
              Number of tickets
            </InputLabel>
            <TextField
              fullWidth
              id="total"
              {...register("total")}
              variant="outlined"
              type={"number"}
              onChange={() => setSaved(false)}
              error={errors.total ? true : false}
              helperText={
                errors.total
                  ? errors.total?.message
                  : "Total number of tickets provisioned for the event."
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              placeholder="550"
            />
          </Box>
          <Box width={"100%"}>
            <InputLabel shrink htmlFor="price">
              Price per ticket
            </InputLabel>
            <TextField
              fullWidth
              id="price"
              {...register("price")}
              variant="outlined"
              type={"number"}
              onChange={() => setSaved(false)}
              error={errors.price ? true : false}
              helperText={
                errors.price ? errors.price?.message : "Price of a ticket"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="subtitle2" fontSize={20}>
                      GH
                    </Typography>
                  </InputAdornment>
                ),
              }}
              placeholder="50"
            />
          </Box>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={2}
          justifyContent={"space-between"}
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
        >
          <Box width={"100%"}>
            <InputLabel shrink htmlFor="startDate">
              Sales starts at
            </InputLabel>
            <DateTimePicker
              id="startDate"
              onChange={handleStartDateChange}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box width={"100%"}>
            <InputLabel shrink htmlFor="endDate">
              Sales ends at
            </InputLabel>
            <DateTimePicker
              id="endDate"
              onChange={handleEndDateChange}
              sx={{ width: "100%" }}
            />
          </Box>
        </Stack>
      </Stack>
      <Stack width={"100%"}>
        <LoadingButton
          variant="contained"
          type="submit"
          disabled={saved}
          size="small"
          disableElevation
          sx={{ ml: "auto", mt: 1 }}
        >
          save{saved && "d"}
        </LoadingButton>
      </Stack>
    </form>
  );
}