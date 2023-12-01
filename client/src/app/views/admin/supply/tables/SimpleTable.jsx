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
import { useInsumos } from "context/InsumoProvider";
import moment from "moment-timezone";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0} },
  },
}));

const SimpleTable = () => {
  const { insumos, deleteInsumo, loadInsumos } = useInsumos();
  useEffect(() => {
    loadInsumos();
  }, []);
  const delInsumo = async (id) => {
    await deleteInsumo(id);
    loadInsumos();
  }

  return (
    <Box width="100%" overflow="auto">
      <FormDialog loadInsumos={loadInsumos}/>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">NÚMERO</TableCell>
            <TableCell align="center">NOMBRE</TableCell>
            {/* <TableCell align="center">PESO (kg)</TableCell> */}
            <TableCell align="center">C. BARRAS</TableCell>
            <TableCell align="center">FECHA</TableCell>
            <TableCell align="center">ACCIONES</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {insumos
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((insumo) => (
              <TableRow key={insumo.id}>
                <TableCell align="center">{insumo.id}</TableCell>
                <TableCell align="center">{insumo.nombre}</TableCell>
                {/* <TableCell align="center">{insumo.peso}</TableCell> */}
                <TableCell align="center">{insumo.barras}</TableCell>
                <TableCell align="center">
                  {moment(insumo.created_at)
                    .tz("America/Lima")
                    .format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  <Fab
                    size="medium"
                    color="danger"
                    aria-label="Delete"
                    className="button"
                    onClick={() => delInsumo(insumo.id)}
                  >
                    <Icon>delete</Icon>
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
