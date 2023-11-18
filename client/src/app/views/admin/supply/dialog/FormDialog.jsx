import { useState } from 'react';
import {
  Box,
  Fab,
  Icon,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
    name: 'insumo 1',
    total: 2,
    weight: 5,
    checked: true
  },
  {
    name: 'insumo 2',
    total: 4,
    weight: 5,
    checked: true
  },
  {
    name: 'insumo 3',
    total: 2,
    weight: 50,
    checked: false
  },
  {
    name: 'insumo 4',
    total: 5,
    weight: 3,
    checked: false
  }
];

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crear Insumo
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Insumo 1</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Insumo</TableCell>
                  <TableCell align="center">Peso</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subscribarList.map((subscribarList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{subscribarList.name}</TableCell>
                    <TableCell align="center">{subscribarList.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Regresar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
