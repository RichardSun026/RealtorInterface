# Realtor Interface

This project includes a simple NestJS backend and a React frontend for realtors to submit their information and connect their Google Calendar. Submitted information is stored in Supabase.

The backend also exposes a `/userreport/:phone` endpoint that returns details from the `lead` table. Visiting this path in the frontend shows a report for the requested phone number.

## Directory Structure

```
backend/      # NestJS API
frontend/     # React application
  src/
    components/
    services/
    types/
    pages/
public/
database/    # SQL schema
```
