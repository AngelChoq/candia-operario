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
import { useProductos } from "../../../../context/ProductoProvider";
import { useIngredientes } from "../../../../context/IngredienteProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { set } from "lodash";

export default function FormDialog({ producto, data }) {
  const { getInsumosReceta } = useInsumos();
  const { updateProducto, loadProductosPedidos } = useProductos();
  const { createIngrediente } = useIngredientes();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [selected, setSelected] = useState({});
  const [pRegistrado, setPRegistrado] = useState(0.0);
  const [pAcumulado, setPAcumulado] = useState(0.0);
  const [ingredientes, setIngredientes] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (open && insumos.length == 0) {
      const loadInsumosReceta = async () => {
        const temp = await getInsumosReceta(producto.receta_id);
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
    if (insumos.length > 0 && insumos[0] != undefined) {
      var tempInsumo = insumos.filter((insumo) => insumo.validado == false);
      setSelected(tempInsumo[0]);
    }
  }, [insumos]);

  useEffect(() => {
    setPAcumulado(pRegistrado + Number(data));
  }, [data]);

  // useEffect(() => {
  //   console.log("selected", selected);
  // }, [selected]);
  useEffect(() => {
    console.log("ingredientes", ingredientes);
  }, [ingredientes]);

  const handleNext = () => {
    const updatedInsumos = insumos.map((insumo) =>
      insumo.id === selected.id ? { ...insumo, validado: true } : insumo
    );
    var ingredienteTemp = {
      producto_id: producto.id,
      insumo_id: selected.id,
      peso: pRegistrado,
    };
    setIngredientes((prevIngredientes) => [
      ...prevIngredientes,
      ingredienteTemp,
    ]);
    setInsumos(updatedInsumos);
    setPRegistrado(0.0);
    setChecked(false);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setChecked(false);
    setPRegistrado(0.0);
    setPAcumulado(0.0);
    setSelected({});
    setInsumos([]);
    setIngredientes({});
    setOpen(false);
  };

  const handleRegistrar = () => {
    var ingredienteTemp = {
      producto_id: producto.id,
      insumo_id: selected.id,
      peso: pRegistrado,
    };
    var ingredientesTemp = ingredientes;
    ingredientesTemp.push(ingredienteTemp);
    console.log("ingredientesTemp", ingredientesTemp);
    ingredientesTemp.map(async (ingrediente) => {
      await createIngrediente(ingrediente);
    });
    const upProducto = async () => {
      if (producto.id) {
        await updateProducto(producto.id, { nucleo: pRegistrado });
        loadProductosPedidos();
      }
    };
    upProducto();
    setChecked(false);
    setPRegistrado(0.0);
    setPAcumulado(0.0);
    setSelected({});
    setInsumos([]);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  function handleInputChange(event, field) {
    console.log(selected);
    const newValue = event.target.value;

    // Do something with the new value and field
    // if (field == "insumo") {
    var tempSelected = selected;
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
      setPRegistrado((prevPRegistrado) => prevPRegistrado + newValue);
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
        <DialogTitle id="form-dialog-title">
          receta{producto.receta_id}
        </DialogTitle>

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
                value={selected.peso * producto.pedido}
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
                Peso Registrado
                <TextField
                  id="filled-read-only-input"
                  value={pRegistrado}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
                Peso Acumulado
                <TextField
                  id="filled-read-only-input"
                  value={pAcumulado}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
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
                    {/* <Button
                      variant="contained"
                      style={{ fontSize: "10px" }}
                      startIcon={<AddCircleIcon />}
                      onClick={() => {
                        setIsButtonDisabled(true);
                        setTimeout(() => {
                          handleButtonClick();
                          setIsButtonDisabled(false);
                        }, 1000); // 1000 milliseconds = 1 second
                      }}
                      disabled={isButtonDisabled}
                    >
                      Registrar Bolsa
                    </Button> */}
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
            pRegistrado === selected.peso * producto.pedido && (
              <Button variant="contained" onClick={handleNext} color="primary">
                Siguiente
              </Button>
            )}
          {insumos.filter((insumo) => !insumo.validado).length > 1 &&
            pRegistrado > selected.peso * producto.pedido && (
              <Button variant="contained" color="error" onClick={handleNext}>
                Forzar Pesado
              </Button>
            )}
          {insumos.filter((insumo) => !insumo.validado).length === 1 &&
            pRegistrado >= selected.peso * producto.pedido && (
              <Button
                variant="outlined"
                color="success"
                onClick={handleRegistrar}
              >
                Registrar
              </Button>
            )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
