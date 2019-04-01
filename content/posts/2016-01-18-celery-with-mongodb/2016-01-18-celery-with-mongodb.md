---

title:  "celery with mongodb"

author: noizbuster

date:   2016-01-18 00:00:00

category: development

tags: [python, celery, mongodb]

---

#Celery 와 Mongo DB를 이용한 튜토리얼

참고링크  
http://skillachie.com/2013/06/15/intro-celery-and-mongodb/  

1. install celery  
`pip install celery`  
`pip install -U 'celery[mongodb]'`or `pip install -U celery-with-mongodb`  
아래와 같은 형식으로 나중에 브로커를 등록 하면 됨.
```python
BROKER_URL = 'mongodb://localhost:27017/database_name'
#Where the URL is in the format of:
mongodb://userid:password@hostname:port/database_name
```
```bash
use test
db.createUser( {use: "testUser", pwd: "test", roles: ["readWrite", "dbAdmin"] } )
#다음 명령은 read 권한만 갖고 있는 동일한 사용자를 admin 데이터베이스에 추가하고 testDB2 데이터베이스에 대한 readWrite 권한을 부여한다.
use admin
db.createUser( {user: "testUser", userSource: "test", roles: ["read"], otherDBRoles:{ testDB2: ["readWrite"] } } )
```
2. 설정파일을 작성한다. (celeryconfig.py)
```python
from celery.schedules import crontab
CELERY_RESULT_BACKEND = "mongodb"
CELERY_MONGODB_BACKEND_SETTINGS = {
    "host": "127.0.0.1",
    "port": 27017,
    "database": "jobqueue",
    "taskmeta_collection": "stock_taskmeta_collection",
}
```
1. 나의경우 ubuntu 15.10 이라서 mongodb3.2 버전의 데비안패키지가 튜토리얼에 안적혀있었다.
```bash
#레포지터리에 접속하기위한 퍼블릭키를 받고
sudo apt-get adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9ECBEC467F0CEB10
#레포지터리를 추가하고
echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
#설치한다
sudo apt-get update
sudo apt-get install -y mongodb-org
```
별 문제가 없다면 [MongoDB Ubuntu Installation](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/) 를 따라서 설치하면 된다.

1. 다음과 같이 task.py 파일을 작성한다.
```python
from celery import Celery
app = Celery('tasks', broker='mongodb://userid:password@localhost:27017//jobqueue')
@app.task
def add(x, y):
   	return x + y
```


>**pip install 로 설치를 했는데 celery 가 없다고 나오는경우**  
우분투의 경우 `~/.local/bin` 안에 있을수 있다.  
`export PATH=$PATH:/home/user/.local/bin/` 명령어로 추가하면 정상작동할것임  
