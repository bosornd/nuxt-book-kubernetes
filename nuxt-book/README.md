# nuxt-book

> Nuxt.js + Vuetify.js project

## Build Setup

```
C:\nuxt-book-kubernetes\nuxt-book> docker build -t nuxt-book:v1 .
C:\nuxt-book-kubernetes\nuxt-book> kubectl apply -f nuxt-book.yaml
```

## Nuxt on kubernetes
```
npm run start를 하면 기본적으로 localhost:3000으로 서버가 구동되는데,
이렇게 서버를 구동하면 다른 서버에서 접근이 안됨.
NUXT_HOST=0.0.0.0 nuxt start로 구동해야 함(package.json 참조)
```
