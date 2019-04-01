
---

title:  fixing-atom-and-idea-file-refresh-issue

author: noizbuster

date:   2017-01-09 14:05:17

categories: development

tags: [linux, atom, webstorm, idea]

---
# Fixing limit of watch issue

* `sudo vi /etc/sysctl.d/max_user_watches.conf`
* write `fs.inotify.max_user_watches = 524288` the file
* `sudo sysctl -p --system`
* restart atom or idea

# Reference
* https://github.com/atom/atom/blob/master/docs/build-instructions/linux.md#typeerror-unable-to-watch-path
* https://confluence.jetbrains.com/display/IDEADEV/Inotify+Watches+Limit
