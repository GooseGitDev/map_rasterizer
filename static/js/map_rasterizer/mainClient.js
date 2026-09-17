import { GameClient } from './gameClient.js';

// Setup Supabase Connection parameters inside the application frontend view space
const SUPABASE_URL = "https://oztxnrrhbrgzzibfolmc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_umgeh3s19yYT7neVpzxoKw_JQ665XFh";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Game Application Initialization Engine Triggered");
    
    // Read user identity details payload attributes directly using the token token key
    const { data: { user }, error } = await supabase.auth.getUser(window.AUTH_TOKEN);
    
    const emailBadge = document.getElementById('game-user-email');
    if (error || !user) {
        emailBadge.innerText = "Verification Failure";
        alert("Session Expired or Untrusted Device Identity Status. Returning to Central Security Gateway.");
        window.location.href = "https://onrender.com";
        return;
    }
    
    // Successfully verified identity! Update layout view structure elements
    emailBadge.innerText = user.email;

    // Handle complete structural layout sign-out mechanics directly inside game layout panels
    document.getElementById('game-logout-btn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = "https://onrender.com";
    });

    // Fire up Canvas setup procedures
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(225, 125, 150, 150);
    ctx.fillStyle = '#000';
    ctx.font = '14px sans-serif';
    ctx.fillText('Secure Session Active', 235, 205);

    // Boot Network Handshake Sequence Loops
    const game = new GameClient(canvas, ctx);
    game.connect();
});
