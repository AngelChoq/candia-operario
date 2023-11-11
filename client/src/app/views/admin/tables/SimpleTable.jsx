import {
  Box,
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
import { useEffect } from "react";
import { useProductos } from 'context/ProductoProvider';
import moment from 'moment-timezone';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
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
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Nucleo</TableCell>
            <TableCell align="center">Bach</TableCell>
            <TableCell align="center">Fecha</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell align="center">{producto.id}</TableCell>
              <TableCell align="center">receta{producto.id}</TableCell>
              <TableCell align="center">{producto.nucleo}</TableCell>
              <TableCell align="center">{producto.batch}</TableCell>
              <TableCell align="center">{moment(producto.createAt).tz('America/Lima').format('DD/MM/YYYY HH:mm:ss')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
