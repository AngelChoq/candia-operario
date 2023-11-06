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
import { useInsumos } from "../../../../context/InsumoProvider";
import { useRecetas } from "../../../../context/RecetaProvider";
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

const SimpleTable = () => {
  const { recetas, loadRecetas } = useRecetas();

  useEffect(() => {
    loadRecetas();
  }, []);
  
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Item Prueba</TableCell>
            <TableCell align="center">Receta</TableCell>
            <TableCell align="center">Habilitar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recetas.map((receta, index) => (
            <TableRow key={index}>
              <TableCell align="center">{receta.id}</TableCell>
              <TableCell align="center">{receta.nombre}</TableCell>
              <TableCell align="center">
                <FormDialog receta={receta}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
