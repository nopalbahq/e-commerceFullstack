import { Box, FormControl, FormControlLabel, FormGroup, Paper, Radio, TextField } from "@mui/material";
import { useGetFetchFiltersQuery } from "./catalogApi";
import { CheckBox } from "@mui/icons-material";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price High to low" },
  { value: "price", label: "Price Low to High" },
];

export default function Filters() {
  const { data } = useGetFetchFiltersQuery();
  console.log(data);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper>
        <TextField label="search products" variant="outlined" fullWidth />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <FormControl>
          {sortOptions.map(({ value, label }) => (
            <FormControlLabel key={label} control={<Radio sx={{ py: 0.7 }} />} label={label} value={value} />
          ))}
        </FormControl>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {data &&
            data.brand.map((item) => (
              <FormControlLabel
                key={item}
                control={<CheckBox color="secondary" sx={{ py: 0.7, fontSize: 40 }} />}
                label={item}
              />
            ))}
        </FormGroup>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {data &&
            data.type.map((item) => (
              <FormControlLabel
                key={item}
                control={<CheckBox color="secondary" sx={{ py: 0.7, fontSize: 40 }} />}
                label={item}
              />
            ))}
        </FormGroup>
      </Paper>
    </Box>
  );
}
