#!/bin/bash

# Set the title (Note: Terminal title setting might vary between terminals)
echo -ne "\033]0;Server\007"

# Change directory to 'backend'
cd backend

# Run uvicorn with main:app and --reload
uvicorn main:app --reload
