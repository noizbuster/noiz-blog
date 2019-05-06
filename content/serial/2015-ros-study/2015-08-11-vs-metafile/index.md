---

title: 'VS 프로젝트 공유시 제외해야할 파일들'

author: noizbuster

date: 2015-12-14 00:06:00

category: development

tags: [visualstudio]

---

git이나 svn으로 혹은 어딘가에 제출할때 IDE 의 메타데이터나 로컬 설정파일들은 제외하는것이 좋다.

특히 VS의 경우 이런 메타데이터들의 크기가 크니 삭제하면 이래저래 많은 도움이 된다.

#### 공통으로 삭제해야 할 파일들

- Debug 디렉토리 (솔루션, 프로젝트 경로상 모두)
- Release 디렉토리 (솔루션, 프로젝트 경로상 모두)
- .suo - 작업내역, 탭이나 창 위치정보가 저장됨
- .user - 사용자별 설정내역이 저장됨

#### VS 버전마다 다른경우

- ipch 디렉토리
- .sdf
- .ncb 파일
