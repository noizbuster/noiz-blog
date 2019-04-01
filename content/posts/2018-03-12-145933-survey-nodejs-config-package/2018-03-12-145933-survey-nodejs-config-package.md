
---

title:  survey-nodejs-config-package

author: noizbuster

date:   2018-03-12 14:59:33

categories: development

tags: []

---

# Motivation

nodejs 프로젝트를 하면서 build stream 이나 configuration 의 default 를 관리해야 할 일이 많다. 프로젝트들이 복잡해짐에 따라 다양한 요구조건들이 생기는데 내가 써본 라이브러리들이 이런 문제를 다 커버하지 못하는 문제가 있다. 내가 경험했던 패키지들의 특징과 장단점을 비교해보겠다.

# What I Need

1. 배포는 docker 로 이루어 지기 때문에 config 디렉토리가 통째로 빈 디렉토리로 덮어씌워질 수 있다. (docker data volume 은 file 단위의 mount 를 지원하지 않는다.) 하지만 유저가 편집하는데 참고가 되기 위해 default 파일이 필요에 의해 재생되어야 한다
1. 개발편의상 environment variable (NODE_ENV) 에 따라 참조하는 configuration 파일이 달라져야 한다.
1. 내부에서 동적으로 로드되는 플러그인마다 서로 다른 configuration 을 사용하기 때문에 singleton 뿐만 아니라 instance 형태로도 configuration 을 로드할 수 있어야 한다.

## Node Packages
# config (node-config)
2번 요구조건을 만족한다. 여러가지의 파일 포맷을 지원하며 configuration 을 읽고 없는 값들은 default 에서 마저 로드하는 등의 작업이 되어있다. 사용하기 간편하나 singleton 으로만 동작하고 대부분의 입력값을 environment variable 을 참조하기 때문에 플러그인을 런타임에 로드하는 프로젝트의 특성상 플러그인들은 자신이 가진 별도의 configuration 을 읽지 못한다.

# cosmiconfig
3번 요구조건을 만족한다. instance로 configuration 을 로드 할 수 있기 때문에 plugin 안에서도 자신이 원하는 파일을 로드해서 쓸 수 있다. 단, NODE_ENV 별로 ㄷ른 파일을 읽는 기능은 제공하지 않는다.

# What I Did
처음에는 config 를 이용해서 plugin 안에서 다른 파일을 읽게 할 수 있을것이라고 기대했다 때문에 1번 요구조건을 만족시키기 위해 config package 를 config-extra 로 wrapping 해서 사용 했다. plugin 을 리팩토링하면서 제대로 만들려고 하니까 로드가 잘 안된다는것을 확인했고, 다른 라이브러리를 찾아보기로 했고. cosmiconfig 를 그렇게 알게 되었는데 역시나 한계가 많아서 못쓰게 되었다.

# What I Going To Do

빡쳐서 안되겠다 직접 만들어서 써야지. 다양한 확장자나 instance 별 로드같이 fancy한 가능 없이 baremetal로 작성해야겠다.
