'use client'

import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CalendarioProps {
  onDiaChange: (dia : string) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>; // Server Action como prop
}

export default function Calendar({ onDiaChange }: CalendarioProps) {

  const [startDate, setStartDate] = useState(new Date());

  const currentDate =startDate.toLocaleDateString();

    return (
        <div>
      <h4>Seleccionar una fecha</h4>
      <DatePicker selected={startDate} onChange=
              {(date) => date && setStartDate(date)} 
              />
               <div>
             <p>{currentDate}</p>
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
       
