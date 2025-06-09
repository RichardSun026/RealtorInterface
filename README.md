# RealtorInterface
## Lead Lookup Server

This repository includes a simple Flask application that exposes lead data via
`/<phone>` on `localhost:5000`. The information is stored in a small SQLite
database and seeded with sample data the first time the server runs.

### Running the server

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the application:
   ```bash
   python app/server.py
   ```

3. Navigate to `http://localhost:5000/1234567890` in your browser. You should
   see the JSON representation of the sample lead.

Modify `app/server.py` to adapt the database schema or pre‑seeded values as
needed.
