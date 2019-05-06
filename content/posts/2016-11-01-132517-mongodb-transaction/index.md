---

title:  Transaction on MongoDB

author: noizbuster

date:   2016-11-01 13:25:17

categories: development

tags: [mongodb, node, nodejs, mongoose, transaction]

---

## Introduction

서버 개발을 하는 도중 MongoDB의 서로 다른 Document 에 Atomic 하게 update 가 일어나야 하는 상황이 왔다. 서버는 Node로 되어있고 ORM은 mongoose 를 쓰고있다.  
헌데 Mongoose 에는 consistency를 보장하면서 복수의 Document를 업데이트 하는 API가 구현되어있지 않은것으로 보여 이를 해결하고자 한다.

## Transaction in MongoDB

MongoDB 는 [Optimistic concurrency control (OCC)](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) 를 채용하고 있고 내부적으로 write lock을 건다고 한다. 때문에 한개 Collection (=table in RDB) 내 에서의 consistency 는 보장이 된다.

하지만 서로 다른 여러개의 collection 에 query 를 수행해야 할 때는 consistency 가 보장되지 않는다.

RDB 에서는 Transaction 이라는 개념으로 이런 consistency 를 보장하는 기능을 제공하는데  
MongoDB는 Official 하게 이러한 기능을 제공하지 않고 two-phase commits 의 패턴으로 이를 극복하도록 가이드 하고 있다. [https://docs.mongodb.com/v3.2/tutorial/perform-two-phase-commits/](https://docs.mongodb.com/v3.2/tutorial/perform-two-phase-commits/)

## Two-phase commits for MongoDB

Two phase commit 은 널리 알려진 패턴이지만 mongoose 에 helper 가 구현되어있지 않기 때문에 차선을 찾아야 했다. 직접 만드는것은 여간 귀찮은일이 아니며, 나같이 미천한 실력으로 미려하게 만들수 있을지도 모르기 때문에 미리 누군가가 만들어둔것이 있으리라 여기고 탐색을 하였다.

영 좋지 않은것을 제외하고는 두가지 정도가 물망에 올랐다.

* https://github.com/niahmiah/mongoose-transact
    * 한국 사람이 만들었다, 잘 만들어져 있다. two-phase commit 으로 구현되어있다. rollback 도 구현되어있는듯. 유사시엔 이것을 쓰면 되겠다.
* https://github.com/wokim/mongoose-transaction-plugin
    * 다르게 구현된 다른 모듈이다. 양심적으로 README에 잘 적혀있다. "만약 네가 이게 필요한거면 넌 잘못된짓을 하고 있다."

만약 필요하다면(반드시 미봉으로 끝나야 겠지만) 이 두개중에? 혹은 그때 나온 괜찮은것을 사용하면 될것이다.

## Conclusion

그들이 __할 수 없었던게 아니라 안하는것이 맞기 때문이었다__ 라고 믿고 안하기로 했다.  
내가 MongoDB에 대해 얕게 알고있기에 이를 극복할 수 있는 네이티브한 방법이 있을지도 모를 일이다.  
이에 혹여 이 글을 읽은 자상한분이 나에게 키워드를 던져주시지 않을까?

## References
* https://en.wikipedia.org/wiki/Optimistic_concurrency_control

__surveyed with gogopg, huey__
