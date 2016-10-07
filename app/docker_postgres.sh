#! /bin/bash

docker run -d --name epf-postgres \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_USER=epfUser \
    -e POSTGRES_DB=epfDb \
    -p 5432:5432 \
    postgres:9.5.4




