#!/bin/bash
git pull origin main
cd docs
npm run build
cd ..
cd home
npm run build
npm run export
cd ..
sudo nginx -s reload
