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
  }
];

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Fab
        size="medium"
        color="primary"
        aria-label="Add"
        className="button"
        onClick={handleClickOpen}
      >
        <Icon>add</Icon>
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Receta 1</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Insumo</TableCell>
                  <TableCell align="center">Peso Kg</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subscribarList.map((subscribarList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{subscribarList.name}</TableCell>
                    <TableCell align="center">{subscribarList.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </DialogContentText>

          <TextField fullWidth autoFocus id="insumo" margin="dense" label="Insumo" />
          <TextField fullWidth id="peso" margin="dense" label="Peso" />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Siguiente
          </Button>
          <Button variant="outlined" color="warning" onClick={handleClose}>
            Forzar Pesado
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
