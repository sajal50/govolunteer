# goVolunteer


To set up the project locally, make sure that **node** is installed on your system globally. Also make sure you have valid **mysql** installation.

Install webpack - 
```
npm install webpack -g
```
Go to user folder, run - 
```
npm install
```

Install the following python modules - 
* `flask`
* `certifi`
* `pprint`
* `Werkzeug`
* `flask-mysql`
* `flask_cors`
* `boto3`

Sync the `database/latest_er.mwb`, using MySQLWorkbench.

Edit the following configurations according to your system in `api/config.py`

Now, run the following commands - 

```
cd user
npm run dev
cd ../api
python application.py
```

and open http://localhost:8080/public/#/login