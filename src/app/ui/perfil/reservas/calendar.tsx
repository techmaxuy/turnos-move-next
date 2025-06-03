'use client'

import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { start } from 'repl';

interface CalendarioProps {
  onDiaChange: (dia : string) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>; // Server Action como prop
}


export default function Calendar({ onDiaChange }: CalendarioProps) {

  const [startDate, setStartDate] = useState(new Date());

 
  const handlePickDate = async (event:any) => {
    setStartDate(event);
    onDiaChange((event.toLocaleDateString('es-ES', { weekday: 'long' })).toLowerCase())
  }

    return (
        <div>
      <h4>Seleccionar una fecha</h4>
      <DatePicker selected={startDate} onChange={handlePickDate}
              />
               <div>
             <p>{(startDate.toLocaleDateString('es-ES', { weekday: 'long' })).toLocaleLowerCase()}</p>
        </div>
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
*/
       
