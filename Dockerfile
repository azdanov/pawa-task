FROM openjdk:12
COPY . /usr/src/pawaTask
WORKDIR /usr/src/pawaTask

RUN ./gradlew build -x test
CMD [ "./gradlew", "bootRun" ]

#ENTRYPOINT ["java", "-jar", "./build/libs/pawa-task-1.0.0-SNAPSHOT.jar"]

