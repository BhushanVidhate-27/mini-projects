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
    3) PROJECT="mongoose-rest" ;;
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