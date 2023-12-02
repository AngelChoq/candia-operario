import { useState, useEffect } from "react";
import {
  Box,
  Fab,
  Icon,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useRecetas } from "context/RecetaProvider";
import { useProductos } from "context/ProductoProvider";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

export default function FormDialog({ loadProductosPedidos }) {
  const [open, setOpen] = useState(false);
  const { recetas, loadRecetas } = useRecetas();
  const { createProducto } = useProductos();
  const [receta, setReceta] = useState("");
  const [peso, setPeso] = useState(0.0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setReceta(event.target.value);
  };
  const handleRegistrar = (event) => {
    const producto = {receta_id: receta, pedido: peso};
    const crearProducto = async () => {
      await createProducto(producto);
    };
    crearProducto().then(() => {loadProductosPedidos()});
    // loadProductosPedidos();
    setOpen(false);
  };

  useEffect(() => {
    loadRecetas();
  }, []);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crear Pedido
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Receta 1</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {/* <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Receta</TableCell>
                  <TableCell align="center">Peso</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subscribarList.map((subscribarList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{subscribarList.name}</TableCell>
                    <TableCell align="center">
                      {subscribarList.weight}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable> */}
            Seleccione la receta y la cantidad en kilogramos a producir.
          </DialogContentText>
          <InputLabel id="demo-simple-select-label">Receta</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={receta}
            label="receta"
            onChange={handleChange}
          >
            {recetas.map((receta) => (
              <MenuItem key={receta.id} value={receta.id}>
                {receta.nombre}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            autoFocus
            id="peso"
            margin="dense"
            label="Peso"
            onChange={(event) => setPeso(event.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleRegistrar} color="success">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
