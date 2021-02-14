## Base operating environment

Required operating environment
- framework: nestjs
- language: typescript
- database: postgres
- container: docker

Install operating environment
- docker https://docs.docker.com/get-docker/


## Start the docker environment

Start containers in detached / background mode
- docker-compose up -d

Stop containers
- docker-compose down

View proxy port
- sudo netstat -tlpn

view port mapping
- docker-compose ps

Find use volume
- docker volume ls

Delete used volume
-  docker volume rm pgdev_db-data pgdev_pgadmin-data