.DEFAULT_GOAL := help
.PHONY: help em em-clean

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[0-9a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

### Build section ###
# TAG ?= :v$(shell date +%Y%m%d%H)
# TAG_STAGE = :stage
# IMG_PREFIX = docker.apiplus.tw/eztogo
# IMG_F2E = $(IMG_PREFIX)-f2e
# IMG_B2E = $(IMG_PREFIX)-b2e
# IMG_SITE_SSR = $(IMG_PREFIX)-ssr
# IMG_SITE = $(IMG_PREFIX)-site
# IMG_MIGRATE = $(IMG_PREFIX)-migrate
# IMGS := $(IMG_F2E)$(TAG) $(IMG_SITE_SSR)$(TAG) $(IMG_B2E)$(TAG) $(IMG_SITE)$(TAG) $(IMG_SITE_SSR)$(TAG) $(IMG_MIGRATE)$(TAG)
# IMGS_EXISTED := $(shell docker image ls --no-trunc --filter=reference='$(IMG_PREFIX)*' --format '{{.Repository}}:{{.Tag}}')

em: ## local emulators with import from firebaseData
	firebase emulators:start --export-on-exit --import firebaseData

em-clean: ## clean emulators
	firebase emulators:start



