from ..config.database import connect

def _get_users():
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM users")
    return cursor.fetchall()