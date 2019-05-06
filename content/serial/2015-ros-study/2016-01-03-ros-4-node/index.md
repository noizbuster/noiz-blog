---

title:  "ROS Study 004. ros node"

author: noizbuster

date:   2016-01-03 00:00:00

category: development

tags: [robot, ros]

---

####본 내용은 개념적인것임으로 기존에 설명된 자료들을 이야기 하고 넘어가도록 하겠다.
한국어로 설명된 카페의 내용이다.
[http://cafe.naver.com/openrt/2468](http://cafe.naver.com/openrt/2468)
####이하 내용은 wiki.ROS.org 에 게시된 튜토리얼을 대충 번역한것이다.
[http://wiki.ros.org/ROS/Tutorials/UnderstandingNodes](http://wiki.ros.org/ROS/Tutorials/UnderstandingNodes)

---

###사전작업

이 튜토리얼을 위해서 우리는 가벼운 시뮬레이터를 사용할것이다.
`$ sudo apt-get install ros-<distro>-ros-tutorials`
`<distro>`부분을 당신이 사용하는 배포판으로 대체해서 사용하면 된다.(e.g. hydro, groovy, electric, fuerte etc.)

###그래프컨셉을 빠르게 리뷰하기

- Nodes: 노드는 ROS를 이용해서 실행가능한것이고 ㅇ다른 노트들과 대화(통신)할 수 있는것이다.
- Messages: 토픽(Topic)을 구독(subscribing) 하거나 발행(publishing)할때 사용되는 ROS 데이터 타입
- Topics: 노드는 토픽에 대한 메세지를 발행 할 수 있을 뿐만 아니라 구독 해서 메세지를 받을 수도 있다.
- Master: 로스 서비스의 이름, 같은 서비스에 있는 노드들이 서로를 찾을 수 있도록 중계해주는 역할.
- rosout: 로스에서 사용되는 stdout/stderr와 같은 인터페이스
- roscore: Master + rosout + parameter server (파라미터 서버에 대해서는 나중에 설명한다.)

###Nodes 노드

노드는 로스 패키지내에서 실행 가능한것 이상이 아니다. 로스 노드는 로스 클라이언트 라이브러리를 사용해서 다른 노드들과 통신한다. 노드들은 토픽을 발행하거나 구독 할 수 있다. 노드들은 서비스를 제공하거나 사용할 수 있다.

###Client Libraries

로스 클라이언트 라이브러리는 서로 다른 언어로 작성된 노드끼리 통신 할 수 있도록 해준다.

rospy = python client library

roscpp = c++ client library

###roscore

roscore 는 로스르 이용해서 실행해야할 첫번째것이다.

Please run:
```bash
$ roscore
```
이런 메세지를 볼 수 있을것이다.
```bash
... logging to ~/.ros/log/9cf88ce4-b14d-11df-8a75-00251148e8cf/roslaunch-machine_name-13039.log
Checking log directory for disk usage. This may take awhile.
Press Ctrl-C to interrupt
Done checking log file disk usage. Usage is <1GB.
started roslaunch server http://machine_name:33919/
ros_comm version 1.4.7
SUMMARY
========
PARAMETERS
 * /rosversion
 * /rosdistro
NODES
auto-starting new master
process[master]: started with pid [13054]
ROS_MASTER_URI=http://machine_name:11311/
setting /run_id to 9cf88ce4-b14d-11df-8a75-00251148e8cf
process[rosout-1]: started with pid [13067]
started core service [/rosout]
```
만약 로스코어가 초기화 되어있지 않았으면 아마 당신은 네트워크 설정 문제가 있을것이다.[Network Setup - Single Machine Configuration](http://wiki.ros.org/ROS/NetworkSetup#Single_machine_configuration)
만약 로스코어가 초기화 되지 않고 퍼미션이 부족하다는 메세지를 보았으면 아마도 ~/.ros 경로를 루트가 소유하고 있을것이다. 다음 명령어도 해결 할수 있다.
```bash
$ sudo chown -R <your_username> ~/.ros
```

###Using rosnode

roscore를 켜둔채로 새로운 터미널을 열어서 로스 노드를 사용해 보자

`rosnode` 는 ROS에서 현재 동작중인 노드들에 대한 정보를 보여준다.

```bash
$ rosnode list
/rosout
```
이것은 우리에게 `rosout` 한개의 노드만이 실행중이라고 보여준다. 이것은 항상 실행되며 노드에 대한 디버깅 출력되 로그를 모은다.

`rosnode` 명령어는 특정 노드에 대한 정보만 리턴 할 수도 있다.
```bash
$ rosnode info /rosout
Node [/rosout]
Publications:
 * /rosout_agg [rosgraph_msgs/Log]

Subscriptions:
 * /rosout [unknown type]

Services:
 * /rosout/set_logger_level
 * /rosout/get_loggers

contacting node http://machine_name:54614/ ...
Pid: 5092
```
이제 더 많은 노드들을 봐보자, 이것을 위해 우리는 rosrun을 이용해서 다른 노드들을 가져와 볼 것 이다.

###Using rosrun

`rosrun` 은 패키지 이름을 이용해서 직접적으로 패키지에 있는 노드를 구동 할 수 있게 해준다.(알고 있는 패키지 경로에 대해서만).

Usage:
```bash
#rosrun [package_name] [node_name]
$ rosrun turtlesim turtlesim_node
```

당신은 turtlesim 창을 볼 수 있을것이다.

In a new terminal:
```bash
$ rosnode list
/rosout
/turtlesim
```
강력한 로스의 기능중 하나는 커맨드라인에서 노드의 이름을 다시 할당 할수 있는것이다.


turtlesim window를 닫아 노드를 중단시키고 (혹은 터미널에서 컨트롤+C를 누르고 재실행하는데 다음과 같이 아규먼트를 줄것이다.

```bash
$ rosrun turtlesim turtlesim_node __name:=my_turtle
```
이제 다시 노드들의 리스트를 보면

```bash
$ rosnode list
/rosout
/my_turtle
```

제대로 안닫긴 노드가 리스트에 보일때는 `$ rosnode cleanup` 을 이용해서 클린업 할 수 있다.

rosnode 를 이용해서 노드에다가 핑을 날려볼수도 있다.
```bash
$ rosnode ping my_turtle
rosnode: node is [/my_turtle]
pinging /my_turtle with a timeout of 3.0s
xmlrpc reply from http://aqy:42235/     time=1.152992ms
xmlrpc reply from http://aqy:42235/     time=1.120090ms
xmlrpc reply from http://aqy:42235/     time=1.700878ms
xmlrpc reply from http://aqy:42235/     time=1.127958ms
```

###Review
What was covered:
- roscore = ros+core : master (provides name service for ROS) + rosout (stdout/stderr) + parameter server (parameter server will be introduced later)
- rosnode = ros+node : ROS tool to get information about a node.
- rosrun = ros+run : runs a node from a given package.

Now that you understand how ROS nodes work, let's look at how ROS topics work. Also, feel free to press Ctrl-C to stop turtlesim_node.
