'use client'

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function Calendar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

    const today = new Date();
  const currentDate = today.toLocaleDateString();


    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(`Searching... ${term}`);
        
        const params = new URLSearchParams(searchParams);
        
    
        if (term) {
          params.set('query', term);
          params.set('message', "Probando reserva")
        } else {
          params.delete('query');
          params.delete('message');
        }
        replace(`${pathname}?${params.toString()}`);
      }, 3000);
    

    return (
        <div>
            <input 
            type="date"
            onChange={(e) => {
          handleSearch(e.target.value);
        }}
             />
             <p>{searchParams.get('query')?.toString() || currentDate}</p>
        </div>
    )
}