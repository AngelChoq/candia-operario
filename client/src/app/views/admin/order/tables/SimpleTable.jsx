import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  Icon,
} from "@mui/material";
import FormDialog from "../dialog/FormDialog";
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
  const { productos, deleteProducto, loadProductosPedidos } = useProductos();
  useEffect(() => {
    loadProductosPedidos();
  }, []);
  // useEffect(() => {
  //   loadProductosPedidos();
  // }, [productos]);
  const delProducto = async (id) => {
    await deleteProducto(id);
    loadProductosPedidos();
  }
  
  return (
    <Box width="100%" overflow="auto">
      <FormDialog loadProductosPedidos={loadProductosPedidos}/>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">CÓDIGO</TableCell>
            <TableCell align="center">RECETA</TableCell>
            <TableCell align="center">P. MEZCLA FINAL (kg)</TableCell>
            <TableCell align="center">FECHA</TableCell>
            <TableCell align="center">ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell align="center">{producto.id}</TableCell>
              <TableCell align="center">receta{producto.receta_id}</TableCell>
              <TableCell align="center">{producto.pedido}</TableCell>
              <TableCell align="center">
                  {moment(producto.created_at)
                    .tz("America/Lima")
                    .format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
              <TableCell align="center">
                <Fab
                  size="medium"
                  color="danger"
                  aria-label="Delete"
                  className="button"
                  onClick={() => delProducto(producto.id)}
                >
                  <Icon>delete</Icon>
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
