import { Card, Grid, styled, useTheme, Box, Button } from '@mui/material';
import { Fragment, useState } from 'react';
import SimpleTable from './tables/SimpleTable';
import { Breadcrumb, SimpleCard } from 'app/components';
// const { SerialPort, ReadlineParser } = require('serialport');
import { SellRounded } from '@mui/icons-material';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));
// import Campaigns from './shared/Campaigns';
// import DoughnutChart from './shared/Doughnut';
// import RowCards from './shared/RowCards';
// import StatCards from './shared/StatCards';
// import StatCards2 from './shared/StatCards2';
// import TopSellingTable from './shared/TopSellingTable';
// import UpgradeCard from './shared/UpgradeCard';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize'
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary
}));

const Worker = () => {
  //console.log(SerialPort.list());
  const { palette } = useTheme();
  const [data, setData] = useState("");
  const handleSerialPort = async (values) => {
    try {
      const port = await navigator.serial.requestPort();
      // console.log(
      //   await navigator.serial.getPorts().then((port) => {
      //     console.log(port.name);
      //   })
      // );
      const info = port.getInfo();
      console.log(info.usbVendorId);
      console.log(info.usbProductId);
      console.log(info.bluetoothServiceClassId);
      await port.open({ baudRate: 9600 });
      const reader = port.readable.getReader();
      // navigator.serial.getPorts().then((ports) => {
      //   console.log(ports);
      // });

      // listSerialPorts();

      while (true) {
        const { value, done } = await reader.read();
        var myString = new TextDecoder().decode(value);
        myString = myString.match(/[0-9.]/g).join('');
        let pattern = /\d+(\.\d+)/g;
        let result = myString.match(pattern);
        if (result != null) {
          console.log(result[0]);
          setData(result[0]);
        }
        // setData(value)
      }
    } catch (e) {
      console.log(e);
    }
  };

  // async function listSerialPorts() {
  //   const ports = await navigator.serial.getPorts();
  //   return ports;
  // }

  async function listSerialPorts() {
    const ports = await navigator.serial.getPorts();
    ports.forEach((port) => {
      console.log(`Nombre: ${port.name}, Tipo: ${port.type}`);
    });
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Trabajador', path: '/work/worker' },
            { name: 'Lista de Recetas' }
          ]}
        />
      </Box>
      <Button onClick={handleSerialPort}>Iniciando Puertos</Button>
      <SimpleCard title="Seleccione Receta">
        <SimpleTable data={data}/>
      </SimpleCard>
    </Container>
  );
};

export default Worker;
