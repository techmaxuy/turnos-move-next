'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { NODE_BASE_ESM_RESOLVE_OPTIONS } from 'next/dist/build/webpack-config';
import { Resend } from "resend";
import Form from '../ui/perfil/editarPerfil';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const resend = new Resend(process.env.RESEND_API_KEY);


export async  function SendEmail($email: string , $subject: string , $message: string ) {
  try {
    
    const emailObject = await resend.emails.send({
        from: 'turnosmove@portal21.work',
        to: $email,
        subject: $subject,
        html: `<p>${$message}</p>`,
      });
  }
  catch (error) {  
    return {
      message: 'Error al enviar el correo: ' + error, 
    };
  } 

    return {
      message: 'Correo enviado con exito.',
    };
}

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


const FormSchemaReserva = z.object({
  id: z.string(),
  clase: z.string({
    invalid_type_error: 'Por favor ingresa una clase.',
  }),
  hora: z.string({
    invalid_type_error: 'Por favor ingresa una hora.',
  }),
  utilizada: z.string(),
  create_date: z.string(),
  customerId: z.string(), 
});

const FormSchemaClase = z.object({
  id: z.string(),
  clase: z.string().min(1, {
    message: 'Por favor ingresa un nombre para la clase.',
  }),
  dias: z.array(z.string()).min(1, {
    message: 'Por favor selecciona al menos un dia.',
  }),
  horas: z.array(z.string()).min(1, {
    message: 'Por favor selecciona al menos una hora.',
    
  }),
});


const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });
const CreateCliente = FormSchemaCliente.omit({ id: true, creditos: true });
const EditarCliente = FormSchemaCliente.omit({ id: true, creditos: true });
const CreateReserva = FormSchemaReserva.omit({ id: true, utilizada: true, create_date: true });
const CrearClase = FormSchemaClase.omit({ id: true});

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

export type claseState = {
  errors?: {
    clase?: string[];
    //dias?: string[];
    //horas?: string[];
  };
  message?: string | null;
};

export type reservaState = {
  errors?: {
    clase?: string[];
    hora?: string[];
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

export async function createReservaV2(prevState: reservaState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateReserva.safeParse({
    clase: formData.get('clase'),
    hora: formData.get('hora'),
  });


  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan llenar campos. Imposible cargar reserva.',
    };
  }

  // Prepare data for insertion into the database
  const { clase , hora} = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];
  const utilizada = "false"; // Default value for utilizada

  // Insert data into the database
  try {
    await sql`
      INSERT INTO reservas (clase_id, hora, utilizada, create_date)
      VALUES (${clase}, ${hora}, ${utilizada}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Reserva. ' + error,
    };
  }

}


export async function createReserva(prevState: reservaState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateReserva.safeParse({
    clase: formData.get('clase'),
    hora: formData.get('hora'),
    customerId: formData.get('customerId'),
  });


  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan llenar campos. Imposible cargar reserva.',
    };
  }

  // Prepare data for insertion into the database
  const { clase , hora, customerId} = validatedFields.data;

  const date = new Date().toLocaleDateString();
  const utilizada = "false"; // Default value for utilizada

  // Insert data into the database
  try {
    await sql`
      INSERT INTO reservas (clase_id, hora, utilizada, create_date, customerid)
      VALUES (${clase}, ${hora}, ${utilizada}, ${date}, ${customerId})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Reserva. ' + error,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/perfil/misreservas');
  redirect('/perfil/misreservas');
}



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

export async function crearClase(prevState: claseState | undefined, formData: FormData) {

  console.log(formData);
  
  // Validate form fields using Zod
  const validatedFields = CrearClase.safeParse({
    clase: formData.get('clase'),
    dias: formData.getAll('dias') as string[],
    horas: formData.getAll('horas') as string[],
  });


  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan llenar campos. Imposible crear clase.',
    };
  }

  // Prepare data for insertion into the database
 const { clase, dias, horas} = validatedFields.data;
console.log(clase, dias, horas);



  // Insert data into the database
  try {
    await sql`
      INSERT INTO clases (nombre)
      VALUES (${clase})
    `;
    /*
    await sql`
      UPDATE customers
      SET creditos = ${servicioId}
      WHERE id = ${customerId}
  `;
  */
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Clase. ' + error,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/configuracion');
  redirect('/configuracion');
  
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

export async function editarCliente(
  id: string,
  prevState: clienteState,
  formData: FormData,
) {
  const validatedFields = EditarCliente.safeParse({
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    telefono: formData.get('telefono'),
    ci: formData.get('ci'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos no llenados. Imposible editar cliente.',
    };
  }

  const { nombre, email, telefono, ci } = validatedFields.data;
  
  try {
    await sql`
      UPDATE customers
      SET name = ${nombre}, email=${email}, telefono=${telefono}, ci=${ci}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Cliente.' };
  }

  revalidatePath('/configuracion/clientes');
  redirect('/configuracion/clientes');
}

export async function editarPerfil(
  id: string,
  prevState: clienteState,
  formData: FormData,
) {
  const validatedFields = EditarCliente.safeParse({
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    telefono: formData.get('telefono'),
    ci: formData.get('ci'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos no llenados. Imposible editar cliente.',
    };
  }

  const { nombre, email, telefono, ci } = validatedFields.data;
  
  try {
    await sql`
      UPDATE customers
      SET name = ${nombre}, email=${email}, telefono=${telefono}, ci=${ci}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Cliente.' };
  }

  revalidatePath('/perfil');
  redirect('/perfil');
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
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.name) {
        case 'CredentialsSignin':
          return 'Invalid credentials.' + error.message;
        default:
          return 'Something went wrong.' + error.message;
      }
    }
    throw error;
  }
}

const RegisterSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Por favor ingresa un nombre.',
  }),
  email: z.string().email(),
  password: z.string().min(6,{'message': 'La contraseña debe tener al menos 6 caracteres.'}), 
  password2: z.string().min(6,{'message': 'La contraseña debe tener al menos 6 caracteres.'}),
}).refine((data) => data.password === data.password2, {
  message: 'Las contraseñas no coinciden.',
  path: ['password2'],
});

export type registerState = {
  nombre?: string;
  email?: string;
  password?: string;
  password2?: string;

  errors?: {
    nombre?: string[];
    email?: string[];
    password?: string[];
    password2?: string[];
  };
  message?: string | null;
};


export async function signup(prevState: registerState | undefined,
  formData: FormData): Promise<registerState> {


  const validatedFields = RegisterSchema.safeParse({
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    password: formData.get('password'),
    password2: formData.get('password2'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos no llenados. Imposible crear usuario.' + validatedFields.error.message,
    };

  }
  const { nombre,email, password } = validatedFields.data;

  // Check if the email already exists in the database
  const existingUser = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existingUser.length > 0) {
    return { message: 'El correo electrónico ya está registrado.' };
  }
         
  const hashedPassword = await bcrypt.hash(password, 10);
  const creditos = "5"; // Default value for creditos
  const telefono = "090000000"; // Default value for telefono
  const ci = "30000000"; // Default value for ci

  try { 
    await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${nombre},${email}, ${hashedPassword})
    `;
     await sql`
      INSERT INTO customers (name, email, telefono, creditos, ci)
      VALUES (${nombre}, ${email}, ${telefono}, ${creditos}, ${ci})
    `;

  } catch (error) {
    return { message: 'Database Error: Failed to Create User.' + error };   
  }

  SendEmail(email, 'Bienvenido a TurnosMove', 'Gracias por registrarte en TurnosMove. Tu cuenta ha sido creada con exito.');

  revalidatePath('/login');
  redirect('/login');
} 


