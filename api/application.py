import certifi
import sys
import os
import json
import time
from numbers import Number
import config as Config
from flask import Flask
from pprint import pprint
from flask import Flask, request, render_template, g, redirect, Response, make_response, jsonify, url_for, session
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin

application = Flask(__name__)  
app = application
CORS(app,supports_credentials = True)
#mysql = MySQL()

s3 = boto3.client('s3')

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'govol'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql = MySQL(app)
'''mysql.init_app(app)'''
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/api/getSession', methods=['GET'])
def getSession():
    if 'uid' not in session:
        return json.dumps({'error':'SESSION_DOES_NOT_EXIST'})
    conn=mysql.connect()
    dbcursor = conn.cursor()
    dbcursor.callproc('sp_getUser',(session['uid'],))
    result = dbcursor.fetchall()
    newuser=modelusersignin(result)
    return json.dumps(newuser)

@app.route('/api/authz/logout', methods=['POST'])
def logout():
    if 'uid' not in session:
        return json.dumps({'message':'User not logged in!!'})
    else:
        session.pop('uid', None)
        return json.dumps({'message':'User has been logged out'})

@app.route('/api/authz/signup', methods=['POST'])
def signup():
    try:
        if not request.json or not 'email' in request.json:
               return json.dumps({'message':'Error'})
        content = request.get_json(silent=True)
        _hashed_password = generate_password_hash(content['password'])
        conn=mysql.connect()
        dbcursor = conn.cursor()
        dbcursor.callproc('sp_createUser',(content['name'],content['email'],_hashed_password,content['type']))
        
        user_id = dbcursor.fetchall()
        if not isinstance(user_id[0][0],Number):
            return json.dumps({'error':'USERNAME_TAKEN'})
        if  user_id[0][0] is not 0:
            conn.commit()
            content['uid']=user_id[0][0]
            session['uid']=user_id[0][0]
            content['password']=''
            return json.dumps(content)
        else:
            return json.dumps({'error':str(user_id[0])})
    except Exception as e:
        return json.dumps({'error':'Error1'+str(e)})

@app.route('/api/authz/signin', methods=['POST'])
def signin():
    try:
        if not request.json or not 'email' in request.json and not 'password' in request.json:
            return json.dumps({'message':'Bad Input'})
        content = request.get_json(silent=True)
        conn=mysql.connect()
        dbcursor = conn.cursor();
        #return json.dumps(content['email'])
        dbcursor.callproc('sp_loginUser',(str(content['email']),))
        result = dbcursor.fetchall()
        if len(result) is 0:
          return json.dumps({'error':'USER_DOES_NOT_EXIST'})
        if check_password_hash(result[0][3], content['password']):
            conn.commit()
            newuser=modelusersignin(result)
            session['uid']=newuser['uid']
            return json.dumps(newuser)
        else:
            return json.dumps({'message':'Could not log in!!'+str(result[1])})
    except Exception as e:
        return json.dumps({'error1':str(e)})

@app.route('/api/password', methods=['POST'])
def updatepassword():
    try:
        if not request.json or not 'oldpassword' in request.json and not 'newpassword' in request.json:
            return json.dumps({'message':'Error'})
        content = request.get_json(silent=True)
        conn=mysql.connect()
        dbcursor = conn.cursor();
        dbcursor.callproc('sp_getPassword',(1,0,0))
        dbcursor.execute('SELECT @_sp_getPassword_1,@_sp_getPassword_2') 
        result = dbcursor.fetchone() 
        #return json.dumps({'message':result})
        if check_password_hash(result[0], content['oldpassword']):
            pass
        else:
            return json.dumps({'Error':'PASSWORD_INCORRECT'})
        _hashed_password = generate_password_hash(str(content['newpassword']))
        dbcursor.callproc('sp_updatePassword',(1,_hashed_password))
        data = dbcursor.fetchall()
        if len(data) is 0:
            conn.commit()
            return json.dumps({'message':'Password updated successfully!'})
        else:
            return json.dumps({'message':str(data[0])})
    except Exceptions as e:
        return json.dumps({'message':'Error'})

@app.route('/api/userdetails', methods=['POST'])
def updateuserdetails():
    try:
        if not request.json or not 'desc' in request.json and not 'locationId' in request.json:
            return json.dumps({'message':'Error'})
        content = request.get_json(silent=True)
        conn=mysql.connect()
        dbcursor = conn.cursor();
        dbcursor.callproc('sp_updateUserDetails',(1,content['desc'],str(content['locationId'])))
        data = dbcursor.fetchall()
        if len(data) is 0:
            conn.commit()
            return json.dumps({'message':'User details updated successfully!'})
        else:
            return json.dumps({'message':str(data[0])})
    except Exceptions as e:
        return json.dumps({'message':'Error'})

