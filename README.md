# pawaTask

<small>A simple todo list application that keeps track of your time.</small>

<table>
    <thead>
        <tr>
            <th colspan="3">Screenshots</th>
        </tr>
    </thead>
    <tbody>
        <tr valign="top">
            <td><img src="./screenshots/1.png"></a></td>
            <td><img src="./screenshots/2.png"></a></td>
            <td><img src="./screenshots/3.png"></a></td>
        </tr>
    </tbody>
</table>

## How To

* To access the application go to: http://localhost:8080/.
* For API interactions use: http://localhost:8080/api/tasks and http://localhost:8080/api/messages.
* A quick API tour is available in [src/rest.http](src/rest.http).
* Database is automatically initialized and seeded. For production this needs to be disabled.
* Gradle should build and pack the frontend assets in `static` folder.
* It is possible that you will have to manually initialize the database. To do this use [init.sql](src/main/resources/init.sql) inside `main/resources`.

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

## Commentary

* More robust error handling to prevent security related information leakage.
* Better validation/sanitization of input and proper response messages.
* Better Gradle settings.
* Write tests to make changes easier.
* Host on Heroku for showcase.
* Add security layer and associate each user with own tasks.
* Use Spring Rest Starter to remove boilerplate, similar to JpaRepositories.
* Have an easier way to develop on different platforms by using Docker.
* Simpler way to develop sql schemas with migrations and seeding of the database with fake data.
* Use Enum types for priority, e.g https://vladmihalcea.com/the-best-way-to-map-an-enum-type-with-jpa-and-hibernate/
