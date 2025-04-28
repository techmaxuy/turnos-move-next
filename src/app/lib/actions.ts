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

  transaccion: z.string(),
  date: z.string(),
});


const FormSchemaCliente = z.object({
  id: z.string(),
  nombre: z.string({
    invalid_type_error: 'Por favor ingresa un nombre.',
  }),
  email: z.string().email('Por favor ingresa un email valido.'),
  telefono: z.string({
    invalid_type_error: 'Por favor ingresa un telefono.',
  }),
  creditos: z.string(),
  ci: z.string({
    invalid_type_error: 'Por favor ingresa un numero de Cedula de identidad.',
  }).min(8, {
    message: 'El CI debe tener al menos 8 digitos.',
  }).max(8, {
    message: 'El CI debe como maximo 8 digitos.',  
  })
  
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });
const CreateCliente = FormSchemaCliente.omit({ id: true, creditos: true });
const UpdateCliente = FormSchemaCliente.omit({ id: true });

export type State = {
  errors?: {
    customerId?: string[];
    servicioId?: string[];
    amount?: string[];
    formaPagoId?: string[];
    transaccion?: string[];
  };
  message?: string | null;
};

export type clienteState = {
  errors?: {
    nombre?: string[];
    email?: string[];
    telefono?: string[];
    ci?: string[];
  };
  message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    servicioId: formData.get('servicioId'),
    amount: formData.get('amount'),
    formaPagoId: formData.get('formaPagoId'),
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
  const { customerId, servicioId, amount, formaPagoId,transaccion} = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, date,tipo,transaccion,servicio)
      VALUES (${customerId}, ${amount},${date},${formaPagoId},${transaccion},${servicioId})
    `;
    await sql`
      UPDATE customers
      SET creditos = ${servicioId}
      WHERE id = ${customerId}
  `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice. ' + error,
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
    telefono: formData.get('telefono'),
    ci: formData.get('ci'),
  });

  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan llenar campos. Imposible crear cliente.',
    };
  }

  // Prepare data for insertion into the database
  const { nombre, email, telefono, ci} = validatedFields.data;
  const creditos = "0"; // Default value for creditos

  
  // Insert data into the database
  try {

    await sql`
      INSERT INTO customers (name, email, telefono,creditos,ci)
      VALUES (${nombre}, ${email}, ${telefono},${creditos}, ${ci})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Fallo en Crear cliente.' + error,
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

  const { customerId, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}
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
