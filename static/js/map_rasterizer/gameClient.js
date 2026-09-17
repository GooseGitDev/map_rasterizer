export class GameClient {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.socket = null;
    }

    connect() {
        const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const wsUrl = `${protocol}${window.location.host}/ws`;
        
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            document.getElementById('status').innerText = "Network Engine Status: Secured WebSocket Connected!";
            // Share the handshake access authorization string token down across the active websocket pipeline
            this.socket.send(JSON.stringify({ type: "AUTH", token: window.AUTH_TOKEN }));
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("🎮 Server Package Intercepted:", data);
        };

        this.socket.onclose = () => {
            document.getElementById('status').innerText = "Network Engine Status: Closed Connection Event Pipeline.";
            document.getElementById('status').style.color = "#ff3333";
        };
    }
}
