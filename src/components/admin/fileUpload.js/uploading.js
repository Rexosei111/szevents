import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { fileContext } from "../eventBasicForm";
import axios, { isAxiosError } from "axios";
import { randomUUID } from "crypto";

export default function FileUploading() {
  const { file, setFile, uploadLink, setUploadLink } = useContext(fileContext);
  const [fileuploadurl, setfileuploadurl] = useState(null);

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
    async function getDownloadUrl() {
      try {
        const { data: uploadData } = await axios.post("/api/files", {
          name: file.name,
          type: file.type,
        });
        if (uploadData.url !== null) {
          const { data: downloadUrl } = await axios.put(uploadData.url, file, {
            ...config,
            headers: {
              "Content-Type": file.type,
            },
          });
          setFile(null);
          setUploadLink(process.env.NEXT_PUBLIC_BUCKET_URL + uploadData.key);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log("Unable to upload image.");
        }
      }
    }

    getDownloadUrl();
    // let Data = new FormData();
    // Data.append("file", file);
    // if (fileuploadurl !== null) {
    //   axios
    //     .put(fileuploadurl, file, {
    //       ...config,
    //       headers: {
    //         "Content-Type": file.type,
    //       },
    //     })
    //     .then((res) => {
    //       setFile(null);
    //       setfileuploadurl(null);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setFile(null);
    //       setfileuploadurl(null);
    //     });
    // }
  }, [file]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2">Uploading...</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
