import { FilterInventory, Inventory } from "@/components/screens/Author";
import { Stack } from "@mui/material";


export default async function Home() {

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      spacing={4}

    >
      <Stack flex={{ xs: 1, md: 3 }}>
        <Inventory />
      </Stack>

      <Stack
        flex={{ xs: 1, md: 1 }}
        spacing={6}
      >
        <FilterInventory />
      </Stack>
    </Stack>
  );
}
