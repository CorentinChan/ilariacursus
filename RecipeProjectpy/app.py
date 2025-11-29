from  flask import Flask, render_template, request, jsonify, redirect, flash, url_for,  make_response
from jinja2 import Environment, FileSystemLoader
import requests
import pymysql
from pathlib import Path
import bcrypt

# Exemple équivalent à path.join(__dirname, 'static', 'js', 'app.js')
base_dir = Path(__file__).parent  # équivaut à __dirname en Node.js
file_path = base_dir / 'static' / 'js' / 'app.js'

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='recipeproject3',
    charset='utf8mb4',      # recommended
    cursorclass=pymysql.cursors.DictCursor  # return rows as dictionaries
)

env = Environment(loader=FileSystemLoader('templates'))

app = Flask(__name__)
#app = Flask(__name__, static_folder='assets', static_url_path='/templates')
app.secret_key = "ma_cle_ultra_secrete"

#
    #route
@app.route('/')
@app.route('/home.html')
def home():
    pseudo = request.cookies.get('user') 
    try:
        with connection.cursor() as cursor:
           
            # Insert a row
            cursor.execute("SELECT * FROM  recipe limit 6", )
            results = cursor.fetchall()
            for result in results:
                print(result)
    except: 
        print('error')
    return render_template('search.html', message="",user=pseudo,recipes=results)
           

@app.route('/login.html')
def login():
    return render_template('login.html', message=" ")

@app.route('/recipe.html')
def recipe():
    return render_template('recipe.html',  message="")



@app.route('/search.html')
def search():
    pseudo = request.cookies.get('user') 
    try:
        with connection.cursor() as cursor:      
            # Insert a row
            cursor.execute("SELECT * FROM  recipe  ORDER BY title ASC limit 6", )
            results = cursor.fetchall()
            for result in results:
                print(result)
    except: 
        print('error')
    return render_template('search.html', user=pseudo, message="",recipes=results)
           


@app.route('/contact.html')
def contact():
    return render_template('contact.html',name='bobby')

@app.route('/searchRecipes', methods=["POST"])
def searchRecipes():
    searchKey=request.form.get('textSearch')
    try:
        with connection.cursor() as cursor:
            # Insert a row
            cursor.execute("SELECT * FROM recipe WHERE title LIKE %s", ("%" + searchKey + "%",))
            results = cursor.fetchall()
            print(results)
    except: 
        print('error')
    return render_template('search.html', message="",recipes=results)


@app.route('/signin', methods=["POST"])
def signin():
    mail  = request.form.get('mail')
    password= request.form.get('password')
    print(f"mail : {mail}, password : {password}")

    try:
        with connection.cursor() as cursor:
           
            # Insert a row
            cursor.execute("SELECT mdp,pseudo FROM  users where mail = ( %s)", mail)
            result = cursor.fetchone()
            mdpBDD=result['mdp']
            
            '''         
            resp = make_response("Cookie créé ! 🍪")
            resp.set_cookie('user', result['pseudo'], max_age=60*60*24)  # 1 jour
            '''
            print(result)
    except: 
        print('error')

        
    if bcrypt.checkpw(password.encode('utf-8'), mdpBDD.encode('utf-8')):
        flash(f"Connexion réussie ✅ bonjour {result ['pseudo']}")
        resp = redirect('/')  # redirection après connexion
        resp.set_cookie('user', result ['pseudo'], max_age=3600)  # cookie valable 1h 
        return resp 

    else:
        if(result == None):
            flash("mail don't exist ❌")
        else:
            flash("password incorrect ❌")
        return redirect(url_for('login'))
    
@app.route('/logout', methods=["POST"])
def signout():
    resp = redirect('/')
    resp.set_cookie('user', '', max_age=0)
    return resp


    

    
app.run(debug=True)
    



