---
title: "Https Key Setup"
date: 2021-02-25 12:12:24
draft: true
tags:
-
categories:
-
---

```bash
#login as root
adduser ops         # for non-sudo user
adduser opsudo      # for sudo user
usermod -aG sudo opsudo

#login as sudo user

# Install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

sudo usermod -aG docker opsudo
sudo usermod -aG docker ops

#reboot
sudo reboot now

# install docker-compose
# CAUTION: find new version
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

NETFLIX토이수도*()
NETFLIX옵스*()
