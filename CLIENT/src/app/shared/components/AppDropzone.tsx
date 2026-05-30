import { useCallback } from "react";
import { useController, type UseControllerProps, type FieldValues } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

// 1. Tambahkan generic <TFieldValues> pada tipe Props
type Props<TFieldValues extends FieldValues> = {
  name: string;
} & UseControllerProps<TFieldValues>;

// 2. Tambahkan generic <TFieldValues> pada fungsi komponen
export default function AppDropzone<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { fieldState, field } = useController({ ...props });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });

        field.onChange(fileWithPreview);
      }
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dzStyles = {
    display: "flex",
    border: "dashed 2px #cfcdcd",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    aligthItems: "center",
    height: 200,
    weight: 500,
  };

  const dzActive = {
    borderColor: "green",
  };

  return (
    <div {...getRootProps()}>
      <FormControl style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} error={!!fieldState.error}>
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: "100px" }} />
        <Typography variant="h4">Drop image here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
