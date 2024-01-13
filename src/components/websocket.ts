
import { Dispatch, SetStateAction } from "react";


class WebSocketClient {
    private websocket: WebSocket | null;
    private setIsError: Dispatch<SetStateAction<boolean>>;

    public isConnected: boolean;

    constructor(setError: Dispatch<SetStateAction<boolean>>) {
        this.websocket = null;
        this.isConnected = false;
        this.setIsError = setError;
    }


    connect(url: string): void {
        
        
        this.websocket = new WebSocket(url);

        this.websocket.onopen = () => {
            console.log("Websocket client connected to server.")
            
        }

        this.websocket.onclose = () => {
            console.log("Websocket client closed.")
            this.isConnected = false;
        }

        this.websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.isConnected = false;
            this.setIsError(true)
        }

        this.isConnected = true;
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