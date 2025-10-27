@echo off
title Acceta-Test
color 0E

echo ==================================================
echo  Iniciando Acceta-Test Frontend
echo ==================================================
echo.

REM Change to the project directory
cd /d "%~dp0"

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Erro: Node.js nao esta instalado ou nao esta no PATH.
    echo Por favor, instale o Node.js de: https://nodejs.org/
    pause
    exit /b 1
)

echo Instalando dependencias...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Erro ao instalar as dependencias.
    pause
    exit /b 1
)

echo.
echo Iniciando o servidor de desenvolvimento...
echo.

REM Start the development server
call npm run dev

REM This keeps the window open if the command fails
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Ocorreu um erro ao iniciar o servidor de desenvolvimento.
)

echo.
pause