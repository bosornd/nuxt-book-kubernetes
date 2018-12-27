# nuxt-book-kubernetes
## book-db-api

### build docker image
$ docker build -t book-db-api:v1 .

### deploy book-db-api on Kubernetes (minikube)
$ kubectl apply -f book-db-api.yaml
