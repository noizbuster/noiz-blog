---

title:  "ROS Study 006. Services and Parameters"

author: noizbuster

date:   2016-01-03 00:00:00

category: development

tags: [robot, ros]

---

###서비스
토픽은 발행자가 중단하지 않는이상 지속적으로 메세지를 주고받는다.  
하지만 서비스는 일회성으로 연결 - 서비스요청 - 서비스응답 - 하고 닫는다.  
다시 통신하려면 연결부터 시작해야한다.

**rosservice**
- `rosservice call [service] [args]` 서비스를 아규먼트와 함께 요청한다.
	- `rosservice call /clear` 를 실행시키면 거북이가 다닌 경로가 지워진다.
- `rosservice type spawn| rossrv show` 이런식으로 하면 서비스가 가진 타입과 내용물이 보인다.
	- `rosservice call spawn 2 2 0.2 ""` 알게된 내용으로 콜 할 수 있다.
---

###파라미터
**rosparam**
- `rosparam set [파라미터이름] [값]`            set parameter
- `rosparam get [파라미터이름]`            get parameter
	- `rosparam get /` 으로 모든 값들을 볼 수 있다.
- `rosparam load [파일이름] [네임스페이스]`           load parameters from file
- `rosparam dump [파일이름] [네임스페이스]`           dump parameters to file
	- ```bash
rosparam load params.yaml copy
rosparam get copy/background_b
```
	- 를 이용해서 덤프뜰 수 있다. 뒤에 붙은 copy 와 같은 네임스페이스는 생략가능

- `rosparam delete`         delete parameter
- `rosparam list`           list parameter names
