import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  Icon,
} from "@mui/material";
import FormDialog from "../dialog/FormDialog";
import { useEffect } from "react";
import { useRecetas } from "context/RecetaProvider";
import moment from "moment-timezone";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const SimpleTable = () => {
  const { recetas, deleteReceta, loadRecetas } = useRecetas();
  useEffect(() => {
    loadRecetas();
  }, []);
  const delReceta = async (id) => {
    await deleteReceta(id);
    loadRecetas();
  }

  return (
    <Box width="100%" overflow="auto">
      <FormDialog loadRecetas={loadRecetas}/>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">NÚMERO</TableCell>
            <TableCell align="center">NOMBRE</TableCell>
            <TableCell align="center">NÚCLEO (%)</TableCell>
            <TableCell align="center">FECHA</TableCell>
            <TableCell align="center">ACCIONES</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {recetas
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((receta) => (
              <TableRow key={receta.id}>
                <TableCell align="center">{receta.id}</TableCell>
                <TableCell align="center">{receta.nombre}</TableCell>
                <TableCell align="center">{receta.peso}</TableCell>
                <TableCell align="center">
                  {moment(receta.created_at)
                    .tz("America/Lima")
                    .format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  <Fab
                    size="medium"
                    color="danger"
                    aria-label="Delete"
                    className="button"
                    onClick={() => delReceta(receta.id)}
                  >
                    <Icon>delete</Icon>
                  </Fab>
                  <Fab
                    size="medium"
                    color="danger"
                    aria-label="Delete"
                    className="button"
                    onClick={() => delReceta(receta.id)}
                  >
                    <Icon>visibility</Icon>
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
