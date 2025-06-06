import clsx from 'clsx';
import { fetchFilteredCustomers } from '@/app/lib/data';
import  ReservaForm  from '@/app/ui/portalingreso/form-status'


export default async function CustomerTable({
  query
}: {
  query: string;
}) {

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 min-h-120">
          <div className="flex flex-col justify-between py-2 text-center text-sm font-medium text-black bg-[#212121] rounded-lg min-h-100 place-items-center">
            {customers?.map((customer) => (
            
                <div key={customer.id} className={clsx("py-10 my-5 text-white",{"hidden" : !(customer.name)})}>
                    <div className="text-2xl">Bienvenido !! </div>
                    <div className="text-4xl ">{customer.name}</div>
                    <div className="border border-white rounded-lg p-4 mt-4 text-lg">
                      <div className="py-2">Creditos disponibles:   <strong>{customer.creditos}</strong></div>
                    </div> 
                    <ReservaForm creditos={Number(customer.creditos)}/>                
                </div>
              
            ))}
              <div className={clsx("py-10 my-5 mx-5 text-white place-items-center",{"hidden" : customers.length > 0})}>
                <div className="text-2xl">Bienvenido !! </div>
                <div className="text-4xl ">Si no te registraste, ingresa tu cedula</div>
                <div className="text-4xl ">y arranca a Moverte!!!</div>               
              </div>  
          </div>
    </div>
  );
}