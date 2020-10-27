---
title: "Kotlin Jvm Library"
date: 2020-01-09 06:54:09
tags:
- kotlin
- jvm
- junit
categories:
- development
---

Kotlin 으로 JVM Library 만들기


## 1. Gradle 로 Kotlin 프로젝트 생성

```bash
mkdir kotlin-jvm-lib
cd kotlin-jvm-lib 
gradle init
```

```
Welcome to Gradle 6.0.1!

Here are the highlights of this release:
 - Substantial improvements in dependency management, including
   - Publishing Gradle Module Metadata in addition to pom.xml
   - Advanced control of transitive versions
   - Support for optional features and dependencies
   - Rules to tweak published metadata
 - Support for Java 13
 - Faster incremental Java and Groovy compilation
 - New Zinc compiler for Scala
 - VS2019 support
 - Support for Gradle Enterprise plugin 3.0

For more details see https://docs.gradle.org/6.0.1/release-notes.html

Starting a Gradle Daemon, 2 incompatible Daemons could not be reused, use --status for details

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 3

Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6] 4

Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Kotlin) [1..2] 2

Project name (default: kotlin-jvm-lib): my-library
Source package (default: kotlin.jvm.lib): com.myDomain.myGroup

BUILD SUCCESSFUL in 39s
2 actionable tasks: 2 executed
```

이렇게 프로젝트를 초기화 하면 정형화된 디렉토리 구조와 gradle 빌드환경 구성이 제공됩니다.

추가적으로 JUnit을 이용한 테스트도 함께 구성됩니다.

## 2. 문서화를 위한 Dokka 설정

https://github.com/Kotlin/dokka 의 README 를 참고하여 `build.gradle.kts` 파일을 설정합니다.

아래와 같이 plugin에 `id("org.jetbrains.dokka") version "0.10.0"` 를 추가합니다.
```kotlin
plugins {
    // Apply the Kotlin JVM plugin to add support for Kotlin.
    id("org.jetbrains.kotlin.jvm") version "1.3.41"
    id("org.jetbrains.dokka") version "0.10.0"

    // Apply the java-library plugin for API and implementation separation.
    `java-library`
}
```

dokka를 설정합니다

```kotlin
import org.jetbrains.dokka.gradle.DokkaTask
```
```kotlin
tasks {
    val dokka by getting(DokkaTask::class) {
        outputFormat = "javadoc"
        outputDirectory = "$buildDir/dokka"
    }
}
```

`gradle dokka` 명령어를 통해서 문서를 빌드하면 `/build/dokka/index.html` 를 열어서 문서를 확인 할 수 있습니다.  
만약 outputFormat을 다른것으로 지정하면 역시 `/build/dokka/` 디렉토리 아래 결과물이 생성됩니다.
