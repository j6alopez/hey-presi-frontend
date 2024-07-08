#!/bin/bash

ng update \
  @angular-devkit/build-angular@^18 \
  @angular/cli@^18 \
  @angular/compiler-cli@^18 \
  @angular/localize@^18 \
&& npm install
