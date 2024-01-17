#!/usr/bin/python3

import asyncio
import websockets
import serial

ser = serial.Serial('/dev/ttyACM0', 115200, timeout=0)

async def on_connect(websocket, path):
    print(f"Client connected: {websocket.remote_address}")

async def on_disconnect(websocket, close_status, close_msg):
    print(f"Client disconnected: {websocket.remote_address}")

async def echo(websocket, path):
    print(f"Client connected: {websocket.remote_address}")
    try:
        async for message in websocket:
            ser.write(bytes(message, 'utf-8'))
            print(message)
            await websocket.send(message)
    finally:
        print(f"Client disconnected: {websocket.remote_address}")

async def main():
    server = await websockets.serve(
        echo, "192.168.1.16", 1234,
        process_request=on_connect,  # Called when a client connects
        process_response=on_disconnect  # Called when a client disconnects
    )
    await server.wait_closed()

asyncio.run(main())