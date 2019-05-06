---

title: "Commonmark의 방향에 대한 사견"

author: noizbuster

date: 2016-04-04 13:17:00

category: development

tags: [commonmark, markdown, documentation]

---

markdown 의 variation이 난립함에 따라 표준화에 대한 요구가 떠올랐고  
John Gruber 와 커뮤니케이션을 거쳐 (다소 시끌했지만) commonmark 가 총대를 매고 나타났다.

현재까지 스펙이 0.25 버전까지 올라왔고 업데이트 주기도 길어지고 있다. 하지만 table 이나 code highlight 에 관한 이야기가 아주 활발히 일어나고 있음에도 불구하고 스펙에 들어갈 기미는 보이지 않는다. 다만 extended 기능으로 추가해서 쓰는게 어떠하냐는 이야기뿐.  

나 역시 너무 많은 기능이 commonmark에 포함되어 진입장벽을 높이거나 하는것엔 동의하지 않지만 github flavor의 table 이나 code highlight support 같은경우엔 매우 직관적이며 진입장벽을 높이지 않는다고 생각한다.

오히려 예약기호들과 본문간의 공백문제(e.g. '## title' 과 '##title')나 여러 부호를 복수로 인정하는 경우 (e.g.  bolic 에 '**' 과 '__' 혹은 list 의 * 와 -) 가 오히려 혼란을 주고 있다는게 내 생각이다.

이렇게 된 이상 UnderscoreJS의 Underscore-contrib 처럼 같이 공식 확장을 제공하는것이 좋지 않을까 싶다.
