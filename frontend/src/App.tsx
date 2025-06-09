import React, { useState } from 'react';
import { RealtorForm } from './components/RealtorForm';
import { CalendarConnect } from './components/CalendarConnect';
import { api } from './services/api';
import { RealtorData, RealtorResponse } from './types';

function App() {
  const [step, setStep] = useState<'form' | 'calendar'>('form');
  const [loading, setLoading] = useState(false);
  const [realtor, setRealtor] = useState<RealtorResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (data: RealtorData) => {
    try {
      setLoading(true);
      const res = await api.createRealtor(data);
      setRealtor(res);
      setStep('calendar');
    } catch (e) {
      setError('Failed to create realtor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {step === 'form' && <RealtorForm onSubmit={handleSubmit} isLoading={loading} />}
      {step === 'calendar' && realtor && (
        <CalendarConnect realtorId={realtor.realtor_id} realtorName={`${realtor.f_name} ${realtor.e_name}`} />
      )}
    </div>
  );
}

export default App;
