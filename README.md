# nuxt-book-kubernetes

> Nuxt.js + Vuetify.js project
> Express.js
> Mongo DB


# build

cd book-db
docker build -t book-db-api:v1 .

cd user-db
docker build -t user-db-api:v1 .

cd nuxt-book
docker build -t nuxt-book:v1 .

# deploy on kubernetes

kubectl apply -f book-db\book-db-api.yaml
kubectl apply -f user-db\user-db-api.yaml
kubectl apply -f nuxt-book\nuxt-book.yaml

book-db나 user-db 서비스가 생성되기 전에,
book-db-api, user-db-api pod가 시작되면
db 서버에 연결되지 않는 문제가 발생할 수 있다.
POD를 삭제해서 다시 시동하도록 해주면 동작한다.^^
