---

title: "Docker Swarm Study"

author: noizbuster

date:   2016-08-18 09:30:29

category: development

tags: [docker, swarm, container]

---

## Introduction

### 동기
이제 슬슬 시스템에 서비스들이 많아지면서 Orchestration을 신경써야 할 필요성이 대두되었다.

supervisor 등의 툴을 사용해서 관리하고 있었지만 sigterm을 맞고도 바로 죽지 않는 컨테이너가 있는 등 문제가 다소 있었고, 이것을 dockerfile 에서 해결하거나 entrypoint 를 스크립트로 잡고 인위적으로 내부의 pid를 관리해야 하는것이 부자연스럽다고 생각하던 차였다.


### Container Orchestration Tools
Container를 Orchestration 해주는 툴들은 근래에 와서 많이 늘어났다.

[8 Container Orchestration Tools to Know](https://www.linux.com/news/8-open-source-container-orchestration-tools-know) 를 보면 주요한 툴들을 잘 설명 해놨다.  
요약하자면

* __ECS__ : Amazon EC2 자체 솔루션
* __ACS__ : MS Azure 자체 솔루션
* Cloud Foundry’s __Diego__ : 스케쥴러 등과 함께 제공된다.
* CoreOS __Fleet__ : CoreOS에 최적화된 Docker Management 툴.
    * 자체적으로 클라우드를 구성하는 입장이 된다면 이걸 쓰지 않을까 싶다.
* __Google Container Engine__ : Google Cloud platform에서 사용함. Kubernetes 를 기반으로 만들어져있다.
* __Kubernetes__ : Google 에서 만든 컨테이너 매니징툴. 2014년정도엔 이만한게 없었다.
* __Mesosphere Marathon__ : Apache Mesos 위에서 돌아가는 도커 프레임워크다.
* Docker __Swarm__ : 하나의 가상 도커 엔진에 여러개의 도커 엔진을 그룹으로 묶어서 운용할 수 있다. 네이티브 클러스터링을 지원한다. 도커팀이 공식적으로 밀고 있는 툴이기 때문에 다른애들은 못하는걸 제공한다.

### 기술선정
일단 소거법으로 접근해보았다.

ECS, ACS 등은 특정 서비스 프로바이더에 비인딩 되기 때문에 나중에 다른데로 마이그레이트 할때 비용이 발생하며, 복수의 서비스 프로바이더나 온프로미스를 섞어서 헤테로지니어스한 시스템을 구성하기가 사실상 어렵다.  
Mesosphere Marathon은 Mesos에 바인드 된다. 우리는 배포시에 ansible 을 쓰기 때문에 이거까지 별도로 올려서 쓸일이 있을까 싶다.  
Fleet 의 경우엔 역사가 짧고 CoreOS에 바인드 되어서 패스하기로 했다.  

이리하여 Kubernates 와 docker swarm 간에서 고민을 하게 되었는데.  
우리의 경우엔 기존에 있는 바닐라 컨테이너들을 묶어서 한번에 켜는일이 많기 때문에 swarm 이 좀 더 매력적으로 보였고 documentation이 잘 되어있으며, docker 팀에서 밀고있는 툴이기 때문에 유지보수에 관한 걱정도 없었다.
물론 kubernates 를 이용하면 성능이나 부하를 파라미터화 해서 엘라스틱하게 운용하기 쉽다는 장점이 있으나 우리의 시스템은 그렇게 고 가용성을 요구하는것도 아니고 클러스터링은 스웜도 네이티브로 지원하기 때문에 손해볼것 없다는 판단을 하였다.

## Docker Swarm
~~나는 군단이다~~  
[docs.docker.com/swarm](https://docs.docker.com/swarm/) 에 문서화가 잘 되어있다.

### Installation & Execution
binary를 설치하기 보다는 docker image 를 그냥 시작 하라고 추천하고 있다.  
swarm 에 기여할게 아니면 전혀 상관이 없는모양

다음 명령어로 원큐에 설치부터 실행까지 된다.
```
docker run swarm
```


## References
* https://www.quora.com/What-is-the-best-Docker-Linux-Container-orchestration-tool
* https://www.linux.com/news/5-next-gen-cloud-technologies-you-should-know
* https://docs.docker.com/swarm/
