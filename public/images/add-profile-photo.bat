@echo off
echo ========================================
echo    Portfolio Profile Photo Setup
echo ========================================
echo.
echo This script will help you add your profile photo to the portfolio.
echo.
echo Instructions:
echo 1. Copy your profile photo to this folder
echo 2. Rename it to 'profile.jpg'
echo 3. Make sure it's a square image (1:1 ratio) for best results
echo.
echo Current folder: %cd%
echo.
echo Supported formats: JPG, PNG, WebP
echo Recommended size: 400x400 pixels or larger
echo.
echo Press any key to open this folder in Windows Explorer...
pause >nul
explorer .
echo.
echo After adding your photo, refresh your portfolio in the browser!
echo.
pause
