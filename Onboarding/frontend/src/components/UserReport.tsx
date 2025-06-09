import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Props {
  phone: string;
}

export const UserReport: React.FC<Props> = ({ phone }) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getLead(phone)
      .then(setData)
      .catch(() => setError('Failed to load user'))
      .finally(() => setLoading(false));
  }, [phone]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No user found.</p>;

  return (
    <div>
      <h1>
        {data.f_name} {data.l_name}
      </h1>
      <p>Phone: {data.phone}</p>
      <p>Zipcode: {data.zipcode}</p>
      <p>Address: {data.address}</p>
      {data.quiz_summary && <p>Quiz Summary: {data.quiz_summary}</p>}
      {data.sms_summary && <p>SMS Summary: {data.sms_summary}</p>}
    </div>
  );
};
