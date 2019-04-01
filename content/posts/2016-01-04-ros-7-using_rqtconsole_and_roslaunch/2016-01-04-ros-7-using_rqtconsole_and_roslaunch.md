---

title:  "ROS Study 007. Using rqt_console and roslaunch"

author: noizbuster

date: 2016-01-04 00:00:00

category: development

tags: [robot, ros]

---

### Prerequisites rqt and turtlesim package
```bash
sudo apt-get install ros-<distro>-rqt ros-<distro>-rqt-common-plugins ros-<distro>-turtlesim
```

**rqt_console & rqt_logger_level**  
rqt_console 은 ROS의 로깅 프레임워크에 붙어서 노드들이 내는 출력들을 보게 한다.  
`rosrun rqt_console rqt_console` 로 실행한다.  
rqt_logger_level은 debug, info, warning 등의 로깅 레벨을 정할 수 있게 해준다.  
`rosrun rqt_logger_level rqt_logger_level`로 실행한다.

**Using roslaunch**  
roslaunch 는 정해진 설정대로 여러개의 노드를 한번에 실행 시켜주는것이다. 하나의 프로젝트를 통채로 실행할때 좋다.
```xml
<launch>

  <group ns="turtlesim1">
    <node pkg="turtlesim" name="sim" type="turtlesim_node"/>
  </group>

  <group ns="turtlesim2">
    <node pkg="turtlesim" name="sim" type="turtlesim_node"/>
  </group>

  <node pkg="turtlesim" name="mimic" type="mimic">
    <remap from="input" to="turtlesim1/turtle1"/>
    <remap from="output" to="turtlesim2/turtle1"/>
  </node>

</launch>
```
이런식으로 구성된다.  
각각의 노드의 이름을 정해 줄 수 있으며 입출력을 리매핑 해주는것도 가능하다.
