#!/bin/bash

while true; do
    rm /tmp/.X0-lock || true
    startx /app/node_modules/electron-prebuilt/dist/electron /app --enable-logging
done

