---
title: "{{ replace (replaceRE "^....-..-..-......-(.*)" "$1" .Name) "-" " " | title }}"
date: {{ dateFormat "2006-01-02-150405" .Date }}
draft: true
tags:
-
categories:
-
---
