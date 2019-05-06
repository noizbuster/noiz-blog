---

title:  "ROS Study 009. Creating a ROS msg and srv"

author: noizbuster

date:   2016-01-04 00:00:00

category: development

tags: [robot, ros]

---

**rosed**  
`rosed` 는 `rosbash`의 일부분이다.  
이 명령어는 패키지명과 파일명으로 바로 파일을 편집 할 수 있도록 해준다.  
`rosed roscpp Logger.msg` 로 사용하면 roscpp 패키지 내부의 Logger.msg 파일을 바로 에디터로 열어준다.  
역시 탭 컴플리션을 지원하기 때문에 `rosed roscpp` 상태에서 탭을 두번치면 내부의 파일을 보여준다.

에디터를 바꾸고싶으면  
- nano : `export EDITOR='nano -w'`
- vim : `export EDITOR='vim -w'`
- emacs : `export EDITOR='emacs -nw'`
