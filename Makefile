.SHELLFLAGS := -e -c
# s'arrete en cas d'erreur

start:
	npm run start:prod

build: 
	npm run build

test:
	npm run test


test-e2e:
	npm run test:e2e


test-all: test test-e2e


clean-build:
	rm -rf ./dist && mkdir ./dist