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
    bach: 1,
    checked: true
  },
  {
    name: 'receta 2',
    total: 1000,
    bach: 2,
    checked: true
  },
  {
    name: 'receta 3',
    total: 750,
    bach: 1.5,
    checked: true
  },
  {
    name: 'receta 4',
    total: 1250,
    bach: 2.5,
    checked: true
  },
  {
    name: 'receta 5',
    total: 1500,
    bach: 3,
    checked: true
  },
  {
    name: 'receta 6',
    total: 250,
    bach: 0.5,
    checked: false
  }
];

const SimpleTable = () => {
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Núcleo</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Bach</TableCell>
            <TableCell align="center">Habilitar</TableCell>
            <TableCell align="center">Insumos</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subscribarList.map((subscribarList, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{subscribarList.name}</TableCell>
              <TableCell align="center">
                <TextField
                  id="standard-basic"
                  variant="outlined"
                  defaultValue={subscribarList.total}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  id="standard-basic"
                  variant="outlined"
                  defaultValue={subscribarList.bach}
                />
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <Checkbox
                    value="checkedA"
                    checked={subscribarList.checked}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </IconButton>
              </TableCell>
              <TableCell align="center">
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
