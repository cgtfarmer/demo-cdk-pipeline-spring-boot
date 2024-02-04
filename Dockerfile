# FROM maven:3.9.6-amazoncorretto-17-al2023 AS maven17-npm20
FROM maven:3.9.6-amazoncorretto-17-al2023 AS demo-cdk-pipeline-spring-boot

ENV LANG=C.UTF-8 \
  APP_HOME=/usr/src/app \
  MAVEN_CONFIG=/root/.m2

WORKDIR $APP_HOME

RUN curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -

RUN yum install -y nodejs

COPY package.json package-lock.json ./

RUN npm install

COPY pom.xml ./

RUN mvn \
  -Dmaven.main.skip \
  -Dmaven.test.skip=true \
  clean \
  dependency:resolve-plugins

RUN mvn \
  -Dmaven.main.skip \
  -Dmaven.test.skip=true \
  -Dspring-boot.repackage.skip \
  dependency:go-offline

COPY src ./src

RUN mvn -Dmaven.main.skip \
  -Dmaven.test.skip=true \
  -Dspring-boot.repackage.skip \
  package

COPY playwright.config.js playwright.config.js

COPY playwright ./playwright

CMD mvn spring-boot:run
