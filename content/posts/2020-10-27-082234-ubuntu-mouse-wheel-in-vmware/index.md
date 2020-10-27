---
title: "Ubuntu Mouse Wheel in Vmware"
date: 2020-10-27 08:22:34
tags:
- vmware
- ubuntu
categories:
-
---

# 문제?

불가피하게 게임기에서 리눅스를 써야할일이 있을때 virtual box 를 이용해서 우분투를 계속 써왔는데 여러개 모니터를 사용하거나 할때 vram 도 부족하고 마우스가 오작동하는등의 어려움이 있어서 이번에 vmware 를 사용해보기로 했다.

player 만해도 퍼포먼스가 정말 좋아서 맘에 들었는데.

마우스 조작과 관련해서 맘에 안드는게 너무 많았다.

* 마우스의 앞으로, 뒤로 버튼이 동작하지 않음
* 마우스의 휠이 이상하게 동작함 (위아래로 점프한다거나 하는등 신호가 덜 들어가는 느낌?)

이 문제를 해결하기위해 약 이틀정도 삽질을 해서 해결했다.

# 해결방법

## 환경
* (host) windows 10
* vmware player 16.x
* (guest) ubuntu 20.04

## 1. 마우스 앞, 뒤 버튼 활성화

vm이 설치된 폴더에 보면 `.vmx` 확장자의 파일이 있다.  
이걸 편집해야 한다.

```config
mouse.vusb.enable = "TRUE"
mouse.vusb.useBasicMouse = "FALSE"
usb.generic.allowHID = "TRUE"
```

이 3줄을 `YOUR_VM.vmx` 파일에다가 붙여넣는다. 개행만 잘 되면 위치는 중요하지 않다.

## 2. 마우스 휠 동작의 정상화


### 관련 패키지 설치
```bash
# Install related packages
sudo apt install xserver-xorg-core \
    xserver-xorg-input-evdev \
    xserver-xorg-input-evdev-hwe-18.04 \
    imwheel
```

### xinput 설정 변경
vi 로 다음 파일을 편집한다.
`sudo vi /usr/share/X11/xorg.conf.d/40-libinput.conf`
pointer 항목의 `Driver` 를 `libinput` 에서 `evdev` 로 변경하면 된다

```config
# 원본
Section "InputClass"
        Identifier "libinput pointer catchall"
        MatchIsPointer "on"
        MatchDevicePath "/dev/input/event*"
        Driver "libinput"
```

```config
# 이렇게 수정
Section "InputClass"
        Identifier "libinput pointer catchall"
        MatchIsPointer "on"
        MatchDevicePath "/dev/input/event*"
        Driver "evdev"
```

# imwheel 설정 스크립트 작성
`http://www.nicknorton.net/mousewheel.sh` 의 스크립트를 기반으로 하되 마지막줄을 `imwheel -kill --buttons "4 5"` 로 수정해준다. (이렇게 하지 않으면 앞, 뒤 버튼이 다시 동작하지 않음)

```
#!/bin/bash
# Version 0.1 Tuesday, 07 May 2013
# Comments and complaints http://www.nicknorton.net
# GUI for mouse wheel speed using imwheel in Gnome
# imwheel needs to be installed for this script to work
# sudo apt-get install imwheel
# Pretty much hard wired to only use a mouse with
# left, right and wheel in the middle.
# If you have a mouse with complications or special needs,
# use the command xev to find what your wheel does.
#
### see if imwheel config exists, if not create it ###
if [ ! -f ~/.imwheelrc ]
then

cat >~/.imwheelrc<<EOF
".*"
None,      Up,   Button4, 1
None,      Down, Button5, 1
Control_L, Up,   Control_L|Button4
Control_L, Down, Control_L|Button5
Shift_L,   Up,   Shift_L|Button4
Shift_L,   Down, Shift_L|Button5
EOF

fi
##########################################################

CURRENT_VALUE=$(awk -F 'Button4,' '{print $2}' ~/.imwheelrc)

NEW_VALUE=$(zenity --scale --window-icon=info --ok-label=Apply --title="Wheelies" --text "Mouse wheel speed:" --min-value=1 --max-value=100 --value="$CURRENT_VALUE" --step 1)

if [ "$NEW_VALUE" == "" ];
then exit 0
fi

sed -i "s/\($TARGET_KEY *Button4, *\).*/\1$NEW_VALUE/" ~/.imwheelrc # find the string Button4, and write new value.
sed -i "s/\($TARGET_KEY *Button5, *\).*/\1$NEW_VALUE/" ~/.imwheelrc # find the string Button5, and write new value.

cat ~/.imwheelrc
imwheel -kill --buttons "4 5"
```

편한곳에 파일을 저장하고 `chmod +x mousewheel.sh` 로 실행 권한을 준 뒤에 시작프로그램에 추가해주면 된다.

# references
* [Fixing Mouse Wheel on Chrome in Ubuntu 18.04 Virtualbox / VMWare - Dan Voyce](https://dev.to/danvoyce/fixing-mouse-wheel-on-chrome-in-ubuntu-18-04-virtualbox-vmware-143n)
* [Ubuntu 20.04 mouse scroll wheel speed - Bavouzet Benoît](https://dev.to/bbavouzet/ubuntu-20-04-mouse-scroll-wheel-speed-536o)
* https://io.bikegremlin.com/11541/linux-mouse-scroll-speed/
* https://askubuntu.com/questions/439836/extra-mouse-buttons-not-working-in-virtualization-vmware-virtualbox-ubuntu-hos
* https://help.ubuntu.com/community/VMware/Tools
* https://wiki.archlinux.org/index.php/IMWheel
