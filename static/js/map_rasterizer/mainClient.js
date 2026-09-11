import { GameClient } from './gameClient.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Main Client Initialized");
    
    // Initialize the canvas context
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw a placeholder block so we know the canvas works
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('Canvas Active', 60, 110);

    // Start the game client connection
    const game = new GameClient(canvas, ctx);
    game.connect();
});
