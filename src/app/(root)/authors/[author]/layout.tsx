import { Container, Stack } from "@mui/material";

import { Overview } from "@/components/screens/Author";
import Tabs from "@/components/screens/Author/Tabs";
import Wrapper from "@/components/screens/Author/Wrapper";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ author: string }>;
}>) {

  return (
    <Wrapper>
      <Stack flex={1} pb={10} alignItems="center">
        <Overview />
        <Tabs />
        <Stack component={Container} mt={6} spacing={4} maxWidth="lg">
          {children}
        </Stack>
      </Stack>
    </Wrapper>
  );
}
