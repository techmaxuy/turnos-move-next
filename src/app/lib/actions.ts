'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
//import { signIn } from '@/auth';
//import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Por favor selecciona un cliente.',
  }),
  servicioId: z.string({
    invalid_type_error: 'Por favor selecciona un servicio.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Por favor ingresa un monto mayor a $0.' }),
  formaPagoId: z.string({
    invalid_type_error: 'Por favor selecciona un tipo de pago.',
  }),
  banco: z.string().refine((value) => value !== '', {
     message: 'Por favor ingresa un banco.',
   }),

   tarjeta: z.string().refine((value) => value !== '', {
    message: 'Por favor ingresa un tarjeta.',
  }),

  transaccion: z.string().refine((value) => value !== '', {
    message: 'Por favor ingresa un transacion.',
  }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Por favor selecciona un estado pago.',
  }),
  date: z.string(),
});


const FormSchemaCliente = z.object({
  id: z.string(),
  nombre: z.string({
    invalid_type_error: 'Por favor ingresa un nombre.',
  }),
  email: z.string().email('Por favor ingresa un email valido.'),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });
const CreateCliente = FormSchemaCliente.omit({ id: true });
const UpdateCliente = FormSchemaCliente.omit({ id: true });

export type State = {
  errors?: {
    customerId?: string[];
    servicioId?: string[];
    amount?: string[];
    status?: string[];
    formaPagoId?: string[];
    banco?: string[];
    tarjeta?: string[];
    transaccion?: string[];
  };
  message?: string | null;
};

export type clienteState = {
  errors?: {
    nombre?: string[];
    email?: string[];
  };
  message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    servicioId: formData.get('servicioId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    formaPagoId: formData.get('formaPagoId'),
    banco: formData.get('banco'),
    tarjeta: formData.get('tarjeta'),
    transaccion: formData.get('transaccion'),
  });


  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan llenar campos. Imposible cargar pago.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, servicioId, amount, status,formaPagoId, banco, tarjeta , transaccion} = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date,tipo,banco,tarjeta,transaccion,servicio)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date},${formaPagoId},${banco},${tarjeta},${transaccion},${servicioId})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/configuracion/pagos');
  redirect('/configuracion/pagos');
}

export async function createCliente(prevState: clienteState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCliente.safeParse({
    nombre: formData.get('nombre'),
    email: formData.get('email'),
  });

  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {


    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan llenar campos. Imposible crear cliente.',
    };
  }

  // Prepare data for insertion into the database
  const { nombre, email} = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO customers (name, email)
      VALUES (${nombre}, ${email})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/configuracion/clientes');
  redirect('/configuracion/clientes');
}


export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function borrarCliente(id: string) {
  await sql`DELETE FROM customers WHERE id = ${id}`;
  revalidatePath('/configuracion/clientes');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    //await signIn('credentials', formData);
  } catch (error) {
    //if (error instanceof AuthError) {
      //switch (error.type) {
        //case 'CredentialsSignin':
          //return 'Invalid credentials.';
        //default:
          return 'Something went wrong.';
      }
    //}
    //throw error;
  }
