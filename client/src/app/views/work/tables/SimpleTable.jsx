import {
  Box,
  Fab,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  TextField
} from '@mui/material';
import SimpleCheckbox from '../../material-kit/checkbox/SimpleCheckbox';
import FormDialog from '../dialog/FormDialog';
import { useProductos } from "../../../../context/ProductoProvider";
// import { getInsumosRequest } from '../../../../api/insumos.api';
import { useEffect } from "react";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const SimpleTable = ({data}) => {
  const { productos, loadProductosPedidos } = useProductos();

  useEffect(() => {
    loadProductosPedidos();
  }, []);
  
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">CÓDIGO</TableCell>
            <TableCell align="center">RECETA</TableCell>
            <TableCell align="center">P. SOLICITADO (kg)</TableCell>
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
                <FormDialog producto={producto} data={data}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
