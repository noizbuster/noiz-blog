---

title: "Converting .OVA to docker image"

author: noizbuster

date: 2016-04-20 00:00:00

category: development

tags: [docker, vm, virtualbox, ova]

---

### 0.서론
도커 이미지를 만드는것은 그리 어렵지 않았다.

근데 지금 쓰고있는 VM을 docker image 로 바꿔서 실행하면  
서버나 시뮬레이터를 좀 더 편하게 만들고 실행할때는 속도가 더 빠를것이라고 기대했다.  
VM 툴들은 스냅샷도 지원하니까 버전관리도 할 수 있다.

물론 도커 이미지를 다른 이미지를 베이스로 하여 올리는것보다는 빌드에 시간도 많이 걸리고  
실행시에 엔트리 포인트도 정해 줘야 할 것 같은 불길한 예감이 들지만

뭐 어떠한가! 빠른데!

### 1. Extracting .vmdk from VM (.OVA)
우선 `Virtual machine to docker image` 따위의 키워드로 구글링 해보니  
.vmdk 를 docker .img 로 변환하는 방법이 제시되어있었다.

근데 문제는 내 vm 은 vmdk 가 아니라 vdi를 이용하고 있어서 써먹을수 없는 방법이라는건데  
검색해보니 VM을 아카이브할때 나오는 OVA 파일 내부에 vmdk가 포함되어있다는것을 알게되었다.

원하는 VM을 OVA 파일로 아카이브 한 후에

```
 tar -tf [MY_VM].ova
[MY_VM].ovf
[MY_VM]-disk1.vmdk
```

내부에 vmdk 파일이 들어있음을 확인 할수 있다.

```
 tar -xvf [MY_VM].ova
```
압축을 풀어준다. 용량에 따라 시간이 제법 걸릴수도 있다.

### 2. Converting .vmdk to docker image
얻게된 `[MY_VM]-disk1.vmdk` 파일을 가지고 docker image 를 만들어보자.  
우선 큐에무가 있어야 한다. `sudo apt-get install qemu`
```
 qemu-img convert -f vmdk -O raw [MY_VM]-disk1.vmdk [MY_OUT].img
```
성공! 근데 용량이 40기가에 육박한다...

### 3. Running docker image
용량이 너무 크지만 그래도 이왕 만든거 돌려는 봐야겠다.

```
 sudo docker load -i [MY_OUT].img
 sudo docker run -ti [MY_OUT] bash
```

---

참고 :  
- __ova to vmdk__  
http://edoceo.com/notabene/ova-to-vmdk-to-qcow2
- __vmdk to docker image__  
http://stackoverflow.com/questions/31321076/convert-vagrant-box-to-docker-image
