import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { fileContext } from "../eventBasicForm";
import axios from "axios";

export default function FileUploading() {
  const { file, setFile, uploadLink, setUploadLink } = useContext(fileContext);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };

    let Data = new FormData();
    Data.append("file", file);

    axios
      .post("https://liel2c.deta.dev/upload", Data, {
        ...config,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUploadLink(res.data.link);
        setFile(null);
      });
  }, [file, setUploadLink, setFile]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2">Uploading...</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
