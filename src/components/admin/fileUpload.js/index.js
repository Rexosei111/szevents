import { Box, Button, InputLabel, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext } from "react";
import { fileContext } from "../eventBasicForm";
import Image from "next/image";
import FileUploading from "./uploading";

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export default function FileUploadRoot({ link }) {
  const { file, setFile, uploadLink, setUploadLink } = useContext(fileContext);
  useEffect(() => {
    if (link !== null) {
      setUploadLink(link);
      setFile(null);
    }
  }, [link]);
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let file = e.dataTransfer.files[0];
    if (fileTypes.includes(file.type)) {
      setUploadLink(null);
      setFile(file);
    }
  };
  return (
    <>
      <InputLabel shrink htmlFor="coverImage">
        Cover Image
      </InputLabel>
      <Paper
        id="coverImage"
        elevation={0}
        variant="outlined"
        width={"100%"}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
        sx={{
          p: { xs: 0, md: uploadLink ? 0 : 2 },
          minHeight: 300,
          height: 300,
          maxHeight: 400,
          bgcolor: uploadLink ? "None" : "#f5f5f599",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderStyle: "dashed",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {uploadLink && (
            <Image
              src={uploadLink}
              alt="cover image"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
          {!uploadLink && (
            <>
              <CloudUploadIcon
                fontSize="large"
                sx={{
                  fontSize: 70,
                  color: (theme) => theme.palette.text.disabled,
                }}
              />
              {file ? (
                <FileUploading />
              ) : (
                <>
                  <Typography variant="subtitle2">
                    Drag and drop to upload image
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleChange}
                    name="image"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      disableElevation
                      sx={{ bgcolor: "#2F80ED", borderRadius: 8, my: 2 }}
                    >
                      Choose a file
                    </Button>
                  </label>
                </>
              )}
            </>
          )}
        </Box>
      </Paper>
    </>
  );
}
