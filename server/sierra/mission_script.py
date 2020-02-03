import datetime
import sqlite3
from sqlite3 import Error
import re
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
        return conn
    except Error as e:
        print(e)

    return None

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def getCallNumber(bookId):
    database = "/home/pi/OodiUI_react/server/sierra/mir.db"
    # create a database connection
    conn = create_connection(database)
    conn.row_factory = dict_factory
    
    cur = conn.cursor()

    query = "SELECT DISTINCT call_number_norm FROM books WHERE bib_view_record_num == " + bookId

    # .load /usr/lib/sqlite3/pcre.so
    # select distinct call_number_norm from books where call_number_norm REGEXP '^[0-9]+' order by call_number_norm asc;

    cur.execute(query)

    rows = cur.fetchall()

    for row in rows:
        callNumber = row['call_number_norm']

    return callNumber

def insert_into_mission_table(callnumber = '', target_id = '', location_id = ''):
    database = "/home/pi/OodiUI_react/server/sierra/mir.db"
    # create a database connection
    conn = create_connection(database)
    cur = conn.cursor()

    # we strip out the alphabets here from the callnumber, prolly doesn't work too well for guiding
    #stripalpha  = re.compile(r'[^\d.]+')
    #cnumber = stripalpha.sub('', callnumber)
    cnumber = callnumber
    status = 'new'

   # todo how do we do this when it is a category?
    sql = "INSERT INTO missions (callnumber, status, starttime, bip_view_record_num, location) VALUES (?, ?, DateTime('now'), ?, ?)"
    cur.execute(sql, (cnumber, status, target_id, location_id))
    conn.commit()

def main():
    target_type = sys.argv[2]
    target_id = sys.argv[1]

    if target_type == 'book':
        insert_into_mission_table('', target_id, '')

    if target_type == 'category':
        insert_into_mission_table(target_id, '', '')

    if target_type == 'location':
        insert_into_mission_table('', '', target_id)

if __name__ == "__main__":
   main()
