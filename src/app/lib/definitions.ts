// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    email: string;
    password: string;
    userdetalleid: string;
  };
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
    telefono : string;
    ci:string;
    creditos: string;
    userdetalleid: string;
  };
  
  export type Invoice = {
    id: string;
    customer_id: string;
    amount: number;
    date: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'paid';
  };
  
  export type Revenue = {
    month: string;
    revenue: number;
  };
  
  export type LatestInvoice = {
    id: string;
    name: string;
    date: string;
    email: string;
    amount: string;
  };


  export type Clases = {
    clase_id: string;
    nombre: string;
    dias: [string];
    horas: [string];
  };

  export type Dias = {
    id: string;
    name: string;
  };

  export type Horas = {
    id: string;
    name: string;
  };

  export type LatestReservas = {
    id: string;
    clase_id: string;
    create_date: string;
    hora: string;
    utilizada: string;
    customerId: string;
    fechareserva: string;
  };
  
  // The database returns a number for amount, but we later format it to a string with the formatCurrency function
  export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
    amount: number;
  };
  
  export type InvoicesTable = {
    id: string;
    customer_id: string;
    name: string;
    email: string;
    date: string;
    amount: number;
    status: 'pending' | 'paid';
  };
  
  export type CustomersTableType = {
    id: string;
    name: string;
    email: string;
    ci:string;
    creditos: string;
  };

  export type CustomersTableBkpType = {
    id: string;
    name: string;
    email: string;
    total_invoices: number;
    total_pending: number;
    total_paid: number;
  };
  
  export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
  };
  
  export type CustomerField = {
    id: string;
    name: string;
    email: string;
    telefono : string;
    ci:string;
    creditos: string;
  };

  export type ClasesField = {
    id: string;
    name: string;
    dias: string[];
    horas: string[];
  };
  
  export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid';
  };

  export type  CustomerForm = {
    id: string;
    name: string;
    email: string;
    telefono : string;
    ci:string;
    creditos: string;
    userdetalleid: string;
  };