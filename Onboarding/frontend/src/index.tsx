import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserReport } from './components/UserReport';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const path = window.location.pathname;

if (path.startsWith('/userreport/')) {
  const phone = path.replace('/userreport/', '');
  root.render(
    <React.StrictMode>
      <UserReport phone={phone} />
    </React.StrictMode>,
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
