---

title: "Expand linux guest's vdi size on linux host"

author: noizbuster

date:   2016-08-17 11:18:38

category: development

tags: [virtualbox]

---

## 동기
처음에 정해진 사이즈 내에서는 vdi의 사이즈가 자동으로 늘어나지만 (기본설정이라면) 그게 넘어가 버리면 용량을 늘리기가 생각보다 귀찮았다.
검색해보니 vdi 를 클로닝 하는 방법이랑 vboxmanage 명령어로 늘리는 방법 두가지가 존재했다.
난 이중에서 명령어를 사용해서 늘리는 식으로 했다.

## 방법
1. 우선 VM을 shutdown 해서 끈다.
1. VM 파일이 있는 경로로 이동해서 vdi 파일을 찾는다.
1. `vboxmanage modifyhd roconsim-ansible.vdi --resize 30000` 식으로 vdi의 사이즈를 바꿔준다. 에러메세지 없이 끝나면 잘 된것이다.
    * resize 옵션 뒤에 붙는 숫자는 MB 단위로 새로운 크기이다. 예를들어 15기가로 잡고 싶으면 15000 과 비슷한 값이 되겠다.
1. ubuntu live 나 gparted live disk 를 넣고 gparted 를 켜서 파티션을 재조정한다.
1. 끈다음 재부팅하면 파티션이 늘어나 있다.

> 주의 : 스냅샷들을 다 지우고 수행하는것을 추천함.  
주의 : 귀찮다고 깔려있는 리눅스로 그냥 부팅해서 gparted 로 리사이즈 하려고 하면 늘어나지 않은 용량으로 보이기 때문에 꼭 live cd 로 부팅해서 써야한다.

## +
난 이정도 기능은 virtualbox 자체적으로 ui가 지원해 주리라 기대했는데 아니였다.  
막상 해보니 시스템 구조상 그럴수도 있겠다 싶기도 하고 OS 마다 다 뭔가 작업을 해주기를 바라는것도 좀 이상하긴 한것 같았다.

해보지 않았지만 검색하다가 같이 나온 자료들을 보면 Guest OS 가 윈도우인 경우에는 부팅 미디어로 부팅하지 않아도 관리도구에 있는 디스크 관리툴로 리사이즈가 잘 되는 모양이다.
