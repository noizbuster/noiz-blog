---
title: "001. Nodejs 제대로 설치하기"
date: 2019-07-20 05:34:15
tags:
- nodejs
categories:
- nodejs
---

# Node.js 제대로 설치하기

Node.js 를 설치하는 방법은 아주 다양합니다. 크게 나눠보자면

* Binary 를 다운로드 받아 사용하는 방법
* PackageManager 를 사용해서 설치하는 방법
* 직접 빌드하는 방법
* NVM (Node Version Manager) 를 사용하는 방법

으로 분류 할 수 있습니다.

거두절미하고 제가 강력하게 추천하는 방법은 NVM 을 사용하는것입니다.

설치 방법을 빠르게 배우고 싶은 사람은 [NVM을 이용한 Node.js 설치](#nvm을-이용한-node-js-설치) 부터 보세요.

## 장, 단점

### NVM 을 사용하는 경우 

* Pros
  * 사용하는 Node.js 버전을 쉽게 변경 할 수 있다.
  * Global Package 를 사용할때 권한 관련 문제가 없다.
* Cons
  * 설치가 다소 번거롭다

### Package Manager 를 이용해서 설치 했을 경우

* Pros
  * 설치가 간단하다.
* Cons
  * Global Package 를 설치하고 사용할때 권한관련 문제가 발생 할 수 있다.

### 수동으로 빌드하거나 Binary를 사용하는 경우
* Pros
  * Package Manager 가 없는 OS배포판에서 사용 할 수 있다.  
  * 설정을 내 맘대로 고치기 편하다.
* Cons
  * 설치가 !매우! 번거롭다.

# NVM을 이용한 Node.js 설치
아래 가이드는 Linux(ubuntu) 를 사용하는것을 가정하고 작성되었습니다. 

[Github > nvm-sh](https://github.com/nvm-sh/nvm#install-script) 의 `README.md` 를 참고해서 설치하면 됩니다.


### 설치
```bash
# CURL 로 설치 스크립트를 다운로드 받아서 실행합니다.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# 만약 CURL 말고 WGET 을 사용하고 싶은 경우에는 다음 명령어를 대신 사용하세요
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

### 설정

#### 1. bash 설정
홈디렉토리 아래 있는 .bashrc 혹은 .history 파일을 텍스트에디터로 열어서 맨 아래에 아래 스크립트를 추가해주도록 합시다.  
`만약 zsh 를 사용하는 경우에는 .zshrc 파일에 추가해주어야 합니다.`

```bash
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

#### 2. 설정 확인
이렇게 추가된 스크립트는 새로운 터미널을 열어야지 적용이 됩니다. 만약 작업하던 터미널에서 바로 사용하고 싶다면 그냥 터미널에 위 명령어를 다시한번 입력하면 됩니다.

`nvm --version` 명령어로 nvm 이 잘 설치되었는지 확인 할 수 있습니다. 정상이라면 화면에 nvm 의 버전이 출력될것입니다.

#### 3. node & npm 설치
`nvm ls-remote --lts` 명령어로 설치 할 수 있는 버전의 목록을 볼 수 있습니다.
--lts 옵션을 떼면 nightly build 나 legacy 빌드도 볼 수 있습니다.

이글을 쓰는 시점에서 LTS는 10.16.x 버전 입니다.
`nvm install 10` 명령어로 설치하도록 합니다.
```bash
nvm install 10
Downloading and installing node v10.16.0...
Downloading https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz...
###################################... 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v10.16.0 (npm v6.9.0)```
```
`nvm current` 명령어로 현재 설정된 node 버전을 확인 할 수 있습니다. `node --version` 에도 동일한 버전이 보일것입니다.  
만약 설치된 다른 버전(8)을 사용하고 싶다면 `nvm use 8` 과 같은 방법으로 그때 그때 변경해서 다른 버전을 사용 할 수 있습니다.

자, 이제 설치된 Node.js 로 재미있게 개발을 시작할 준비가 되었습니다.
설치한 유저별로 별도의 global package 디렉토리를 가지기 때문에 sudo 권한이 없더라도 `npm install -g some-package` 같은 명령어도 아무런 문제없이 사용 할 수 있습니다.

# PackageManager 를 통해 설치했을때 팁

nvm 을 사용하고 싶지 않거나 이미 Pacakge Manager 를 통해서 설치를 해서 사용중인경우 Global Package 를 설치할때 문제가 발생 할 수 있습니다. 

> 개인적인 경험으로는 angular 를 설치할때 Sass 관련 패키지들의 바이너리 빌드가 권한 문제로 실패를 해서 문제를 일으키곤 했었습니다.

ubuntu 에서 apt 를 이용해서 node 를 설치한 경우 Global로 설치된 패키지들은 `/usr/local/lib/node_modules`에 위치하게 됩니다. 그런데 이 경로는 root 권한이 있어야지 파일을 쓸 수 있는 영역입니다. 때문에 `sudo npm install some-package` 처럼 실행해줘야 하는것이죠  

그런데 어떤 패키지들은 다른 언어로 된 외부 라이브러리를 설치 이후에 빌드를 하여 바이너리를 생성하는 경우가 있습니다. 이때, 설치는 sudo 권한으로 이루어졌지만 post install 스크립트는 유저권한으로 실행되기 때문에 빌드 결과물이 `/usr/local/lib/node_modules` 안에 안착하지 못하게 되어 문제가 발생하게 됩니다.

이를 해결하기위해 `sudo -i` 옵션을 주거나, global 경로에 일부분만 권한을 다르게 주는등의 지저분한 방법을 사용 할 수도 있지만, 매번 해주어야 하고 다른 문제를 야기 할지도 모르는 일이니 지양하는것이 좋습니다.

보다 나은 해결 방법은 [npmjs.com > fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) 에서 제안하고 있습니다.

global package 가 설치되는 경로를 권한문제가 없는 user 의 홈디렉토리로 변경해서 사용하는 방법 입니다.
 
요약하면 아래와 같습니다.
```bash
# 홈디렉토리에 global package 를 저장할 디렉토리를 하나 만듭니다.
mkdir ~/.npm-global
```
```bash
# npm config 명령어로 설정을 변경해줍니다.
npm config set prefix '~/.npm-global'
```

global 패키지들 터미널에서 실행시킬수 있도록 PATH 에 해당 디렉토리를 추가해줍니다.  
아래 내용을 `.bashrc`, `.zshrc`, `.profile` 와 같은 위치에 넣어줍니다.
```
export PATH=~/.npm-global/bin:$PATH
```

이제 sudo 권한을 주지 않아도 global package 를 설치해서 사용 할 수 있게 되었습니다.

> 만약 이 방법으로 global 설정을 한 상태에서 nvm 을 사용하는 방법으로 돌아가려면 nvm 설치 이전에 홈디렉토리에 .npm 으로 시작하는 관련된 설정 파일들을 모두 삭제 해주어야 합니다. 그리고 package manager 를 통해 node 를 삭제한 후 남아있는 PATH 나 심볼릭 링크가 있는지 확인하여 (`which node`) 찾아 삭제도 해주어야 합니다.

# 마치며
어떤식으로 설치를 하건간에 큰 문제는 없지만, 이왕이면 편하고, 다양한 상황에 잘 대처 할 수 있는 방법이 무엇인지 찾다가 nvm 을 사용하는 방법으로 정착했습니다.  
주변에 Node.js 를 나중에 시작하신분들이 아직 Node.js 를 배워가는 과정중에 설치와 관련된 문제를 만나게 되어 골탕을 먹고 고생을 많이 하는 모습을 보았습니다.  
저의 경우 이전에 rvm을 써본적이 있었기에 유사한 구석이 많아서 적응하는데 큰 어려움이 없었지만 대부분 Node.js 를 처음 시작하는 분들이 nvm으로 시작하는 경우는 거의 본적이 없어서 도움이 되지 않을까 기대해 봅니다.

## References
* [Node.JS > Installation Guide > PackageManager > nvm](https://nodejs.org/en/download/package-manager/#nvm)
* [Github > nvm-sh](https://github.com/nvm-sh/nvm#install-script)
* [npmjs.com > fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)
