import psycopg2
from pprint import pprint


def get_books():
    # Connect to your PostgreSQL database
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="haveagreattime",
        host="localhost",
        port="5432",
    )

    # Create a cursor object
    cur = conn.cursor()

    # Query to retrieve all data from the books table
    query = "SELECT * FROM books;"

    # Execute the query
    cur.execute(query)

    # Fetch all rows from the result set
    rows = cur.fetchall()

    # Close cursor and connection
    cur.close()
    conn.close()

    # Convert data to a list of dictionaries
    # books = []
    # for row in rows:
    #     book = {
    #         "id": row[0],
    #         "title": row[1],
    #         "author": row[2],
    #         "subject": row[3],
    #         "publish_date": str(row[4]),  # Convert DATE to string
    #     }
    #     books.append(book)

    # return books
    print(rows)


pprint(get_books())
