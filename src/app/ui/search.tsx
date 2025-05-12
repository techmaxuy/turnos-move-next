'use client';


import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import * as React from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();


  React.useEffect(() => {
    // window is accessible here.
     //alert(window.innerHeight + " " + window.innerWidth); 
  }, []);

  let message=""

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    function isValidCI(ci: string) {
      const ciRegex= new RegExp("\\b\\d{8}\\b");
      return ciRegex.test(ci);
    }

    const params = new URLSearchParams(searchParams);
    

    if (term) {
      params.set('query', term);
      isValidCI(term) ? params.set('message', "") : params.set('message', "CI Invalido");
    } else {
      params.delete('query');
      params.delete('message');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);




  return (
    <div className="relative flex flex-col flex-1 flex-shrink-0">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-white"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        type="number"
      />
      <div className="text-red-500 pt-2">
        {searchParams.get('message')?.toString()}
      </div>
    </div>
  );
}