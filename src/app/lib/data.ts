export const dynamic = 'force-dynamic';

import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  CustomersTableBkpType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  CustomerForm,
  Clases
} from './definitions';
import { formatCurrency } from './utils';
import { formatDateToLocal } from './utils';
import type { LatestReservas, User } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchUser(email: string): Promise<User> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}



export async function fetchReservasByClaseDiaHora(claseid: string, dia: string, hora: string) {
  if (!claseid || !dia || !hora) {
    return false;
  }
  try {
    const data = await sql`
      SELECT reservas.id, reservas.clase_id, reservas.hora, reservas.utilizada, reservas.create_date, reservas.customerId, reservas.fechareserva,
             customers.name AS customerName, customers.email AS customerEmail
      FROM reservas
      JOIN customers ON reservas.customerId = customers.id::text
      WHERE reservas.clase_id = ${claseid}
      AND reservas.hora = ${hora}
      AND reservas.fechareserva = ${dia}
      `;
    return data

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('');
  }
}

//AND reservas.fechareserva = ${dia}
//  AND reservas.hora = ${hora}
//WHERE reservas.clase_id = ${claseid}

export async function fetchisAdmin(id: string | undefined) {
  if (!id) {
    return false;
  }
  try {
    const data = await sql`SELECT * FROM users
      JOIN admins ON admins.user_id = users.id::text
      WHERE users.id = ${id} 
      `;

    if (data.length === 0) {
      return false;
    } else {
    return true;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch admin data.');
  }
}


//amount: formatCurrency(invoice.amount),

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name,  invoices.id, invoices.date
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      `;
    //console.log(data)
    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      date: formatDateToLocal(invoice.date),
    }));
    //console.log(latestInvoices)
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchClases() {
  try {
    const data = await sql<Clases[]>`
      SELECT
    c.id AS clase_id,
    c.nombre,
    ARRAY_AGG(DISTINCT cd.dia ORDER BY cd.dia ASC) AS dias,
    ARRAY_AGG(DISTINCT ch.hora ORDER BY ch.hora ASC) AS horas
FROM
    clases c
LEFT JOIN
    clases_dias cd ON c.id::text = cd.clases_id
LEFT JOIN
    clases_horas ch ON c.id::text = ch.clases_id

GROUP BY
    c.id, c.nombre -- ¡Es crucial agrupar por los campos de la tabla principal 'clases'!
ORDER BY
    c.nombre ASC; -- El ordenamiento final debe ser sobre la clase principal
      `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clases.');
  }
}

export async function fetchClasesByDay(dia: string) {
  try {
    const data = await sql<Clases[]>`
      SELECT
    c.id AS clase_id,
        c.nombre,
            ARRAY_AGG(DISTINCT cd.dia ORDER BY cd.dia ASC) AS dias,
                ARRAY_AGG(DISTINCT ch.hora ORDER BY ch.hora ASC) AS horas
                FROM
                    clases c
                    LEFT JOIN
                        clases_dias cd ON c.id::text = cd.clases_id
                        LEFT JOIN
                            clases_horas ch ON c.id::text = ch.clases_id
                            WHERE
                                cd.dia = ${dia}
                                GROUP BY
                                    c.id, c.nombre
      `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clases.');
  }
}


export async function fetchLatestReservas(id: string) {
  try {
    const data = await sql<LatestReservas[]>`
      SELECT id, clase_id, hora,  utilizada, create_date,customerId,fechareserva
      FROM reservas
      WHERE customerId = ${id}
      ORDER BY reservas.fechareserva DESC
      `;
    //console.log(data)
    const latestReservas = data.map((reserva) => ({
      ...reserva,
      create_date: formatDateToLocal(reserva.create_date),
      fechareserva: formatDateToLocal(reserva.fechareserva),
    }));
    //console.log(latestInvoices)
    return latestReservas;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reservas.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].count ?? '0');
    const numberOfCustomers = Number(data[1].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id

      ORDER BY invoices.date DESC
      
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}


/*

      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`} 


        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
*/

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchClienteById(id: string) {
  try {
    const data = await sql<CustomerForm[]>`
		SELECT
		  customers.id,
		  customers.name,
      customers.email,
      customers.telefono,
		  customers.ci,
      customers.creditos,
      customers.userdetalleid
		FROM customers
		WHERE
		  customers.id::text = ${id}
		ORDER BY customers.name ASC
	  `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cliente.');
  }
}

export async function fetchClienteByEmail(email: string) {
  try {
    const data = await sql<CustomerForm[]>`
		SELECT
		  customers.id,
		  customers.name,
      customers.email,
      customers.telefono,
		  customers.ci,
      customers.creditos
		FROM customers
		WHERE
		  customers.email = ${email}
		ORDER BY customers.name ASC
	  `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cliente.');
  }
}


export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name,
        email,
        telefono,
        ci,
        creditos
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Fallo para traer todos los clientes.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {

    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
      customers.email,
      customers.telefono,
		  customers.ci,
      customers.creditos
		FROM customers
		WHERE
		  customers.ci = ${query}
		ORDER BY customers.name ASC
	  `;

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchFilteredCustomersBkp(query: string) {
  try {
    const data = await sql<CustomersTableBkpType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}