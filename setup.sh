#!/bin/bash

clear

echo "======================================"
echo "      Mini Projects Collection"
echo "======================================"
echo
echo "1. JSON REST"
echo "2. FS REST"
echo "3. Mongoose REST"
echo

read -p "Enter your choice (1-3): " choice

case $choice in
    1) PROJECT="json-rest" ;;
    2) PROJECT="fs-rest" ;;
    3)
    PROJECT="mongoose-rest"

    echo
    echo "Checking MongoDB..."

    if ! command -v mongod >/dev/null 2>&1; then
        echo "MongoDB is not installed."
        echo
        echo "Download it from:"
        echo "https://www.mongodb.com/try/download/community"
        exit 1
    fi

    if ! nc -z localhost 27017 >/dev/null 2>&1; then
        echo "MongoDB is installed but not running."
        echo

        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "Run:"
            echo "brew services start mongodb-community"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            echo "Run:"
            echo "sudo systemctl start mongod"
        elif command -v powershell.exe >/dev/null 2>&1; then
            echo "Run (PowerShell as Administrator):"
            echo "net start MongoDB"
        fi

        exit 1
    fi

    echo "MongoDB is running."
    ;;
    *) echo "Invalid choice!"; exit 1 ;;
esac

cd "$PROJECT" || exit 1

echo
echo "Installing dependencies..."
npm install

echo
echo "Starting server..."

npx nodemon index.js &
SERVER_PID=$!

until curl -s http://localhost:8080 >/dev/null; do
    sleep 1
done

if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8080
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:8080
elif command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe Start-Process "http://localhost:8080"
elif command -v cmd.exe >/dev/null 2>&1; then
    cmd.exe /c start http://localhost:8080
fi

wait $SERVER_PID