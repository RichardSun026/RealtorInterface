import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Props {
  realtorId: number;
  realtorName: string;
}

export const CalendarConnect: React.FC<Props> = ({ realtorId, realtorName }) => {
  const [authUrl, setAuthUrl] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await api.getCalendarAuthUrl(realtorId);
        setAuthUrl(res.url);
      } catch (err) {
        setError('Failed to generate link');
      }
    };
    fetchUrl();
  }, [realtorId]);

  if (error) return <p>{error}</p>;
  return (
    <div>
      <h2>Welcome, {realtorName}</h2>
      <p>Connect your Google Calendar:</p>
      {authUrl ? (
        <a href={authUrl} target="_blank" rel="noopener noreferrer">Connect Calendar</a>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
