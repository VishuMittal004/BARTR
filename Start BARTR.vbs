' Start BARTR.vbs - Improved launcher for BARTR Platform
Option Explicit

' Configuration
Const PROJECT_PATH = "c:\Users\vishu\Downloads\bartr frontend"
Const APP_URL = "http://localhost:9002"

' Display startup message
MsgBox "Starting BARTR Platform..." & vbCrLf & vbCrLf & _
       "The application will open in your browser at:" & vbCrLf & _
       APP_URL, 64, "BARTR Platform"

' Create shell objects
Dim WshShell
Set WshShell = CreateObject("WScript.Shell")

' Change to project directory and run the command
WshShell.CurrentDirectory = PROJECT_PATH
WshShell.Run "cmd.exe /k cd " & PROJECT_PATH & " && npm run dev", 1, False

' Wait for server to start
WScript.Sleep 5000

' Open the browser
WshShell.Run APP_URL

' Clean up
Set WshShell = Nothing
