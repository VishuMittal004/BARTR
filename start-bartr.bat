@echo off
echo =======================================
echo BARTR Platform - Skill Exchange Platform
echo =======================================
echo.
echo Starting BARTR application...
echo.
echo Once started, the application will be available at:
echo http://localhost:9002
echo.
echo Press Ctrl+C to stop the server when done.
echo.

cd /d "%~dp0"
npm run dev
