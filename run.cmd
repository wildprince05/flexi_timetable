@echo off
set JAVA_HOME=%CD%\jdk17\jdk-17.0.18+8
set PATH=%JAVA_HOME%\bin;%PATH%
.\apache-maven-3.9.6\bin\mvn.cmd clean spring-boot:run
