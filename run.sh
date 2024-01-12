#!/bin/bash

gnome-terminal --tab --title="Server" --command="bash -c 'bash run_scripts/start_server.sh; exec bash'" &
gnome-terminal --tab --title="Client" --command="bash -c 'bash run_scripts/start_client.sh; exec bash'" &