#! /bin/bash

# npm install &&
date

$(TZ=UTC hugo new --kind tech posts/$(node createPost.js $1))
