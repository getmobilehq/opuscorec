.PHONY: help install dev db-up db-down db-reset db-migrate db-studio clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	npm install

dev: ## Start development servers
	docker-compose up -d postgres redis
	@echo "Waiting for database to be ready..."
	@sleep 5
	npm run db:generate
	npm run db:migrate
	npm run dev:api

db-up: ## Start database services
	docker-compose up -d postgres redis

db-down: ## Stop database services
	docker-compose down

db-reset: ## Reset database (WARNING: Deletes all data)
	docker-compose down -v
	docker-compose up -d postgres redis
	@sleep 5
	npm run db:generate
	npm run db:migrate

db-migrate: ## Run database migrations
	npm run db:migrate

db-studio: ## Open Prisma Studio
	npm run db:studio

clean: ## Clean all build artifacts and dependencies
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/dist
	rm -rf apps/*/.next
	docker-compose down -v

build: ## Build all applications
	npm run build

test: ## Run all tests
	npm test

lint: ## Lint all code
	npm run lint
