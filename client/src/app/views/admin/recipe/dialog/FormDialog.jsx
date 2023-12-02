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
  Card,
  Select,
  MenuItem,
  Grid,
  CardContent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useInsumos } from "context/InsumoProvider";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [receta, setReceta] = useState("");
  const { insumos, loadInsumos } = useInsumos();
  const [peso, setPeso] = useState(0.0);
  const [insumosSelect, setInsumosSelect] = useState([]);
  const [insumoSelect, setInsumoSelect] = useState('');
  const [insumosTable, setInsumosTable] = useState([]);
  const [insumoTable, setInsumoTable] = useState({});

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    // setInsumoSelect(event.target.value);
    const selectedInsumo = insumos.find(insumo => insumo.id === event.target.value);
    setInsumoSelect(selectedInsumo.id);
  };
  const handleAddInsumo = (event) => {
    console.log(insumoSelect);
    console.log(insumos);
    let temp = insumos.find(insumo => insumo.id === insumoSelect);
    
    // let temp = { ...insumos[insumoSelect] };
    console.log(temp);
    temp.peso = peso;
    
    setInsumosTable([...insumosTable, temp]);
  };

  const handleDeleteInsumo = (insumoTable) => {
    setInsumosTable(insumosTable.filter((item) => item !== insumoTable));
  };

  const handleCrear = (event) => {
    // setInsumoSelect(event.target.value);
  };

  useEffect(() => {
    loadInsumos();
  }, []);
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crear Receta
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Crear Receta</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Escriba un nombre para la receta
          </DialogContentText>
          <TextField
            fullWidth
            autoFocus
            id="receta"
            margin="dense"
            label="receta"
            onChange={(event) => setReceta(event.target.value)}
          />
          <DialogContentText>
            Escriba el porcentaje del núcleo de la receta
          </DialogContentText>
          <Box mb={2}>
            <TextField
              fullWidth
              id="peso"
              margin="dense"
              label="peso"
              type="number"
              onChange={(event) => setPeso(event.target.value)}
            />
          </Box>
          <Card variant="outlined">
            <CardContent>
              <DialogContentText>
                Agregue un insumo para la receta
              </DialogContentText>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={insumoSelect}
                    label="insumo"
                    onChange={handleChange}
                  >
                    {insumos.map((insumo) => (
                      <MenuItem key={insumo.id} value={insumo.id}>
                        {insumo.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="peso"
                    margin="dense"
                    label="Peso"
                    type="number"
                    onChange={(event) => setPeso(event.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Fab
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    className="button"
                    onClick={handleAddInsumo}
                  >
                    <Icon>add</Icon>
                  </Fab>
                </Grid>
              </Grid>
              <DialogContentText>Lista de Insumos Agregados</DialogContentText>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Item</TableCell>
                    <TableCell align="center">Receta</TableCell>
                    <TableCell align="center">Peso</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {insumosTable.map((insumoTable, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{insumoTable.nombre}</TableCell>
                      <TableCell align="center">{insumoTable.peso}</TableCell>
                      <TableCell align="center">
                        <Fab
                          size="medium"
                          color="danger"
                          aria-label="Delete"
                          className="button"
                          onClick={() => handleDeleteInsumo(insumoTable)}
                        >
                          <Icon>delete</Icon>
                        </Fab>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </CardContent>
          </Card>
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
