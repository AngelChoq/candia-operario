import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useProductos } from "context/ProductoProvider";
import moment from "moment-timezone";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const SimpleTable = () => {
  const { productos, loadProductos } = useProductos();
  useEffect(() => {
    loadProductos();
  }, []);
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">NÚMERO</TableCell>
            <TableCell align="center">NOMBRE</TableCell>
            <TableCell align="center">P. SOLICITADO (kg)</TableCell>
            <TableCell align="center">P. PRODUCIDO (kg)</TableCell>
            <TableCell align="center">FECHAS</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {productos
            .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
            .map((producto) => (
              <TableRow key={producto.id}>
                <TableCell align="center">{producto.id}</TableCell>
                <TableCell align="center">receta{producto.id}</TableCell>
                <TableCell align="center">{producto.pedido}</TableCell>
                <TableCell align="center">{producto.nucleo}</TableCell>
                <TableCell align="center">
                  {moment(producto.createAt)
                    .tz("America/Lima")
                    .format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
