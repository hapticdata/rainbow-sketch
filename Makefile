REPORTER ?= list

build:
	node tools/r.js -o tools/app.build.js

test:
	mocha --reporter $(REPORTER) test/*

.PHONY: test
