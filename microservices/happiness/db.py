# -*- coding: utf8 -*-
import sqlite3
import config

def init():
    """
    Create DB and populate with table
    """


    conn = sqlite3.connect(config.DATABASE)

    # Events
    try:
        conn.execute("DROP TABLE happiness")
    except Exception:
        pass
    conn.execute(
        '''CREATE TABLE happiness (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, DATE TEXT NOT NULL,
            VALUE INTEGER NOT NULL
        )
        '''
    )
    print("happiness table created successfully")

    conn.close()

def save_or_update(c_date, c_value):
    print('save_or_update({},{})'.format(c_date, c_value))
    con = None
    try:
        with sqlite3.connect(config.DATABASE) as con:
            cur = con.cursor()
            # Fetch row for c_user_id
            cur.execute(
                "SELECT * FROM happiness WHERE date = ?", (c_date,)
            )
            data = cur.fetchone()
            if data == None:
                # User is not in the score table
                cur.execute(
                    "INSERT INTO happiness(DATE, VALUE) VALUES(?, ?)", (
                        c_date, c_value)
                )
                print("Record added")
            else:
                # Update with new values
                cur.execute(
                    "UPDATE happiness SET VALUE = ? WHERE DATE = ?", (
                        c_value, c_date)
                )
                print("Record updated")
    except Exception as ex:
        if con != None:
            con.rollback()
        print("error in insert operation", ex)
    finally:
        if con != None:
            con.close()


if __name__ == '__main__':
    init()
