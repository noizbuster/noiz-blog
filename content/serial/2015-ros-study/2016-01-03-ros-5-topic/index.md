---

title:  "ROS Study 005. Topics"

author: noizbuster

date:   2016-01-03 00:00:00

category: development

tags: [robot, ros]

---

###토픽

- `rostopic echo [토픽이름]` 토픽에서 주고 받는 내용 출력
- `rostopic list` 현재 활성화된 토픽들의 리스트를 본다.
- `rostopic pub [토픽] [메세지타입] [데이터]`	해당토픽에 메세지를 발행한다.
- `rosrun rqt_graph rqt_graph` 현재 노드들과 토픽들에 대해서 그래프를 그려준다.
- `rostopic type /turtle1/cmd_vel | rosmsg show` 해당 채널의 메세지의 타입과 내용을 보여준다.
- `rostopic hz /turtle1/pose` 메세지의 데이터 레이트를 보여준다.
- `rosrun rqt_plot rqt_plot` 특정 메세지의 특정값이 시간에 따라 어떻게 변하는지 그래프로 그려줌
