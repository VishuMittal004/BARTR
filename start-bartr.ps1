# BARTR - Swap Your Skills - Startup Script
# PowerShell script with visual styling

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Set window title
$host.UI.RawUI.WindowTitle = "BARTR - Swap Your Skills"

# Clear screen
Clear-Host

# Display ASCII art header with BARTR branding
Write-ColorOutput "Cyan" @"
╔══════════════════════════════════════════════════════╗
║                                                      ║
║      ██████╗  █████╗ ██████╗ ████████╗██████╗       ║
║      ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗      ║
║      ██████╔╝███████║██████╔╝   ██║   ██████╔╝      ║
║      ██╔══██╗██╔══██║██╔══██╗   ██║   ██╔══██╗      ║
║      ██████╔╝██║  ██║██║  ██║   ██║   ██║  ██║      ║
║      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝      ║
║                                                      ║
║                Swap Your Skills                      ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
"@

Write-Output "India's premier skill exchange platform"
Write-Output ""
Write-Output "This script will start the BARTR application in development mode."
Write-Output "The application will be available at: http://localhost:9002"
Write-Output ""

# Prompt user to continue
Write-Output "Press Enter to continue..."
Read-Host | Out-Null

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-ColorOutput "Green" "✓ Node.js detected: $nodeVersion"
} catch {
    Write-ColorOutput "Red" "✗ Node.js is not installed or not in PATH!"
    Write-Output "Please install Node.js from https://nodejs.org/ (v18.17 or higher recommended)"
    Write-Output "Press Enter to exit..."
    Read-Host | Out-Null
    exit
}

# Install dependencies
Write-Output ""
Write-ColorOutput "Cyan" "Step 1: Installing dependencies (this may take a few minutes)..."
npm install

if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput "Red" "✗ Error installing dependencies!"
    Write-Output "Please check your internet connection or try again."
    Write-Output "Press Enter to exit..."
    Read-Host | Out-Null
    exit
}

# Start development server
Write-Output ""
Write-ColorOutput "Cyan" "Step 2: Starting development server..."
Write-Output ""
Write-Output "The application will open in your default browser."
Write-Output "Press Ctrl+C in this window to stop the server when you're done."
Write-Output ""

# Open browser
Start-Process "http://localhost:9002"

# Start the Next.js development server
npm run dev
