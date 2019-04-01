---

title: 성전! SQL 테이블명

author: noizbuster

date:   2016-11-03 15:39:52

categories: development

tags: [mariadb, sql, naming convention, convention, mapping table]

---

## Introduction

디비랑은 별로 안친해서 디테일하게 네이밍 컨벤션 같은것에 대해 생각해본적이 없었다.

이번에 업무 관련해서 작명하다가 관례가 있을까 싶어 조사하던중 재미있는 discussion 들을 보게 되어 정리해보게 되었다.

## ORM 이 미친짓을 한다?
Mongoose 를 쓸적에 collection 이름을 정할때 단수형을 자꾸 복수형으로 바꾸길래 (e.g. user 를 users로 지가 바꾼다) `{collection: 'user'}` 이런식으로 강제로 collection 의 이름을 정해주면서 스키마를 정의한적이 있었다.

마찬가지로 mariadb 를 사용하기위해 도입한 sequelize 도 똑같은짓을 하는데 얘는 mongoose 처럼 쉽게 테이블 이름을 정해주는것이 아니라
```
define: {
    freezeTableName: true
}
```
이런식으로 매번 옵션을 주어야 하는 귀찮은 짓을 해야한다.

검색해 보니 table 은 복수의 데이터를 저장하기 때문에 복수형으로 명명한다는게 관례라는걸 알게 되었는데 문제는 이제 [ISO 표준](https://en.wikipedia.org/wiki/ISO/IEC_11179)으로도 정리가 되어있다는것이다.

아니 아무리 표준이라고 하지만 그래도 엄연히 사용자가 입력한 필드인데 이런건 convention으로 극복을해야지 ORM이 지멋대로 바꿔도 되는건가? 라는 생각이 든데다가 이게 s, es 만 붙는게 아니라 예외도 많을텐데 그것들도 다 대응을 못할텐데? 라는 의심이 되었다.

대표적으로 의심이 되었던것이 child -> children 같이 불규칙하거나 water 같이 불가산명사인 경우 어떻게 처리하는지가 궁금해졌다 시도를 해보았다.

근데 __맙소사 잘 동작한다?__ 이런 노가다를 무릅쓰면서까지 이런걸 구현레벨로 끌어다 놓은 저의가 궁금해서 검색을 해보니 아니라 다를까 시궁창 싸움이 벌어지고 있었다.

* http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names
* http://stackoverflow.com/questions/4702728/relational-table-naming-convention

나에겐 그냥 이건 부먹 찍먹 논쟁처럼 무의미한 정력낭비라고 생각이 되어서 이런걸 구현레벨까지 끌어다 놓은 강경파가 누군지 궁금하여 sequelize repository에서 blame 해보니
한 유저가 inflection 이라는 라이브러리를 추가해서 이걸 구현해 놓은것을 보았다 대단한 열정인것 같다.

## Conclusion
영원히 팝콘이나 먹으며 강건너 불구경을 하고싶지만 나도 개발전선에 있는이상 결정을 해야한다.  
두가지 경우에 대해 수용하겠다는 입장을 세우기로 하였다.

* 복수형을 쓰는 경우에는 코드에도 명시적으로 복수로 언급하여 inflection의 동작을 차단할것.
* 단수형을 쓰는 경우에도 OK지만 모든 사람이 동의해야 함.

사족을 달자면 표준이 복수라는게 깨림직하지만 경험상, 생각되는 문제가 많기로는 복수형을 사용하는게 더 불리해보인다. (naming scheme 이 있는 mapping table 에 끼치는 영향, 신조어에 대응이 느림, 비영어권 사용자들의 실수를 유발 할 수 있음, model명이랑 동일 하게 사용하고 싶은경우 findOne 하더라도 복수형의 인스턴스 이름을 써야함.. 등등)

진짜 별 이상한데서도 성전이 열린다는 사실이 재미있다.
