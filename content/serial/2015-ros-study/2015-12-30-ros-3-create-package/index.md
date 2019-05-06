---

title:  "ROS Study 003. Create the Package"

author: noizbuster

date:   2015-12-30 00:06:00

category: development

tags: [robot, ros]

---

**패키지 만들기**

ros 패키지를 만드는 방법은 2가지가 있다.

* roscreate-pkg를 사용한다.
 * groovy 기반의 이전에 쓰던 방법
* catkin을 사용한다
 * Fuerte 이후 버전에서 사용 할 수 있는 최신의 방법

**Catkin으로 워크스페이스 만들기**

1. Workspace 디렉토리 생성
2. `catkin_init_workspace`로 Workspace 초기화
3. `catkin_make`를 해서 빌드
4. 만약 이 Workspace의 경로를 `$ROS_PACKAGE_PATH`에 추가 하고 싶으면 `source devel/setup.bash` 를 하면 된다.

---

Workspace에는 여러개의 Package가 포함 될 수 있다.

```
workspace_folder/        -- WORKSPACE
  src/                   -- SOURCE SPACE
    CMakeLists.txt       -- 'Toplevel' CMake file, provided by catkin
    package_1/
      CMakeLists.txt     -- CMakeLists.txt file for package_1
      package.xml        -- Package manifest for package_1
    ...
    package_n/
      CMakeLists.txt     -- CMakeLists.txt file for package_n
      package.xml        -- Package manifest for package_n
```
이런식으로 Workspace의 내부가 구성된다.

---

catkin 으로 패키지 만들기
1. Workspace의 src 디렉토리로 이동
2. `catkin_create_pkg beginner_tutorials std_msgs rospy roscpp` 로 패키지 생성
 - [파라미터들은 앞에서부터 PackageName, 나머지는 의존성 패키지들](http://wiki.ros.org/catkin/commands/catkin_create_pkg)
 - ```bash
# 이렇게 디렉토리와 파일들이 생성된다.
rosand@rossandbox:~/catkin_ws/src$ ls
beginner_tutorials  CMakeLists.txt
rosand@rossandbox:~/catkin_ws/src$ ls beginner_tutorials/
CMakeLists.txt  include  package.xml  src
```
3. `catkin_make`명령어로 빌드를 해본다.
 - ```bash
rosand@rossandbox:~/catkin_ws$ catkin_make
Base path: /home/rosand/catkin_ws
Source space: /home/rosand/catkin_ws/src
Build space: /home/rosand/catkin_ws/build
Devel space: /home/rosand/catkin_ws/devel
Install space: /home/rosand/catkin_ws/install
####
#### Running command: "cmake /home/rosand/catkin_ws/src -DCATKIN_DEVEL_PREFIX=/home/rosand/catkin_ws/devel -DCMAKE_INSTALL_PREFIX=/home/rosand/catkin_ws/install -G Unix Makefiles" in "/home/rosand/catkin_ws/build"
####
-- Using CATKIN_DEVEL_PREFIX: /home/rosand/catkin_ws/devel
-- Using CMAKE_PREFIX_PATH: /opt/ros/jade
-- This workspace overlays: /opt/ros/jade
-- Using PYTHON_EXECUTABLE: /usr/bin/python
-- Using Debian Python package layout
-- Using empy: /usr/bin/empy
-- Using CATKIN_ENABLE_TESTING: ON
-- Call enable_testing()
-- Using CATKIN_TEST_RESULTS_DIR: /home/rosand/catkin_ws/build/test_results
-- Found gtest sources under '/usr/src/gtest': gtests will be built
-- Using Python nosetests: /usr/bin/nosetests-2.7
-- catkin 0.6.16
-- BUILD_SHARED_LIBS is on
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~  traversing 1 packages in topological order:
-- ~~  - beginner_tutorials
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- +++ processing catkin package: 'beginner_tutorials'
-- ==> add_subdirectory(beginner_tutorials)
-- Configuring done
-- Generating done
-- Build files have been written to: /home/rosand/catkin_ws/build
####
#### Running command: "make -j4 -l4" in "/home/rosand/catkin_ws/build"
####
```
4. 만든 패키지를 `$ROS_PACKAGE_PATH` 에 추가 한다.
 - `source /devel/setup.bash` 를 이용하면 된다.
 - 그러면 'echo $ROS_PACAKGE_PATH' 로 확인했을때 새로운 경로가 추가된것이 보인다.
    - **/home/rosand/catkin_ws/src**:/opt/ros/jade/share:/opt/ros/jade/stacks
5. `rospack` 명령어로 해당 Package가 어떤 first-dependancy 를 가지고 있는지 확인할 수 있다.
 - ```bash
rosand@rossandbox:~/catkin_ws/devel$ rospack depends1 beginner_tutorials
roscpp
rospy
std_msgs
```
 - '4.' 에서 언급한 setup.bash를 하지 않으면 경로를 찾지 못하기 때문에 해 주어야 정상적으로 이렇게 볼수 있다.
 - 이렇게 확인 할수 있는패키지들은 1차 적으로 의존성을 가지는 패키지들인데 의존성 패키지들 또한 다른 패키지에 의존성을 가진다.
 - ```bash
$ rospack depends1 rospy
genpy
rosgraph
rosgraph_msgs
roslib
std_msgs
```
 - 이런 간접의존(indirect) 패키지까지 확인할때는 아래와 같이 `rospack`명령어를 사용하면 된다.
 - ```bash
$ rospack depends beginner_tutorials
cpp_common
rostime
roscpp_traits
roscpp_serialization
genmsg
genpy
message_runtime
rosconsole
std_msgs
rosgraph_msgs
xmlrpcpp
roscpp
rosgraph
catkin
rospack
roslib
rospy
```
6. Package.xml 를 수정하여 메인테이너, 라이선스, 의존성등을 관리 할 수 있다.
