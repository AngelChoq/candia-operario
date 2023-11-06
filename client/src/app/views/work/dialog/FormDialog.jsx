import { useState, useEffect } from "react";
import { Box, Fab, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useInsumos } from "../../../../context/InsumoProvider";

export default function FormDialog({ receta, data }) {
  const { getInsumosReceta } = useInsumos();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (open && insumos.length == 0) {
      const loadInsumosReceta = async () => {
        const temp = await getInsumosReceta(receta.id);
        if (temp) {
          temp.map((insumo) => {
            insumo.validado = false;
          });
        }
        setInsumos(temp);
      };
      loadInsumosReceta();
    }
  }, [open]);

  useEffect(() => {
    console.log("insumos", insumos);
    if (insumos.length > 0 && insumos[0] != undefined) {
      var tempInsumo = insumos.filter((insumo) => insumo.validado == false);
      setSelected(tempInsumo[0]);
    }
  }, [insumos]);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  const handleRefresh = () => {
    var temp = insumos;
    var tempSel = selected;
    setInsumos(
      temp.map((tempInsumo) => {
        if (tempInsumo.id == tempSel.id) {
          tempInsumo.validado = true;
        }
      })
    );
    handleClose();
    handleOpen();
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  function handleInputChange(event, field) {
    console.log(selected);
    const newValue = event.target.value;

    // Do something with the new value and field
    // if (field == "insumo") {
    var tempSelected = selected;
    console.log("tempSelected", tempSelected);
    if (newValue == tempSelected.barras) {
      console.log("correcto");
      setChecked(true);
    }
    // }
    console.log(`New value for ${field}: ${newValue}`);
  }

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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{receta.nombre}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {/* <StyledTable>
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
            </StyledTable> */}
          </DialogContentText>
          {selected.nombre}
          <br />
          {selected.peso ? (
            <TextField
              id="filled-read-only-input"
              value={selected.peso}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          ) : (
            <></>
          )}

          {checked ? (
            <>
              <br />
              <Icon fontSize="large">check</Icon>
              <TextField fullWidth id="peso" margin="dense" label="Peso" value={data} />
            </>
          ) : (
            <TextField
              fullWidth
              autoFocus
              id="insumo"
              margin="dense"
              label="Insumo"
              onChange={(event) => handleInputChange(event, "insumo")}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleRefresh} color="primary">
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
