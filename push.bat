@echo off
setlocal enabledelayedexpansion

set /p commit_message="commit： "

git add .
git commit -m "!commit_message"
git push -u origin main

pause
