
---

title:  errorhandling-async-express-router

author: noizbuster

date:   2018-08-23 16:28:36

categories: development

tags: []

---

# Error Handling On Express

나는 Express API 를 만들때 글로벌 트랩을 만들어서 UnHandled Exception 을 처리하는 방법을 즐겨쓴다.
```javascript
// Global Error Handler
app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let extra = err.extra || {};
    l.e('Unhandled Error', err);
    let resBody = {message: err.message, extra: extra, details: err};

    if (process.env.NODE_ENV === 'production') {
        return res.status(status).json({message: 'internal error'});
    } else {
        return res.status(status).json(resBody)
    }
});
```

Synchronous 핸드러를 썼을때는 잘 동작했겠지만 async function 을 쓰면서 부터는 throw 되는 에러들이 express 를 타지 못하는 문제가 있다.
```javascript
// 1-1 router with weak error handling
router.get('/:rid', async function (req, res) {
    let resource = await Resource.findOne({_id: req.params.rid});

    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({msg: 'not found'});
    }
});
```
예를 들어 위와 같은 코드에서 findOne 이 실패하면 GlobalErrorHandler 을 타지 못하고 `UnhandledPromiseRejectionWarning` 을 맞게된다.

아주 정형화된 404 같은 예외는 헬퍼를 작성해서 쓰거나 글로벌에서 하도록 취향껏 선택하면 되니 논외로 하더라도, 예측가능하거나 failover 가 필요한 error 들은 try/catch로 별도로 핸들링 해주어야 한다.
하지만 이밖에 일어나는 예측하지 않은 에러들은 어짜피 API 입장에선 실패이고 (복구 가능하든 가능하지 않든간에) 500 뱉고 끝내야 하므로 global에서 처리하는게 바람직하다.

```javascript
// 1-2 router with try/catch
router.get('/:rid', async function (req, res, next) {
    try {
        let resource = await Resource.findOne({_id: req.params.rid});

        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({msg: 'not found'});
        }
    } catch (e) {
        next(e);
    }
});
```
이걸 해결하려면 이런식으로 try/catch 로 묶어서 처리해야 한다.
맘에 안든다 별 의미없이 코드 블럭이 한레벨 더 들어가게 되기 때문에 가독성도 떨어질뿐만 아니라 모든 라우트에 try/catch를 해줘야하는것도 번거롭다.
또, 만약 코드 내부에서 선별적으로 다른 Exception 을 발생시켜야 하는 경우에는 생성한 Error 가 복수개의 catch 문을 통과하게 되기 때문에 지저분해진다.

좀 더 깔끔하게 라우터를 작성할 수 있도록 라우터 핸들러를 wrapping 해서 throw 되는 exception 을 next 로 넘겨주게끔 처리 할 수 있다.

```javascript
//wrapper
asyncErrorHandler(fn) {
    return function (req, res, next) {
        return Promise
            .resolve(fn(req, res, next))
            .catch(next);
    }
}
```

위와같은 wrapper 를 하나 만들어두고 불러다가 쓰면 훨씬 가독성이 좋아진다

```javascript
// 1-3 using asyncErrorHandler
router.get('/:rid', asyncErrorHandler(async function (req, res, next) {
    let resource = await Resource.findOne({_id: req.params.rid});
    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({msg: 'not found'});
    }
}));
```


# References

* [using-async-await-in-express-with-node](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)
* [npm package: express-async-handler](https://www.npmjs.com/package/express-async-handler)
* [how-to-write-async-await-without-try-catch-blocks-in-javascript](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/)
