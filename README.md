NODE version 18.19.1 (node)
YARN version 1.22.19 (yarn)

install project
```
yarn install
```

setup database by running the following command

docker build
```
sudo docker build -t hl-assignment .
```

docker run 
```
docker run -d --name mysql-container -p 3306:3306 hl-assignment
```

start project
```
yarn start
```

When the project is started the database will be seeded with 4 jokes from the documentation

You can access the project on http://localhost:3000/jokes/random to get a random joke

Just have fun and enjoy the jokes

Features:
- [x] Get a random joke by cookie
- [ ] Vote for a joke