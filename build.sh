#!/bin/bash

docker build -t hub.webstoryz.net:5000/loans-frontend:latest .
docker push hub.webstoryz.net:5000/loans-frontend:latest

