import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} sx={{ my: 0 }} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel key={label} control={<Radio sx={{ py: 0.7 }} />} label={label} value={value} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
