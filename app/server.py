from flask import Flask, jsonify, abort
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / 'leads.db'

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    if DB_PATH.exists():
        return
    conn = get_db_connection()
    conn.executescript(
        """
        CREATE TABLE leads (
            phone TEXT PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            zipcode TEXT,
            address TEXT,
            quiz_summary TEXT,
            sms_summary TEXT
        );
        INSERT INTO leads (phone, first_name, last_name, zipcode, address, quiz_summary, sms_summary)
        VALUES
            ('1234567890', 'John', 'Doe', '90210', '123 Main St', 'Quiz summary example.', 'SMS summary example.');
        """
    )
    conn.commit()
    conn.close()


@app.route('/<phone>')
def show_lead(phone: str):
    conn = get_db_connection()
    lead = conn.execute('SELECT * FROM leads WHERE phone = ?', (phone,)).fetchone()
    conn.close()

    if lead is None:
        abort(404, description='Lead not found')

    return jsonify({
        'first_name': lead['first_name'],
        'last_name': lead['last_name'],
        'phone': lead['phone'],
        'zipcode': lead['zipcode'],
        'address': lead['address'],
        'quiz_summary': lead['quiz_summary'],
        'sms_summary': lead['sms_summary'],
    })


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
