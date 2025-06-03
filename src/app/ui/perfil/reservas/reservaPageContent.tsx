'use client';

import { useState, useEffect } from 'react';
import Calendario from '../../../ui/perfil/reservas/calendar';
import ReservaForm from '../../../ui/perfil/reservas/reservar-form';

interface ReservaPageContentProps {
  initialData:  Array<{ clase_id: string; nombre: string; dias: string[]; horas: string[] }>,
  onDiaChange: (dia : string) => Promise<{ clase_id: string, nombre: string, dias: string[], horas: string[] }[]>;
  diaInicial: string;
  customerId?: string;
}

export default function ReservaPageContent({ initialData, onDiaChange, diaInicial, customerId }: ReservaPageContentProps) {

  const [currentData, setCurrentClases] = useState(initialData);
  const [currentCustomerId, setCurrentCustomerId] = useState(customerId || '');
  const [selectedDayFromCalendar, setSelectedDayFromCalendar] = useState(diaInicial);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalendarDayChange = async (day: string) => {
    setSelectedDayFromCalendar(day);
    setIsLoading(true);
    const data = await onDiaChange(day); // Invoca la Server Action
    setIsLoading(false);
    return data
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Sistema de Reservas</h1>
      <Calendario
        onDiaChange={handleCalendarDayChange}
      />
      {isLoading ? (
        <p>Cargando clases y horas para {selectedDayFromCalendar}...</p>
      ) : (
        <ReservaForm
          initialData={currentData} customerId={currentCustomerId}/>
      )}
    </main>
  );
}