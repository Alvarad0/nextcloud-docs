#!/usr/bin/env sh
set -e
npm run docs:build
cd docs/.vitepress/dist

git add -A
git commit -m 'deploy'
git push -f https://github.com/Alvarad0/nextcloud-docs.git main:gh-pages cd -