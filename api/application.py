import certifi
import sys
import os
import json
import time
import config as Config
from flask import Flask
from pprint import pprint
from flask import Flask, request, render_template, g, redirect, Response, make_response, jsonify, url_for, session
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash

application = Flask(__name__)  
app = application
#mysql = MySQL()


# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'govol'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql = MySQL(app)
'''mysql.init_app(app)'''
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
@app.route('/')
@app.route('/index')
def index():
    if 'username' in session:
        return 'Logged in as %s' % escape(session['username'])
    return render_template('index.html')

@app.route('/api/setSession/<vari>', methods=['POST'])
def setSession(vari):
    session['username']=vari;
    return json.dumps({'message':'Session variable has been set!'})

@app.route('/api/getSession', methods=['GET'])
def getSession():
    return json.dumps(session['username'])

@app.route('/api/authz/signup/', methods=['POST'])
def signup():
    try:
        if not request.json or not 'EmailId' in request.json:
               return json.dumps({'message':'Error'})
        content = request.get_json(silent=True)
        _hashed_password = generate_password_hash(content['password'])
        conn=mysql.connect()
        dbcursor = conn.cursor();
        dbcursor.callproc('sp_createUser',(content['username'],content['EmailId'],_hashed_password))
        data = dbcursor.fetchall()
        if len(data) is 0:
            conn.commit()
            session['username']=content['username'];
            return jsonif (content)
        else:
            return json.dumps({'message':str(data[0])})
    except Exception as e:
        return json.dumps({'message':'Error2'})

@app.route('/api/authz/signin/', methods=['POST'])
def signin():
    if not request.json or not 'EmailId' in request.json:
        return json.dumps({'message':'Error'})
    content = request.get_json(silent=True)
    conn=mysql.connect()
    dbcursor = conn.cursor();
    dbcursor.callproc('sp_loginUser',(content['EmailId'],0))
    #data = dbcursor.fetchone()
    dbcursor.execute('SELECT @_sp_loginUser_1') 

    result = dbcursor.fetchone()
    if check_password_hash(result[0], content['password']):
        session['username']=result[1];
        conn.commit()
        content['password']=null;
        return jsonify(content)
    else:
        return json.dumps({'message':'Could not log in!!'})

@app.route('/api/authz/logout', methods=['POST'])
def logout():
    if 'username' not in session:
        return json.dumps({'message':'User not logged in!!'})
    else:
        session.pop('username', None)
        return json.dumps({'message':'Could not log in!!'})

@app.route('/api/metadata', methods=['GET'])
def getmetadata():
    try:
        content = request.get_json(silent=True)
        conn=mysql.connect()
        dbcursor = conn.cursor();
        dbcursor.callproc('sp_getMetadata')
        data = dbcursor.fetchall()
        dbcursor.execute('SELECT @_sp_getMetadata_1') 
        return jsonify(data), 201
    except Exception as e:
        pass

@app.route('/api/search', methods=['GET'])
def searchbyfilter():
    try:
        category=request.args.get('category');
        location=request.args.get('location');
        lookingfor=request.args.get('lookingfor');
        searchword=request.args.get('searchword');
        return jsonify({'task': category}), 201
    except Exception as e:
        pass
'''
@app.route('/api/search/<keyword>', methods=['GET'])
def searchByCategory(keyword):

    try:
        if not request.json or not 'title' in request.json:
            abort(400)
        content = request.get_json(silent=True)
        conn=mysql.connect()
        dbcursor = conn.cursor();
        dbcursor.callproc('sp_getEventsByCategory',(keyword,0))
        return jsonify({'task': task}), 201
    except Exception as e:
        pass'''
"""
@app.route('/api/authz/init', methods=['GET'])
def initialize():

    try:
        if not request.json or not 'title' in request.json:
        abort(400)
        return jsonify({'task': task}), 201
    except Exception as e:
        pass

@app.route('/api/authz/logout', methods=['GET'])
def logout():

    try:
        if not request.json or not 'title' in request.json:
        abort(400)
        return jsonify({'task': task}), 201
    except Exception as e:
        pass

@app.route('/api/authz/logout', methods=['GET'])
def signup():

    try:
        if not request.json or not 'title' in request.json:
        abort(400)
        return jsonify({'task': task}), 201
    except Exception as e:
        pass
"""
if __name__ == "__main__":         
        app.run(debug=True)