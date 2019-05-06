---

title: "실수로 한 apt-get autoremove 수습하기"

author: noizbuster

date: 2016-05-10 00:00:00

category: design

tags: [linux, ubuntu, os, apt]

---

python3.5 를 설치하다가 3.4를 삭제한 상태에서 실수로 autoremove 를 하여 python3.4 와 의존성을 가지던 패키지들이 다 날아가서 네트워크도 안되고 난장판이었다.

재부팅하니 GUI도 쓸수 없었다.

## network 복구
ctrl+alt+F1 으로 터미널1에 붙어서 작업을 한다.
``` bash
sudo vi /etc/network/interfaces
```
에 다가 네트워크 정보를 박아주고
ifconfig 나 iwconfig등으로 네트워크를 수동으로 잡아주거나 해서 네트워크를 연결시킨다.

## 손실된 패키지 솎아내서 복구
일단 apt-get 의 로그를 찾아야겠다 뭔가 아주 많이 지워졌는데 어디부터 날아갔는지 피해산정이 중요하다.
```
vi /var/log/dpkg.log | less
```
에 내용을 보면

```
2016-05-10 08:26:02 status installed ruby2.3:amd64 2.3.1-1bbox1~trusty1
2016-05-10 08:26:02 trigproc libc-bin:amd64 2.19-0ubuntu6.7 <none>
2016-05-10 08:26:02 status half-configured libc-bin:amd64 2.19-0ubuntu6.7
2016-05-10 08:26:02 status installed libc-bin:amd64 2.19-0ubuntu6.7
2016-05-10 08:26:03 startup packages remove
2016-05-10 08:26:03 status installed linux-image-extra-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:03 remove linux-image-extra-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1 <none>
2016-05-10 08:26:03 status half-configured linux-image-extra-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:03 status half-installed linux-image-extra-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:35 status config-files linux-image-extra-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:35 status config-files linux-image-extra-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:35 status installed linux-image-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:35 remove linux-image-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1 <none>
2016-05-10 08:26:35 status half-configured linux-image-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:49 status half-installed linux-image-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:50 status config-files linux-image-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:26:50 status config-files linux-image-3.19.0-56-generic:amd64 3.19.0-56.62~14.04.1
2016-05-10 08:34:49 startup archives unpack
```
이런 데이터가 있다. 우리가 필요한건 이중에서 오늘 날자로 되어있는 remove 로 시작하는 애들인데  
`2016-05-10 ..:..:.. remove` 로 검색되는 행을 남기고 모두 지운다음

![img-paste-20160510162352183.png](img-paste-20160510162352183.png)  
이처럼 정규식으로 패키지 이름만 남기면 되겠다.

이렇게 얻은 패키지 목록을 `apt-get install` 뒤에 붙여주고 설치하면 끝
