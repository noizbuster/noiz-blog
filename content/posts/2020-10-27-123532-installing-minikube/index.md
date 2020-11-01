---
title: "개발보조 목적의 Minikube 설치 및 설정"
date: 2020-10-27 12:35:32
tags:
- k8s
- kubernetes
- minikube
- docker
categories:
- development
---

# Minikube

로컬환경에서 kubernetes 환경을 간단하게 세팅해서 개발에 활용 할 수 있는 minikube 의 설치방법에 대해 짧게 다뤄보도록 하겠다.

[Minikube Installation Guide](https://minikube.sigs.k8s.io/docs/start/)

## 1. install
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb
minikube start
```

## 2. configuration
`alias kubectl="minikube kubectl --"` 를 bashrc 나 zshrc 등 사용하는 쉘에 alias 로 추가

`source ~/.zshrc` 로 로드하거나 새 터미널을 열고

`kubectl get po -A` 로 동작 확인
