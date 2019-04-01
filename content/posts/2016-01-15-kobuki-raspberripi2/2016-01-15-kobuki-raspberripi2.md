---

title:  "Kobuki(거북이) 라즈베리파이2랑 연결하기"

author: noizbuster

date:   2016-01-15 00:00:00

category: development

tags: [robot, ros, raspberryPi, kobuki]

---

꼬부기에 쓰기위한 코어로 집에 있는 라즈베리파이2를 사용하기로 했다.  
전력도 외장 배터리를 사용하면 한참 쓸 수 있기 때문에 적절할것이다고 생각했음.  
게다가 설정 끝나면 USB전력 하나만 들어가도 USB무선랜으로 SSH 물려서 쓸 수 있으니 선이 주렁주렁 달려있는것도 피할 수 있음.  
2니까 어느정도 연산력도 있지 않을까 기대해본다.  
[ROS wiki에 raspberry pi 에 indigo 를 설치하는 항목](http://wiki.ros.org/ROSberryPi/Installing%20ROS%20Indigo%20on%20Raspberry%20Pi) 을 참고하여 진행함.  
대부분 비슷하겠지만 중간중간 다른곳이 있음.

**준비물**
- Raspbian Jessie image
- 16GB SD-CARD
- Raspberry pi 2

###raspberry pi 2 setup
1. Downloads Raspbian Jessie Image from internet
2. Burn image into SDcard  
`sudo dd bs=1M if=/media/noizbuster/share/Download/2015-11-21-raspbian-jessie.img of=/dev/mmcblk0`
3. extend internal storage (using `sudo raspi-config`)
4. change locale to en_US UTF-8 (using `sudo raspi-config`)
5. change CPU clock for Raspberry pi2
6. connect to wireless network
7. change keyboard layout `gb` to `us` which in `/etc/default/keyboard` file
8. update & upgrade using apt
9. install vim, git, htop, openssh-server, etc...
10. setup ssh server
11. change boot option to CLI with autologin
12. reboot


###ROS setup

```bash
#setup remote package reposotiry
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu jessie main" > /etc/apt/sources.list.d/ros-latest.list'
wget https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -O - | sudo apt-key add -

#make raspbian up-to-date
sudo apt-get update
sudo apt-get upgrade

#install dependancy
sudo apt-get install python-pip python-setuptools python-yaml python-distribute python-docutils python-dateutil python-six

#install rosdep
sudo pip install rosdep rosinstall_generator wstool rosinstall

#initialize rosdep
sudo rosdep init
rosdep update	#종종 타임아웃이 떠서 받다가 마는 모습을 볼 수도 있는데 다시 시도하면 해결 되더라

#인스톨을 하기 위한 패키지들의 서브셋들을 생성해주는 기능, 이것도 통신상태가 안좋으면 종종 실패하는데 다시 시도하면 된다.
#원래는 GUI툴을 제거한 버전으로 받아오곤 있는데 (jade-ros_comm-wet.rosinstall 이런식임)
#난 XWindow툴이니까 SSH 너머로 화면을 받아올 수 있지 않을까 기대해서 전부 다 설치 하기로 했다.
#TODO 생각보다 많이 걸리고 쓸데없는거까지 깔리는 느낌인데 (QT IDE같은거) 나중에 개선해봐야겠다.
rosinstall_generator desktop_full --rosdistro jade --deps > jade-desktop-full.rosinstall
wstool init src jade-desktop-full.rosinstall
```
