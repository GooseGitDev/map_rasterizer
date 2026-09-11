export class GameClient {
    constructor(canvas, context) {
        self.canvas = canvas;
        self.ctx = context;
        self.socket = null;
    }

    connect() {
        // Dynamically choose between ws:// and wss:// based on the deployment environment
        const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const wsUrl = `${protocol}${window.location.host}/ws`;
        
        console.log(`🔌 Attempting connection to: ${wsUrl}`);
        self.socket = new WebSocket(wsUrl);

        self.socket.onopen = () => {
            document.getElementById('status').innerText = "Network Status: Connected!";
            document.getElementById('status').style.color = "#00ffcc";
            
            // Send a handshake test message to the server
            self.socket.send("Hello Server, from GameClient!");
        };

        self.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("🎮 Message received from server:", data);
        };

        self.socket.onclose = () => {
            document.getElementById('status').innerText = "Network Status: Disconnected.";
            document.getElementById('status').style.color = "#ff3333";
        };
    }
}
