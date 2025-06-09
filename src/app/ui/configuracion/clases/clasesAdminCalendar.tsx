'use client'

import * as React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


interface CalendarioProps {
  onDiaChange: (nuevoDia : Date) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>; // Server Action como prop
}


export default function Calendar({ onDiaChange }: CalendarioProps) {

  const [startDate, setStartDate] = useState(new Date());

 
  const handlePickDate = async (event:any) => {
    setStartDate(event);
    onDiaChange(event); // Invoca la Server Action con el nuevo día seleccionado
  }

    return (
          <div className="flex flex-row justify-between items-center">
            <div>
            <p className="text-base">Fecha</p>
            </div>
            <div>
            <DatePicker className="text-base mx-2 rounded-lg border border-solid border-[#01feab] text-center" selected={startDate} onChange={handlePickDate}
            />
            </div>
            <div>
              <p className="text-base">{(startDate.toLocaleDateString('es-ES', { weekday: 'long' }))}</p>
            </div>
          </div>
    )
}