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
import { useInsumos } from "context/InsumoProvider";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const { createInsumo, loadInsumos } = useInsumos();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCrear = (event) => {
    const insumo = {nombre: nombre, barras: codigo};
    const crearInsumo = async () => {
      await createInsumo(insumo);
    };
    crearInsumo().then(() => {loadInsumos()});
    // loadProductosPedidos();
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crear Insumo
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear Insumo</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Escriba el nombre del insumo.
          </DialogContentText>
          <TextField
            fullWidth
            autoFocus
            id="nombre"
            margin="dense"
            label="Nombre"
            onChange={(event) => setNombre(event.target.value)}
          />
          <DialogContentText>
            Escriba el código de barras del insumo.
          </DialogContentText>
          <TextField
            fullWidth
            id="codigo"
            margin="dense"
            label="codigo"
            onChange={(event) => setCodigo(event.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleCrear} color="success">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
