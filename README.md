# pawaTask

<small>A simple todo list application that keeps track of your time.</small>

## How To

To access the application go to: http://localhost:8080/.

For API interactions use: http://localhost:8080/api/tasks and http://localhost:8080/api/messages.

It is possible that you will have to manually initialize the database. To do this use [init.sql](src/main/resources/init.sql) inside `main/resources`.

### Run

```bash
git clone https://github.com/azdanov/pawa-task

cd pawa-task

./gradlew bootRun
```

### Build

```bash
./gradlew clean

./gradlew build

java -jar ./build/libs/pawa-task-1.0.0-SNAPSHOT.jar
```

### Develop

It is possible to use Hot Reloading with Vue.js. First start the Spring Boot app and then inside `frontend` run:

```bash
npm run serve
```
