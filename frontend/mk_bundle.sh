#! /bin/bash

webpack scripts/main.js scripts/bundle.js --module-bind 'js=babel-loader'
