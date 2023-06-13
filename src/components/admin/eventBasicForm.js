import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import TitleIcon from "@mui/icons-material/Title";
import RichEditor from "./editor";
import FileUploadRoot from "./fileUpload.js";
import { createContext } from "react";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { newEventContext } from "@/components/pages/admin/events/new";

export const fileContext = createContext("");
const basicFormSchema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function EventBasicForm() {
  const { newEventForm, setNewEventForm } = useContext(newEventContext);
  console.log(newEventForm);
  const [file, setFile] = useState(null);
  const [uploadLink, setUploadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(true);
  const [dateTime, setDateTime] = useState({
    startDate: null,
    startTime: null,
  });
  const router = useRouter();
  const [description, setDescription] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(basicFormSchema),
    defaultValues: newEventForm,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const finalData = {
      ...data,
      ...dateTime,
      description,
      coverImage: uploadLink,
    };
    setNewEventForm((prevState) => ({
      ...prevState,
      ...finalData,
    }));
    setSaved(true);
    setLoading(false);
  };

  const handleDateChange = (dateObj) => {
    if (dateObj === null) {
      setDateTime((prevState) => ({
        ...prevState,
        startDate: null,
      }));
      return null;
    }
    setDateTime((prevState) => ({
      ...prevState,
      startDate: dateObj?.$d,
    }));
    setSaved(false);
  };

  const handleTimeChange = (timeObj) => {
    if (timeObj === null) {
      setDateTime((prevState) => ({
        ...prevState,
        startTime: null,
      }));
      return null;
    }
    setDateTime((prevState) => ({
      ...prevState,
      startTime: timeObj?.$d,
    }));
    setSaved(false);
  };
  return (
    <fileContext.Provider
      value={{
        file,
        setFile,
        uploadLink,
        setUploadLink,
        description,
        setDescription,
        setSaved,
      }}
    >
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"column"} gap={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box width={{ xs: "100%", md: "60%" }}>
              <InputLabel shrink htmlFor="name">
                Name of Event
              </InputLabel>
              <TextField
                fullWidth
                id="name"
                {...register("name")}
                variant="outlined"
                type={"text"}
                onChange={() => setSaved(false)}
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name?.message : null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Title"
              />
            </Box>
            <Typography variant="subtitle2" color={"GrayText"}>
              This title will be displayed on the event page
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box width={{ xs: "100%" }}>
              <InputLabel shrink htmlFor="description">
                Description
              </InputLabel>
              <RichEditor />
            </Box>
            <Typography variant="subtitle2" color={"GrayText"} my={1}>
              Description about the event. This information will be displayed on
              the event details page
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box width={{ xs: "100%", md: "50%" }}>
              <InputLabel shrink htmlFor="date">
                Start Date
              </InputLabel>
              <StaticDatePicker
                onChange={handleDateChange}
                id="date"
                sx={{ bgcolor: "#f5f5f599", borderRadius: "20px 0 0 20px" }}
                disablePast
              />
            </Box>
            <Box width={{ xs: "100%", md: "50%" }}>
              <InputLabel shrink htmlFor="time">
                Start time
              </InputLabel>
              <StaticTimePicker
                onChange={handleTimeChange}
                id="time"
                sx={{ bgcolor: "#f5f5f599", borderRadius: "0 20px 20px 0" }}
              />
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            spacing={2}
            flexWrap={{ xs: "wrap", md: "wrap" }}
          >
            <Box width={{ xs: "100%", md: "100%" }}>
              <FileUploadRoot />
            </Box>
            <Typography variant="subtitle2" color={"GrayText"}>
              This will be displayed as the cover photo on the event listing and
              detail page.
            </Typography>
          </Stack>

          <LoadingButton
            loading={loading}
            size="small"
            variant="contained"
            disabled={saved}
            disableElevation
            sx={{ ml: "auto" }}
            type="submit"
          >
            save{saved && "d"}
          </LoadingButton>
        </Stack>
      </form>
    </fileContext.Provider>
  );
}
