
---

title:  js-documentation

author: noizbuster

date:   2018-11-19 16:13:57

categories: development

tags: []

---

도큐먼트 제네레이션을 하려고 하는데 고민이 많았다.
타입스크립트 쓰면 typedoc 이 대부분 해결 해 주니까 별 문제가 없지만.
ES7 를 쓰고있는 프로젝트들은 esdoc 이나 jsdoc 를 끼고 갈 수 밖에 없다.

내 요구조건은 다음과 같았다.

1. 충분히 유명한 패키지일것
1. typedef 에서 @extends 혹은 @augments 를 사용 할 수 있을것.
1. document coverage

결론부터 말하자면 document coverage 를 포기하고 커스텀 플러그인을 달아서 jsdoc 를 사용하기로 했다.

시도해본것들은 다음과 같다.

* JSDoc
    * template
        * docdash
        * tui-jsdoc-template
    * plugins
        * plugins/markdown
        * typedef-extends (handmade)

* ESDoc
    * template: built in
* ETC
    * inchjs
    * istanbul
    * nyc

제법 긴 시간동안 검색해보았지만 coverage 툴에서 제공하는 documentation 플러그인이나
jsdoc 플러그인중에서 coverage 를 제공하는것은 지금 시점에서는 찾지 못했다.
아, inchjs 라는게 있었는데 실행이 되지 않았고 메인테이닝도 잘 되지 않는것 같았다.
결국 2,3번 요구조건중 하나는 당분간 포기해야 하는데 결국 도큐먼테이션의 본질에 가까운것이 coverage 가 아니기에 jsdoc 으로 선택하였다.

# References
* https://stackoverflow.com/questions/42124012/jsdoc-include-all-properties-from-another-typedef-object
* https://github.com/OpenGeoscience/geojs/blob/master/jsdoc/plugins/typedef_augments.js
*
hard copy of above

``` javascript
/**
 * Define a jsdoc plugin to update typedefs that use augments.
 */
exports.handlers = {
  /**
   * Modify typedefs that use augments (extends).  Add the base typedef's
   * properties to the augmented typedefs.
   */
  parseComplete: function (e) {
    var typedefs = {},
        augmentedTypedefs = {},
        numAugmented = 0;
    /* Make a dictionary of all known typedefs and a dictionary of augmented
     * typedefs */
    e.doclets.forEach(function (doclet) {
      if (doclet.kind === 'typedef') {
        typedefs[doclet.longname] = doclet;
        if (doclet.augments && doclet.augments.length) {
          augmentedTypedefs[doclet.longname] = doclet;
        }
      }
    });
    while (Object.keys(augmentedTypedefs).length !== numAugmented) {
      numAugmented = Object.keys(augmentedTypedefs).length;
      Object.keys(augmentedTypedefs).forEach(function (name) {
        var doclet = augmentedTypedefs[name];
        /* If this typedef is augmented by an augmented typedef, skip it for
         * now.  Ignore self references */
        if (doclet.augments.some(function (augmentName) {
          return augmentName !== name && augmentedTypedefs[augmentName];
        })) {
          return;
        }
        /* Ensure we have properties */
        doclet.properties = doclet.properties || [];
        /* Make a dictionary so we don't clobber known properties. */
        var properties = {};
        doclet.properties.forEach(function (prop) {
          properties[prop.name] = prop;
        });
        /* For each augment base, add its properties if we don't already have
         * them.  If the typedef augments two other typedefs that each have a
         * property of the same name, the last listed will be shown (done by
         * reversing the augments list). */
        doclet.augments.slice().reverse().forEach(function (augmentName) {
          if (augmentName !== name && typedefs[augmentName] && typedefs[augmentName].properties) {
            typedefs[augmentName].properties.forEach(function (origprop) {
              if (!properties[origprop.name]) {
                /* Make a copy so we don't mutate the original property. */
                var prop = Object.assign({}, origprop);
                /* Add a value that a rendering template could use to show that
                 * the property was inherted from a parent.  Since that in turn
                 * could have been inherited, preserve a known value. */
                prop.inherited = prop.inherited || augmentName;
                /* Add the property to the typedef and to the list of known
                 * properties. */
                doclet.properties.push(prop);
                properties[prop.name] = prop;
              }
            });
          }
        });
        /* We've finished processing this typedef, so remove it from the
         * augmented list. */
        delete augmentedTypedefs[name];
      });
    }
  }
};
```
