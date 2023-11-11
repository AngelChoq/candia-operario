import { useState, useEffect } from "react";
import { Box, Fab, Grid, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useInsumos } from "../../../../context/InsumoProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function FormDialog({ receta, data }) {
  const { getInsumosReceta } = useInsumos();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [selected, setSelected] = useState({});
  const [pAcumulado, setPAcumulado] = useState(0.0);

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

  // useEffect(() => {
  //   console.log("selected", selected);
  // }, [selected]);

  const handleRefresh = () => {
    console.log("insumos", insumos);
    console.log("selected", selected);
    // var temp = insumos;
    // var tempSel = selected;
    // setInsumos(
    //   temp.map((tempInsumo) => {
    //     if (tempInsumo.id == tempSel.id) {
    //       tempInsumo.validado = true;
    //     }
    //   })
    // );
    // handleClose();
    // handleOpen();
    const updatedInsumos = insumos.map((insumo) =>
      insumo.id === selected.id ? { ...insumo, validado: true } : insumo
    );
    console.log("updatedInsumos", updatedInsumos);
    setInsumos(updatedInsumos);
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

  const handleButtonClick = () => {
    const newValue = parseFloat(data);
    if (!isNaN(newValue)) {
      setPAcumulado((prevPAcumulado) => prevPAcumulado + newValue);
    }
  };

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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <DialogContentText></DialogContentText>
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
            Peso Acumulado
            <TextField
              id="filled-read-only-input"
              value={pAcumulado}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            {checked ? (
              <>
                <br />
                <Icon style={{ fontSize: 50 }}>check</Icon>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={7} justify="center">
                    <TextField
                      fullWidth
                      id="peso"
                      margin="dense"
                      label="Peso"
                      value={data}
                    />
                  </Grid>
                  <Grid item xs={5} justify="center">
                    <Button
                      variant="contained"
                      style={{ fontSize: "10px" }}
                      startIcon={<AddCircleIcon />}
                      onClick={handleButtonClick}
                    >
                      Registrar Bolsa
                    </Button>
                  </Grid>
                </Grid>
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
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          {insumos.filter((insumo) => !insumo.validado).length > 1 &&
            pAcumulado === selected.peso && (
              <Button
                variant="contained"
                onClick={handleRefresh}
                color="primary"
              >
                Siguiente
              </Button>
            )}
          {insumos.filter((insumo) => !insumo.validado).length > 1 &&
            pAcumulado > selected.peso && (
              <Button variant="contained" color="error" onClick={handleRefresh}>
                Forzar Pesado
              </Button>
            )}
          {insumos.filter((insumo) => !insumo.validado).length === 1 && (
            <Button variant="outlined" color="success" onClick={handleClose}>
              Registrar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
