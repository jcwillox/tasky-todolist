import React, { ReactNode } from "react";
import { Container, styled } from "@mui/material";

const AppbarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

type AppContentProps = {
  children?: ReactNode;
};

const AppContent = ({ children }: AppContentProps) => {
  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: {
          xs: 2,
          md: 3
        }
      }}
    >
      <AppbarOffset />
      {children}
    </Container>
  );
};

export default AppContent;
