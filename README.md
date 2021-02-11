## run

- database: postgres
- container: docker

<br/>

Start containers in detached / background mode
- docker-compose up -d

Stop containers
- docker-compose down

View proxy port
- sudo netstat -tlpn

view port mapping
- docker-compose ps

找到使用卷
- docker volume ls

删除使用卷
-  docker volume rm pgdev_db-data pgdev_pgadmin-data