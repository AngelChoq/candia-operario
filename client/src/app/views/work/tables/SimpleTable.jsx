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
// import { useInsumos } from "../../../../context/InsumoProvider";
import { getInsumosRequest } from '../../../../api/insumos.api';
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

const subscribarList = [
  {
    name: 'receta 1',
    total: 500,
    bach: 1
  },
  {
    name: 'receta 2',
    total: 1000,
    bach: 2
  },
  {
    name: 'receta 3',
    total: 750,
    bach: 1.5
  },
  {
    name: 'receta 4',
    total: 5,
    bach: 3
  },
  {
    name: 'receta 5',
    total: 2,
    bach: 96
  }
];

const SimpleTable = () => {
  // const { insumos, loadInsumos } = useInsumos();

  useEffect(() => {
    console.log('Ejecutando useEffect inicial');
    // loadInsumos();
    async function loadInsumos(){
      console.log("Antes de ejecutar getInsumosRequest")
      const response = await getInsumosRequest();
      const insumos = await response.json();
      console.log("insumos")
      console.log(insumos);
      console.log("response")
      console.log(response);
    }
    loadInsumos();
    // console.log("insumos",insumos);
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
          {subscribarList.map((subscribarList, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{subscribarList.name}</TableCell>
              <TableCell align="center">
                {/* <Fab size="medium" color="primary" aria-label="Add" className="button">
                  <Icon>add</Icon>
                </Fab> */}
                <FormDialog />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
