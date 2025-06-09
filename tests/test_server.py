import os
import sys
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app.server import app, init_db, DB_PATH

@pytest.fixture(autouse=True)
def setup(tmp_path, monkeypatch):
    # Use a temporary database for testing
    test_db = tmp_path / 'test.db'
    monkeypatch.setattr('app.server.DB_PATH', test_db)
    init_db()
    yield


def test_show_lead():
    app.config['TESTING'] = True
    with app.test_client() as client:
        rv = client.get('/1234567890')
        assert rv.status_code == 200
        data = rv.get_json()
        assert data['first_name'] == 'John'
        assert data['phone'] == '1234567890'
