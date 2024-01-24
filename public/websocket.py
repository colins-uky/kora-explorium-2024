#!/usr/bin/python3

import asyncio
import websockets
import serial

ser = serial.Serial('/dev/ttyTHS1', 115200, timeout=0)


async def echo(websocket, path):
    async for message in websocket:
        ser.write(bytes(message, ('utf-8')))
        print(message)



async def main():
    async with websockets.serve(echo, "192.168.1.16", "1235"):
        await asyncio.Future()

asyncio.run(main())