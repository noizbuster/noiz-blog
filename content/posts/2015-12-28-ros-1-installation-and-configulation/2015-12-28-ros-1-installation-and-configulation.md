---

title:  "ROS Study 001. Installing and Configuring Your ROS Environment"

author: noizbuster

date:   2015-12-28 00:06:00

categories: development

tags: [robot, ros]

---

**ROS 개발환경 설정**

* 우분투 14.04 LTS
* IDE : VIM
	* http://wiki.ros.org/action/login/IDEs#Vim
* ROS : JADE Turtle

**Ubuntu Setup**

1. 우분투 14.04를 VM에 설치함
2. 내 입맛대로 초기 세팅
```bash
sudo apt-get remove unity-webapps-common	#우분투 웹검색 삭제
sudo apt-get install vim					#VIM 설치
sudo apt-get install git					#Git 설치
```
3. ROS 설치
```bash
#현재 최신 패키지 리스트 팻칭
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
#인증 키 발급
sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net:80 --recv-key 0xB01FA116
#설치
sudo apt-get update
sudo apt-get install ros-jade-desktop-full
#설치 가능한 패키지 목록 저장해두기 매번 하기 귀찮으니까
apt-cache search ros-jade > available-package-ros.txt
```
4. ROS 초기 설정
```bash
sudo rosdep init
rosdep update
echo "source /opt/ros/jade/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
5. 제대로 초기설정이 되었는지 확인
```bash
echo $ROS_PACKAGE_PATH
```
6. 이런식으로 나오면 오케이
```bash
/home/youruser/catkin_ws/src:/opt/ros/indigo/share:/opt/ros/indigo/stacks
```
7. **OPTIONAL** : 난 GUI를 사용할 일이 없기 때문에 host 에서 VM으로 SSH접속을 위한 세팅을 하였다.
```bash
sudo apt-get install openssh-server
sudo vi etc/hosts.allow # 마지막줄에 ssh:ALL 추가
sudo vi etc/hosts.deny # 마지막줄에 ALL:ALL 추가
/etc/init.d/ssh restart
```
	- 붙을때는 `ssh -p [포트] [계정명]@주소` 로 접속하면 된다. 실습에 x-window 가 필요한 경우가 있는데 이때는 -X 옵션을 준다.
