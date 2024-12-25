@echo off
cd ..
docker-compose -f docker/docker-compose.yml down
echo Docker containers stopped
pause 