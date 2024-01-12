



class WebSocketClient {
    private websocket: WebSocket | null;

    constructor() {
        this.websocket = null;
    }


    connect(url: string): void {
        

        this.websocket = new WebSocket(url);

        this.websocket.onopen = () => {
            console.log("Websocket client connected to server.")
        }

        this.websocket.onclose = () => {
            console.log("Websocket client closed.")
        }

        this.websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        }
    }


    disconnect(): void {
        if (this.websocket) {
            this.websocket.close();
        } 
    }


    send(message: string): void {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
        } else {
            console.error('WebSocket is not open. Cannot send message.');
        }
    }
}

export default WebSocketClient;