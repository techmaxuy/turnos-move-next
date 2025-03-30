// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const usuarios = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'root',
      email: 'techmax79@gmail.com',
      password: '3710Mateo',
    },
  ];
  
  const clientes = [
    {
      id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
      name: 'Jhole Maleiro',
      email: 'jmaleiro@gmail.com',
    },
    {
      id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      name: 'Claudia Yarza',
      email: 'caiayarza@gmail.com',
    },
    {
      id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
      name: 'Mateo DUva',
      email: 'mateoduva2007@gmail.com',
    },
  ];
  
  const pagos = [
    {
      customer_id: clientes[0].id,
      amount: 2400,
      status: 'pago',
      date: '2025-03-06',
      tipo: 'efectivo',
      banco:'', 
      tarjeta: '',
      transaccion: '',
      servicio: '24c',
    },
    {
      customer_id: clientes[0].id,
      amount: 2400,
      status: 'pago',
      date: '2025-02-06',
      tipo: 'efectivo',
      banco:'', 
      tarjeta: '',
      transaccion: '',
      servicio: '24c',
    },
    {
      customer_id: clientes[0].id,
      amount: 2400,
      status: 'pago',
      date: '2025-01-06',
      tipo: 'efectivo',
      banco:'', 
      tarjeta: '',
      transaccion: '',
      servicio: '24c',
    },
    {
      customer_id: clientes[1].id,
      amount: 1900,
      status: 'pago',
      date: '2025-02-06',
      tipo: 'tarjeta',
      banco:'', 
      tarjeta: 'visa',
      transaccion: '123456789',
      servicio: '12c',
    },
    {
      customer_id: clientes[1].id,
      amount: 1900,
      status: 'pago',
      date: '2025-01-06',
      tipo: 'tarjeta',
      banco:'', 
      tarjeta: 'visa',
      transaccion: '123456745',
      servicio: '12c',
    },
    {
      customer_id: clientes[2].id,
      amount: 1900,
      status: 'pendiente',
      date: '2025-02-06',
      tipo: 'giro',
      banco: 'BROU',
      tarjeta: '',
      transaccion: '123756745',
      servicio: '12c',
    },
    {
      customer_id: clientes[2].id,
      amount: 1900,
      status: 'pago',
      date: '2025-01-06',
      tipo: 'giro',
      banco: 'BROU',
      tarjeta: '',
      transaccion: '148456745',
      servicio: '12c',
    },
  ];
  
  const revenue = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 2500 },
    { month: 'May', revenue: 2300 },
    { month: 'Jun', revenue: 3200 },
    { month: 'Jul', revenue: 3500 },
    { month: 'Aug', revenue: 3700 },
    { month: 'Sep', revenue: 2500 },
    { month: 'Oct', revenue: 2800 },
    { month: 'Nov', revenue: 3000 },
    { month: 'Dec', revenue: 4800 },
  ];
  
  export { usuarios, clientes, pagos, revenue };