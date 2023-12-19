#!/bin/bash

echo "Build script"

cd frontend
npm install
cd ..
npm install
npm run build:ui