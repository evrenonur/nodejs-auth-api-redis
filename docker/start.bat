@echo off
cd ..
docker-compose -f docker/docker-compose.yml up -d
echo Docker containers started
timeout /t 5
docker ps
pause 