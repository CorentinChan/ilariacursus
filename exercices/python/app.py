from flask import Flask  # Flask vient du module Flask installé via pip
import pymysql

app = Flask(__name__)


# Connect to the database
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='ilariacursus',
    charset='utf8mb4',      # recommended
    cursorclass=pymysql.cursors.DictCursor  # return rows as dictionaries
)



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    print("test")
    try:
        with connection.cursor() as cursor:
            

            # Insert a row
            cursor.execute("INSERT INTO medecin (nom,prenom) VALUES (%s, %s)", ('Denis','Alice'))

            # Commit changes
            connection.commit()

            # Query the table
            cursor.execute("SELECT * FROM medecin")
            result = cursor.fetchall()
            print(result)
    except: 
        print('error')
    finally:
        connection.close()   
    app.run(debug=True)



