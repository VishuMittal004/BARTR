@echo off
color 0A
cls
echo ================================================================
echo                       BARTR PLATFORM LAUNCHER                   
echo                  Skill Exchange Platform for India              
echo ================================================================
echo.
echo Starting BARTR application...
echo.
echo [1] Starting the server...

cd /d "%~dp0"
start cmd /k "npm run dev"

echo [2] Waiting for server to start...
timeout /t 5 /nobreak > nul

echo [3] Opening in your browser...
start http://localhost:9002

echo.
echo ================================================================
echo BARTR Platform is now running at: http://localhost:9002
echo.
echo To stop the server, close the Node.js command window.
echo ================================================================
echo.
echo Press any key to exit this launcher...
pause > nul
