'use client'

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [startDate, setStartDate] = useState(new Date());

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
      <h4>Seleccionar una fecha</h4>
      <DatePicker selected={startDate} onChange=
              {(date) => date && setStartDate(date)} 
              
              />
    </div>
    )
}

/*
<div>
            <input 
            type="date"
            onChange={(e) => {
          handleSearch(e.target.value);
        }}
        value={clsx( searchParams.get('query')
          ? searchParams.get('query')?.toString()
          : currentDate.toString()
        )}
             />
             <p>{searchParams.get('query')?.toString() || currentDate }</p>
        </div>
*/