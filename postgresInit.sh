#!/bin/bash

brew update
brew install postgresql
brew services start postgresql
createdb postgres_db
psql postgres_db < init.sql