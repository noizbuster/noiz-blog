---

title:  css 넘치는 text 줄임말로 처리하기

author: noizbuster

date:   2016-04-12 00:00:00

categories: development

tags: [web, css, markup]

---

#### 문제
div 나 span 내부에 있는 텍스트들이 너무 길어서 칸 밖으로 나갈때 잘라내거나 `...` 등으로 줄임표시 하고 싶은 경우가 있다.

responsive 하게 디자인되지 않은 경우에는 대게 width가 px로 정의되기 때문에 text-overflow 옵션을 조정하여 해결할할 수 있으나.

엘리먼트의 크기가 percentage 와 같이 상대적인 크기로 정의되어있을때는 제대로 동작하지 않는다는 문제가 있다.

#### 시도해본것
```css
p {
    white-space: nowrap;
    width: 100%;
    overflow: hidden; /* "overflow" value must be different from "visible" */
    text-overflow: ellipsis;
}
```
```
float:left;
```

#### 해결방법
```css
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}
```
CSS 를 추가해주면 잘 동작한다... 이유는 모르겠음
