@echo off
setlocal
set /p commit_message="请输入 commit 信息: "

git add .
git commit -m "%commit_message%"
git push -u origin main

pause
