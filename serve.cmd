@echo off
rem Preview the website at http://localhost:8000
rem Double-click this file, or run "serve" from this folder. Press Ctrl+C to stop.

setlocal
set PORT=8000
cd /d "%~dp0"

netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul
if not errorlevel 1 (
  echo Port %PORT% is already in use by another program.
  echo Close it, or change PORT at the top of this file.
  pause
  exit /b 1
)

where python >nul 2>nul
if errorlevel 1 (
  echo Python is not installed. Get it from https://www.python.org/downloads/
  pause
  exit /b 1
)

echo Serving %CD% at http://localhost:%PORT%
echo Press Ctrl+C to stop.
start "" http://localhost:%PORT%
python -m http.server %PORT% --bind 127.0.0.1
