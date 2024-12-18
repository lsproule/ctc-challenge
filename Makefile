BACKEND_DIR=backend

.PHONY: all setup production-db docker-up cleanup

all: setup
#
#production-db:
#	cd $(BACKEND_DIR) && \
#	RAILS_ENV=production rails db:create && \
#	RAILS_ENV=production rails db:migrate && \
#	RAILS_ENV=production rails db:seed && \
#	cd ..

docker-up:
	docker compose up

setup: production-db docker-up

cleanup:
	cd $(BACKEND_DIR) && \
	RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1 rails db:reset && \
	cd ..
	docker compose down

