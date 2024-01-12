#!/bin/bash

# Set the title (Note: Terminal title setting might vary between terminals)
echo -ne "\033]0;Client\007"

# Change directory to 'front-end-web'
cd front-end-web

# Run npm start
npm start
