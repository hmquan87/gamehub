import { About, NewsList } from "@/components/screens/Author";
import Activities from "@/components/screens/Author/Activities";
import { Stack } from "@mui/material";


export default async function Home() {

  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      spacing={4}

    >
      <Stack flex={{ xs: 1, md: 4 }}>
        <NewsList />
      </Stack>

      <Stack
        flex={{ xs: 1, md: 2 }}
        spacing={4}
      >
        <About />
        <Activities />
      </Stack>
    </Stack>
  );
}
