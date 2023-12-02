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
  CardContent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useRecetasInsumos } from "context/RecetaInsumoProvider";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

export default function FormDialogList({ recetaid }) {
  const [open, setOpen] = useState(false);
  const { getRecetaInsumoList } = useRecetasInsumos();
  const [insumosTable, setInsumosTable] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const loadRecetaInsumo = async () => {
      if (recetaid) {
        const recetasInsumos = await getRecetaInsumoList(recetaid);
        console.log(recetasInsumos);
        setInsumosTable(recetasInsumos);
      }
    };
    loadRecetaInsumo();
  }, []);
  return (
    <Box>
      <Fab
        size="medium"
        color="danger"
        aria-label="Delete"
        className="button"
        onClick={handleClickOpen}
      >
        <Icon>visibility</Icon>
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Lista de Insumos</DialogTitle>

        <DialogContent>
          <Card variant="outlined">
            <CardContent>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Item</TableCell>
                    <TableCell align="center">Insumo</TableCell>
                    <TableCell align="center">Peso</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {insumosTable && insumosTable.length > 0 ? (
                    insumosTable.map((insumoTable, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          {insumoTable.nombre}
                        </TableCell>
                        <TableCell align="center">{insumoTable.peso}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        No hay insumos
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </StyledTable>
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
