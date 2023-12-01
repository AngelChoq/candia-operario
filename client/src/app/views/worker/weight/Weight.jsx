import { Card, Grid, styled, useTheme, Box, Button } from "@mui/material";
import { Fragment, useState } from "react";
import SimpleTable from "./tables/SimpleTable";
import { Breadcrumb, SimpleCard } from "app/components";
// const { SerialPort, ReadlineParser } = require('serialport');
import { SellRounded } from "@mui/icons-material";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Weight = () => {
  //console.log(SerialPort.list());
  const [connectionStatus, setConnectionStatus] = useState("primary");
  const { palette } = useTheme();
  const [data, setData] = useState("");

  async function readFromPort() {
    // let ports = [];

    try {
      console.log("Punto prueba1");
      const port = await navigator.serial.requestPort();
      console.log("Punto prueba2");
      // Check if the port is already open
      // if (ports.includes(port)) {
      //   console.log("INTERNO - This port is already open");
      //   setConnectionStatus("error");
      //   return;
      // }

      if (port.isOpen) {
        await new Promise((resolve, reject) => {
          port.close(err => {
            if (err) {
              reject(err);
            } else {
              resolve();
              setConnectionStatus("success");
            }
          });
        });
      }
      console.log("port",port);
      await port.open({ baudRate: 9600 });
      // ports.push(port);
      

      if (port.readable) {
        setConnectionStatus("success");
        const reader = port.readable.getReader();
        const info = await port.getInfo();
        const d = new Date();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // The reader has been canceled.
            break;
          }
          var myString = new TextDecoder().decode(value);
          myString = myString.match(/[0-9.]/g).join("");
          let pattern = /\d+(\.\d+)/g;
          let result = myString.match(pattern);
          if (result != null) {
            console.log(`Data from port ${d.getTime()}: ${result[0]}`);
            console.log(result[0]);
            setData(result[0]);
          }
        }
      } else {
        console.log("Port is not readable");
        setConnectionStatus("error");
      }
    } catch (e) {
      console.log(e);
      setConnectionStatus("error");
    }
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Trabajador", path: "/worker/weight" },
            { name: "Lista de Recetas" },
          ]}
        />
      </Box>
      <Button
        variant="contained"
        color={connectionStatus === 'success' ? 'success' : connectionStatus === 'error' ? 'error' : 'primary'}
        onClick={readFromPort}
      >
        Conectar Balanza
      </Button>
      <SimpleCard title="Seleccione Receta">
        <SimpleTable data={data} connectionStatus={connectionStatus}/>
      </SimpleCard>
    </Container>
  );
};

export default Weight;