@app.route('/api/metadata', methods=['GET'])
def metadata():

   try:
       content = request.get_json(silent=True)
       conn=mysql.connect()
       dbcursor = conn.cursor();
       dbcursor.callproc('sp_getCityMetadata')
       #data = dbcursor.fetchone()
       data = dbcursor.fetchall()
       items_list1=[]
       for item in data:
                i = {
                    'locationId':item[0],
                    'locationName':item[1]
                }
                items_list1.append(i)
       #dbcursor.execute('SELECT @_sp_getMetadata_1')
       dbcursor.callproc('sp_getCategoriesMetadata')
       data = dbcursor.fetchall()
       items_list2=[]
       for item in data:
                i = {
                    'categoryId':item[0],
                    'categoryName':item[1]
                }
                items_list2.append(i)
       return json.dumps({'locations':items_list1,'categories':items_list2})
   except Exception as e:
       return json.dumps({'message':'Error'})


@app.route('/api/search', methods=['GET'])
def searchbyfilter():
   try:
       category=request.args.get('category');
       location=request.args.get('location');
       user_type=request.args.get('lookingfor');
       searchword=request.args.get('searchword');

       if location!=None and user_type!=None:
            
            return json.dumps({'message':'Error1'})
       else:
            return json.dumps({'message':'Error2'})

       return jsonify({'task': category}), 201
   except Exception as e:
       return json.dumps({'message':'Error'})


@app.route('/api/userpost', methods=['POST'])
def userpost():
   try:
    if not request.json or not 'userId' in request.json:
        return json.dumps({'message':'Error'})
    content=request.get_json(silent=True);
    #return json.dumps(content)
    conn=mysql.connect()
    dbcursor = conn.cursor();
    dbcursor.callproc('sp_createPost',(content['userId'],content['Title'],content['Description'],content['StartDate'],content['EndDate'],content['Tstamp'],content['CityId'],content['Category']))
    data = dbcursor.fetchall()
    if len(data) is 0:
        conn.commit()
        return json.dumps({'message':'Post created successfully!'})
    else:
        return json.dumps({'message':str(data[0])})
   except Exception as e:
        return json.dumps({'message':'Error1'})

@app.route('/api/event', methods=['POST'])
def newevent():
   try:
       content = request.get_json(silent=True);
       #activities=content['activities']
       conn=mysql.connect()
       dbcursor = conn.cursor();
       print "Before"
       print session['uid']
       print content['title']
       print content['desc']
       print content['startTime']
       print content['endTime']

       dbcursor.callproc('sp_createEvent',(session['uid'],content['title'],content['desc'],content['startTime'],content['endTime'],0))
       dbcursor.execute('SELECT @_sp_createEvent_5') 
       result = dbcursor.fetchone()
       if result[0] != 0:
            pass
          #conn.commit()
       else:
          return json.dumps({'message':str(result)})
       eventid=result[0]
       content['eventId']=eventid
       activities=content['activities']
       for activity in activities:
            #return json.dumps(activity)
            dbcursor.callproc('sp_getFeasibleUser',(activity['categoryId'],activity['startTime'],activity['endTime'],content['locationId']))
            data1 = dbcursor.fetchall()
            if len(data1) is 0:
                return json.dumps({'message':'User does not exist'})
            user=modeluser(data1)
            activity['user']=user;
            #return json.dumps(activity['user']['uid'])
            userids=activity['user']['uid']
            #return json.dumps(userids)
            dbcursor.callproc('sp_createActivity',(userids,activity['title'],activity['desc'],activity['categoryId'],activity['startTime'],activity['endTime'],eventid,content['locationId'],data1[0][6],0))
            dbcursor.execute('SELECT @_sp_createActivity_9')
            result2 = dbcursor.fetchone()
            if result2[0] != 0:
                activity['activityid']=result2[0]
            else:
                return json.dumps({'message':str(result2)})
       content['activities']=activities
       conn.commit()
       return json.dumps(content)
   except Exception as e:
       return json.dumps({'error1':str(e)})


@app.route('/api/event', methods=['GET'])
def getallevent():
   try:
       conn=mysql.connect()
       dbcursor = conn.cursor();
       dbcursor.callproc('sp_getEvents',(session['uid'],))
       allevents = dbcursor.fetchall()
       items_list1=[]
       if len(allevents) is 0:
                return json.dumps([])
       for row in allevents:
            event=modelevent(row)
            dbcursor.callproc('sp_getActivity',(event['eventid'],))
            allactivities = dbcursor.fetchall()
            # if len(allactivities) is 0:
            #     return json.dumps([])
            items_list2=[]
            for activity in allactivities:
                activity=modelactivity(activity)
                dbcursor.callproc('sp_getUserFromActivity',(activity['activityid'],))
                data1 = dbcursor.fetchall()
                if len(data1) is 0:
                    return json.dumps({'message':'User does not exist'})
                user=modeluser(data1)
                activity['user']=user
                items_list2.append(activity)
            event['activities']=items_list2
            items_list1.append(event)
       return json.dumps(items_list1)
   except Exception as e:
       return json.dumps({'message':'Error1'+str(e)})

