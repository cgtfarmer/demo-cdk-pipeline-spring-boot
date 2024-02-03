FROM maven:3.9.6-amazoncorretto-17 AS demo-cdk-pipeline-spring-boot-deps

ENV LANG=C.UTF-8 \
  APP_HOME=/usr/src/app \
  MAVEN_CONFIG=/root/.m2 \
  MAVEN_BUILD_REPO=/usr/share/maven/ref/repository

WORKDIR $APP_HOME

COPY pom.xml ./

RUN mvn \
  -Dmaven.main.skip \
  -Dmaven.test.skip=true \
  -Dmaven.repo.local=${MAVEN_BUILD_REPO} \
  clean \
  dependency:resolve-plugins

RUN mvn \
  -Dmaven.main.skip \
  -Dmaven.test.skip=true \
  -Dmaven.repo.local=${MAVEN_BUILD_REPO} \
  -Dspring-boot.repackage.skip \
  dependency:go-offline


FROM maven:3.9.6-amazoncorretto-17 AS demo-cdk-pipeline-spring-boot-build

ENV LANG=C.UTF-8 \
  APP_HOME=/usr/src/app \
  MAVEN_CONFIG=/root/.m2 \
  MAVEN_BUILD_REPO=/usr/share/maven/ref/repository

WORKDIR $APP_HOME

COPY --from=demo-cdk-pipeline-spring-boot-deps ${MAVEN_BUILD_REPO} ${MAVEN_BUILD_REPO}

COPY . .

RUN mvn -Dmaven.main.skip \
  -Dmaven.test.skip=true \
  -Dmaven.repo.local=${MAVEN_BUILD_REPO} \
  package


FROM demo-cdk-pipeline-spring-boot-build AS demo-cdk-pipeline-spring-boot-development

ENV LANG=C.UTF-8 \
  APP_HOME=/usr/src/app \
  MAVEN_CONFIG=/root/.m2 \
  MAVEN_BUILD_REPO=/usr/share/maven/ref/repository

CMD mvn spring-boot:run


FROM maven:3.9.6-amazoncorretto-17 AS demo-cdk-pipeline-spring-boot

ENV LANG=C.UTF-8 \
  APP_HOME=/usr/src/app \
  TARGET_DIR=/usr/src/app/target \
  MAVEN_CONFIG=/root/.m2 \
  MAVEN_BUILD_REPO=/usr/share/maven/ref/repository

WORKDIR $APP_HOME

COPY --from=demo-cdk-pipeline-spring-boot-build ${TARGET_DIR}/*.jar ${TARGET_DIR}/

CMD mvn spring-boot:run
