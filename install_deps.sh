#!/bin/bash

echo "Installing npm dependencies in frontend and root (backend) directories"

cd frontend
npm install
cd ..
npm install