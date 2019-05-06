---

title: Stemcell 기획

author: noizbuster

date: 2016-04-28 00:00:00

category: development

tags: [rust, stemcell, staticgen]

---

# 동기
jekyll을 비롯하여 StaticGen을 이용하여 블로그나 웹페이지를 빌드해주는 엔진들을 사용해 보았는데, 맘에 안드는것이 좀 있었다.  
* front matter 로 사용하는것들이 일관성이 없을뿐더러 .md 파일 자체만 preview 하는경우에 전혀 본문의 일부처럼 보이지 않는다.  
* Static Page 를 빌드하고 나서의 상대 이미지의 경로 문제

front matter 의 경우 그나마 중간에 개행을 추가한 yml 포멧은 md 를 html로 컴파일 했을때 보기에 좀 나아서 사용하고 있지만. 이것역시 다른 엔진이나 테마로 넘어가기엔 호환성이 떨어진다는 문제가 있다(모든 파일을 다시 수정해야한다는 이야기).  

이미지 경로의 경우 나같은 경우 아톰의 img-paste 플러그인으로 md 파일안에 이미지를 링크하는데 이것은 .md 파일과 같은곳에 저장되며 상대경로로 .md 파일안에 링크가 된다. 그런데 staticGen 으로 빌드한 static page 의 경우 destination directory 에 저장된 html 파일과 원본 이미지 파일과의 위치가 다르기 때문에 링크가 죄다 깨지는 문제가 있다.  
이를 해결하기 위해서는 Destination 디렉토리로 .md 파일내부의 상대경로를 수정하는 일종의 compile 과정을 거치게 하거나 image file 들을 destination directory 로 복사 해 주는 과정이 필요하다.

난 테마나 빌드엔진을 바꿀때 컨텐츠파일의 대부분을 재작성하는것을 원하지 않고, 포스트가 디렉토리 단위로 관리가 되었으면 하는 마음이 있다.  
그래서 정형화된 디렉토리와 파일이름으로 포스트를 작성했을때 이것을 jekyll과 같은 staticGen엔진이 빌드 할 수 있도록 다시 포매팅 해주는 전처리기를 만드려고 한다.  
본 포스트에서는 러프하게 그 계획을 세워보겠다.

# Design Plan
1. design directory structure
1. design front-matter load mechanism
1. change image path to destination

# Design
## Directory structure design
categoryName = NNNN-name
articleName = yyyyMMddhhmmss-title hhmmss is optional

* blogRoot/categoryName/articleName/


check existence of front-matter.yml
