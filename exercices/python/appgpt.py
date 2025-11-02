from  flask import Flask, render_template, request, jsonify
from jinja2 import Environment, FileSystemLoader
import requests

env = Environment(loader=FileSystemLoader('templates'))

app = Flask(__name__)

    #route
@app.route('/')
def home():
    return render_template('index.html', message="Bienvenue sur Flask 🎉")


@app.route('/contact')
def contact():
    return render_template('contact.html',name='bobby')


       #API 
if __name__ == '__main__':
    url = "https://jsonplaceholder.typicode.com/todos/1"
    response = requests.get(url)

    print("Status code :", response.status_code)  # 200 = OK
    print("Contenu :", response.text)             # Contenu brut
    print("JSON :", response.json())   
    
    app.run(debug=True)




