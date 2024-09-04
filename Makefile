# Variables
IMAGE_NAME=backend-js
CONTAINER_NAME=backend-js-container
DOCKERFILE_PATH=Dockerfile

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) -f $(DOCKERFILE_PATH) --network host .
	docker tag backend-js:latest 975050129791.dkr.ecr.ap-southeast-3.amazonaws.com/elastic-demo/backend-js:latest
	docker push 975050129791.dkr.ecr.ap-southeast-3.amazonaws.com/elastic-demo/backend-js:latest

# Run the Docker container
run:
	docker run --name $(CONTAINER_NAME) -p 3000:3000 $(IMAGE_NAME)

run-dev:
	docker run --name $(CONTAINER_NAME) -p 3000:3000 $(IMAGE_NAME) -e NODE_ENV=production -e APP_ID=backend-1 -e API_NEXT_BACKEND=http backend-js

# Clean up Docker image and container
clean:
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true