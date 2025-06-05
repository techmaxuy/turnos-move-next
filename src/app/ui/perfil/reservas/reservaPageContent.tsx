'use client';

import { useState } from 'react';
import Calendario from '../../../ui/perfil/reservas/calendar';
import ReservaForm from '../../../ui/perfil/reservas/reservar-form';

interface ReservaPageContentProps {
  initialData:  Array<{ clase_id: string; nombre: string; dias: string[]; horas: string[] }>,
  //onDiaChange: (dia : string) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>;
  onDiaChange: (nuevoDia : Date) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>;
  //diaInicial: string;
  fechaInicial: Date;
  customerId?: string;
}

export default function ReservaPageContent({ initialData, onDiaChange, fechaInicial, customerId }: ReservaPageContentProps) {

  const [currentData, setCurrentData] = useState(initialData);
  const [currentCustomerId, setCurrentCustomerId] = useState(customerId || '');
  const [selectedDayFromCalendar, setSelectedDayFromCalendar] = useState(fechaInicial);
  const [isLoading, setIsLoading] = useState(false);


   const handleCalendarDayChange = async (nuevoDia: Date) => {
    setSelectedDayFromCalendar(nuevoDia);
    setIsLoading(true);
    const data = await onDiaChange(nuevoDia); // Invoca la Server Action
    setIsLoading(false);
    setCurrentData(data);
    return data
  };

  return (
    <main className="flex min-h-100dvh flex-col items-center w-full">
      <h1>Sistema de Reservas</h1>
      <Calendario
        onDiaChange={handleCalendarDayChange}
      />
      {isLoading ? (
        <p className="text-xs">Cargando clases y horas para {selectedDayFromCalendar.toLocaleDateString('es-ES', { weekday: 'long' })}...</p>
      ) : (
        <ReservaForm
          initialData={currentData} customerId={currentCustomerId} diaSeleccionado={selectedDayFromCalendar}/>
      )}
    </main>
  );
}