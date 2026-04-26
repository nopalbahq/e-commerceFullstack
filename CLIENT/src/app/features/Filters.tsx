import { Box, Paper, Typography } from "@mui/material";
import { useGetFetchFiltersQuery } from "../pages/catalog/catalogApi";
import Search from "./Search";
import RadioButtonGroup from "../shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setBrands, setOrderBy, setTypes } from "../pages/catalog/catalogSlice";
import CheckboxButtons from "../shared/components/CheckboxButtons";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price High to low" },
  { value: "price", label: "Price Low to High" },
];

export default function Filters() {
  const { data } = useGetFetchFiltersQuery();
  const { orderBy, brands, types } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  if (!data?.brands || !data.types) return <Typography>Loading..</Typography>;

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Paper>
        <Search></Search>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={data.brands}
          checked={brands}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckboxButtons items={data.types} checked={types} onChange={(items: string[]) => dispatch(setTypes(items))} />
      </Paper>
    </Box>
  );
}
