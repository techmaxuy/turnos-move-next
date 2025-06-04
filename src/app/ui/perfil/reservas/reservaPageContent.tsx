'use client';

import { useState } from 'react';
import Calendario from '../../../ui/perfil/reservas/calendar';
import ReservaForm from '../../../ui/perfil/reservas/reservar-form';

interface ReservaPageContentProps {
  initialData:  Array<{ clase_id: string; nombre: string; dias: string[]; horas: string[] }>,
  onDiaChange: (dia : string) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>;
  diaInicial: string;
  customerId?: string;
}

export default function ReservaPageContent({ initialData, onDiaChange, diaInicial, customerId }: ReservaPageContentProps) {

  const [currentData, setCurrentData] = useState(initialData);
  const [currentCustomerId, setCurrentCustomerId] = useState(customerId || '');
  const [selectedDayFromCalendar, setSelectedDayFromCalendar] = useState(diaInicial);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalendarDayChange = async (day: string) => {
    setSelectedDayFromCalendar(day);
    setIsLoading(true);
    const data = await onDiaChange(day); // Invoca la Server Action
    setIsLoading(false);
    setCurrentData(data);
    return data
  };

  console.log('ReservaPageContent - currentData:', currentData);

  return (
    <main className="flex min-h-100dvh flex-col items-center w-full">
      <h1>Sistema de Reservas</h1>
      <Calendario
        onDiaChange={handleCalendarDayChange}
      />
      {isLoading ? (
        <p className="text-xs">Cargando clases y horas para {selectedDayFromCalendar}...</p>
      ) : (
        <ReservaForm
          initialData={currentData} customerId={currentCustomerId}/>
      )}
    </main>
  );
}