import datetime
import sqlite3
from sqlite3 import Error
import json
import sys

def create_connection(db_file):
    """ create a database connection to the SQLite database
    specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """

    try:
        conn = sqlite3.connect(db_file)
        conn.text_factory = str
        return conn
    except Error as e:
        print(e)

    return None

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def main():
    searchtext = sys.argv[1]
    database = "/home/pi/OodiUI_react/server/sierra/mir.db"
    # create a database connection
    conn = create_connection(database)
    conn.row_factory = dict_factory
    
    searchtext = searchtext.lower()

    cur = conn.cursor()

    cur.execute("SELECT DISTINCT best_title, best_author, bib_view_record_num FROM books WHERE (lower(best_title) LIKE ? OR lower(best_author) LIKE ?) AND (item_status_code == '-' AND due_gmt == '') LIMIT 300", ('%'+searchtext+'%','%'+searchtext+'%',))

    rows = cur.fetchall()

    counter = 0
    retdict = []

    for value in rows:
        bibid = value['bib_view_record_num']
        title = value['best_title']
        author = value['best_author']
        retdict.append({'title' : title, 'author' : author, 'bibid' : bibid })

    print json.dumps(retdict)

if __name__ == "__main__":
   main()
