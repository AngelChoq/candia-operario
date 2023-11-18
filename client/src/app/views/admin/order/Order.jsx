import { Card, Grid, styled, useTheme, Box, Button } from "@mui/material";
import { Fragment } from "react";
import SimpleTable from "./tables/SimpleTable";
import { Breadcrumb, SimpleCard } from "app/components";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Adminitrator = () => {
  const { palette } = useTheme();

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Administrador", path: "/admin/order" },
            { name: "Lista de Pedidos" },
          ]}
        />
      </Box>
      <SimpleCard title="Pedidos">
        {/* <StyledButton variant="contained" color="primary" size="large" justify="center">
          Guardar Cambios
        </StyledButton> */}
        <SimpleTable />
      </SimpleCard>
    </Container>
  );
};

export default Adminitrator;
