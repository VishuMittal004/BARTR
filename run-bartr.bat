@echo off
title BARTR Application Runner
echo ======================================
echo   BARTR - Swap Your Skills
echo   Project Runner
echo ======================================
echo.
echo This script will start the BARTR application in development mode.
echo The app will be available at http://localhost:9002
echo.
echo Press any key to continue...
pause > nul

echo.
echo Step 1: Installing dependencies (this may take a few minutes)...
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error installing dependencies. Please check your internet connection or try again.
  echo.
  pause
  exit /b 1
)

echo.
echo Step 2: Starting development server...
echo.
echo The application will open in your default browser.
echo Press Ctrl+C in this window to stop the server when you're done.
echo.
start http://localhost:9002
call npm run dev

pause
