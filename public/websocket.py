import asyncio
import websockets

async def echo_server(websocket, path):
    print(f"Client connected: {websocket.remote_address}")

    try:
        async for message in websocket:
            print(f"Received message from {websocket.remote_address}: {message}")
            await websocket.send(f"Server received: {message}")
    except websockets.exceptions.ConnectionClosedError:
        pass
    finally:
        print(f"Client disconnected: {websocket.remote_address}")

start_server = websockets.serve(echo_server, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
print("WebSocket server started on ws://localhost:8765")
asyncio.get_event_loop().run_forever()