@app.route('/api/userpost', methods=['GET'])
def userpostget():
   try:
       conn=mysql.connect()
       dbcursor = conn.cursor();
       userid=1
       dbcursor.callproc('sp_getUserPosts',(userid,))
       allPosts = dbcursor.fetchall()
       items_list1=[]
       if len(allPosts) == 0:
          return json.dumps([])
       for row in allPosts:
          post=modelpost(row)
          if post['statusOfRequest']==0:
            continue
          else:
            items_list2=[]
            dbcursor.callproc('sp_getAllDataForPost',(post['postId'],))
            allRequestsOfAPost = dbcursor.fetchall()
            if len(allRequestsOfAPost) == 0:
              continue
            for row in allRequestsOfAPost:
              activity=modelactivityforpost(row)
              items_list2.append(activity)
            post['requests']=items_list2
            items_list1.append(post)

            
       return json.dumps(items_list1)
            
   except Exception as e:
         return json.dumps({'message':'Error1'+str(e)})



@app.route('/api/responsepost', methods=['POST'])
def approveactivity():
   try:
    if not request.json or not 'postId' in request.json:
        return json.dumps({'message':'Error'})
    content=request.get_json(silent=True);
    conn=mysql.connect()
    dbcursor = conn.cursor();
    dbcursor.callproc('sp_acceptReject',(content['postId'],content['activityId']))
    allrequests = dbcursor.fetchall()
    for req in allrequests:
      dbcursor.callproc('sp_updateFeasibleUser',(req[1],req[2]))
      allrequests = dbcursor.fetchall()
    return json.dumps({'message':'Works'})
   except Exception as e:
       return json.dumps({'message':'Error1'+str(e)})

@app.route ('/api/sns', methods=['POST'])
def sns():
    try:
      f = request.files['pic']
      m = hashlib.md5()
      m. update(f.filename + str(time.time()))
      hashFileName = m.hexdigest()
      hashFileName = hashFileName + f.filename

      s3.upload_fileobj(f, "govol", hashFileName)
      url_with_query = s3.generate_presigned_url(
          ClientMethod='get_object',
          Params={
              'Bucket': 'govol',
              'Key': hashFileName
          }
      )
      url = url_with_query.split('?', 1)[0]
      conn=mysql.connect()
      dbcursor = conn.cursor();
      dbcursor.callproc('sp_updatePicUrl',(session['uid'],url))
      allrequests = dbcursor.fetchall()
      return Response(json.dumps({"message" :url }), content_type='application/json')
    except Exception as e:
       return json.dumps({'message':'Error1'+str(e)})


def modeluser(usercred):
    i = {
                    'uid':session['uid'],
                    'name':usercred[0][1],
                    'email':usercred[0][1],
                    'pic':usercred[0][2],
                    'type':usercred[0][3],'Description':usercred[0][4],'locationId':usercred[0][5]

                }
    return i;

def modelusersignin(usercred):
    i = {
                    'uid':int(usercred[0][0]),
                    'name':str(usercred[0][1]),
                    'email':str(usercred[0][2]),
                    'pic':str(usercred[0][4]),
                    'type':int(usercred[0][5]),'desc':str(usercred[0][6]),'locationId':usercred[0][7]

                }
    return i;

def modelevent(eventdet):
    i = {
                    'eventid':int(eventdet[0]),
                    'title':str(eventdet[1]),
                    'desc':str(eventdet[2]),
                    'starttime':str(eventdet[3]),
                    'endtime':str(eventdet[4]),
                    'activities':None

                }
    return i;

def modelactivity(eventdet):
    i = {
                    'activityid':int(eventdet[0]),
                    'title':str(eventdet[1]),
                    'desc':str(eventdet[2]),
                    'starttime':str(eventdet[3]),
                    'endtime':str(eventdet[4]),
                    'user':None

                }
    return i;

def modelactivityforpost(eventdet):
    j = {
                    'activityId':int(eventdet[0]),
                    'desc':str(eventdet[5]),
                    'title':str(eventdet[4]),
                    'startTime':str(eventdet[2]),
                    'endTime':str(eventdet[3])
    }
    i = {
                    'eventId':int(eventdet[1]),
                    'title':str(eventdet[11]),
                    'desc':str(eventdet[13]),                    
                    'userId':int(eventdet[12]),
                    'username':str(eventdet[17]),
                    'activity':j,
                    'statusOfRequest':int(eventdet[9])
                }
    return i;


def modelpost(postdet):
    i = {
                    'postid':int(postdet[0]),
                    'title':str(postdet[1]),
                    'desc':str(postdet[2]),
                    'starttime':str(postdet[3]),
                    'endtime':str(postdet[4]),
                    'statusOfRequest':str(postdet[5]),
                    'requests':None

                }
    return i;    

if __name__ == "__main__":
    app.run(debug=True)
