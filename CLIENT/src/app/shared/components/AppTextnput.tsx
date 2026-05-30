import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type UseControllerProps, type FieldValues } from "react-hook-form";

// 1. Tambahkan generic <TFieldValues> pada tipe Props
type Props<TFieldValues extends FieldValues> = {
  label: string;
} & UseControllerProps<TFieldValues> & // <- Teruskan tipe generic ke sini
  Omit<TextFieldProps, "name">; // Omit 'name' agar tidak bentrok antara MUI dan react-hook-form

// 2. Tambahkan generic <TFieldValues> pada fungsi komponen
export default function AppTextnput<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
  const { fieldState, field } = useController({ ...props });

  return (
    <TextField
      {...props}
      {...field}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
