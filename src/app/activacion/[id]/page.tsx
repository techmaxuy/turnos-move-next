export default  async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main className="mx-4 mb-4">
      <div className="rounded-lg bg-[#212121] p-2 md:pt-0">
        <h1>Activar cuenta</h1>
        <p>El ID de activación es: {id}</p>
      </div>
    </main>
  );
}   