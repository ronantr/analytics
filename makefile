.PHONY: start down restart startdev

start:
	- docker-compose up -d prod database  
	- docker compose up -d prod database  
startdev:
	- docker-compose up -d dev database adminer 
	- docker compose up -d dev database adminer 
down:
	- docker-compose down
	- docker compose down

restart: down start

restartdev: down startdev