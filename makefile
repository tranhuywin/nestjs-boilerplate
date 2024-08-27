CWD = $(shell pwd)

up-db:
	@docker compose up -d postgres-db

down:
	@docker compose down
