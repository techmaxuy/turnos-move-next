export default function NoAutenticado() {   
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">No Autenticado</h1>
      <p className="mt-4">Por favor, inicia sesión para acceder a esta página.</p>
      <a className="rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40"
            href="/login"
            rel="noopener noreferrer">
            Iniciar Sesion
      </a>
    </div>
  );
}
