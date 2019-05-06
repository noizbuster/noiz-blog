---

title:  "ROS Study 008. Using rosed to edit files in ROS"

author: noizbuster

date:   2016-01-04 00:00:00

category: development

tags: [robot, ros]

---

**msg 와 srv 에 대한 설명**  
**msg**: msg 파일은 로스 메세지의 필드에 대해 설명된 간단한 파일이다. 그것들은 서로 다른 언어로 메세지를 생성하기위해서 사용된다.  
**srv**: srv 파일은 서비스에 대해서 설명된 파일이다. 이것은 두개의 부분으로 구성된다:리퀘스트, 리스폰스

msg 파일은 패키지에서 msg 디렉토리에 저장된다.  
그리고 srv 파일은 srv디렉토리에 저장된다.

msg 파일은 간단한 텍스트파일이다 필트 타입과 필드네임을 각각 줄에 포함한. 필드 타입들은 다음과 같은게 될 수 있다.
- int8, int16, int32, int64 (plus uint*)
- float32, float64
- string
- time, duration
- other msg files
- variable-length array[] and fixed-length array[C]

ROS에는 또한 특별한 타입이 존재하는데 Header 이다 헤더는 타임스템프와 코오디네이트 프레임 정보를 포함하고 있다. 그것들은 ROS에서 일반적으로 사용된다. 당신은 자주 메세지 헤더에서 이런것들을 자주 보게 될것이다.

여기 헤더를 이용한 메세지에 대한 예제가 있다. 스트링과 두개의 다른 메세지 :
```bash
Header header
string child_frame_id
geometry_msgs/PoseWithCovariance pose
geometry_msgs/TwistWithCovariance twist
```

srv 파일도 두 부분으로 되어있다는것을 빼면 msg 과 같이 간단한 텍스트파일이다. ---로 리퀘스트와 리스폰스 부분은 구분되어있다.
```bash
int64 A
int64 B
---
int64 Sum
```
앞에 A, B 는 리퀘스트 부분이고 뒤에 sum 은 리스폰스 부분이다.

**msg 만들어보기**
```bash
$ cd ~/catkin_ws/src/beginner_tutorials
$ mkdir msg
$ echo "int64 num" > msg/Num.msg
```
The example .msg file above contains only 1 line. You can, of course, create a more complex file by adding multiple elements, one per line, like this:
```
string first_name
string last_name
uint8 age
uint32 score
```
