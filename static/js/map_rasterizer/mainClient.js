// import { GameClient } from './gameClient.js';

// // Setup Supabase Connection parameters inside the application frontend view space
// const SUPABASE_URL = "https://oztxnrrhbrgzzibfolmc.supabase.co";
// const SUPABASE_ANON_KEY = "sb_publishable_umgeh3s19yYT7neVpzxoKw_JQ665XFh";
// const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// window.addEventListener('DOMContentLoaded', async () => {
//     console.log("🚀 Game Application Initialization Engine Triggered");
    
//     // Read user identity details payload attributes directly using the token token key
//     const { data: { user }, error } = await supabase.auth.getUser(window.AUTH_TOKEN);
    
//     const emailBadge = document.getElementById('game-user-email');
//     if (error || !user) {
//         emailBadge.innerText = "Verification Failure";
//         alert("Session Expired or Untrusted Device Identity Status. Returning to Central Security Gateway.");
//         window.location.href = "https://onrender.com";
//         return;
//     }
    
//     // Successfully verified identity! Update layout view structure elements
//     emailBadge.innerText = user.email;

//     // Handle complete structural layout sign-out mechanics directly inside game layout panels
//     document.getElementById('game-logout-btn').addEventListener('click', async () => {
//         await supabase.auth.signOut();
//         window.location.href = "https://onrender.com";
//     });

//     // Fire up Canvas setup procedures
//     const canvas = document.getElementById('gameCanvas');
//     const ctx = canvas.getContext('2d');
    
//     ctx.fillStyle = '#00ffcc';
//     ctx.fillRect(225, 125, 150, 150);
//     ctx.fillStyle = '#000';
//     ctx.font = '14px sans-serif';
//     ctx.fillText('Secure Session Active', 235, 205);

//     // Boot Network Handshake Sequence Loops
//     const game = new GameClient(canvas, ctx);
//     game.connect();
// });











// import { GameClient } from './gameClient.js';

// export function initGame(user) {
//     console.log("🚀 Game Application Initialization Engine Triggered Manually");
    
//     const emailBadge = document.getElementById('game-user-email');
//     if (!user) {
//         emailBadge.innerText = "Verification Failure";
//         return;
//     }
    

    
//     // Successfully verified identity! Update layout view structure elements
//     emailBadge.innerText = user.email;

//     // Handle complete structural layout sign-out mechanics directly inside game layout panels
//     document.getElementById('game-logout-btn').addEventListener('click', async () => {
//         if (window.supabaseClient) {
//             await window.supabaseClient.auth.signOut();
//         }
//         window.location.reload();
//     });

//     // Fire up Canvas setup procedures
//     const canvas = document.getElementById('gameCanvas');
//     const ctx = canvas.getContext('2d');
    
//     ctx.fillStyle = '#00ffcc';
//     ctx.fillRect(225, 125, 150, 150);
//     ctx.fillStyle = '#000';
//     ctx.font = '14px sans-serif';
//     ctx.fillText('Secure Session Active', 235, 205);

//     // Boot Network Handshake Sequence Loops
//     const game = new GameClient(canvas, ctx);
//     game.connect();
// }













import { GameClient } from './gameClient.js';

/**
 * Main game initialization entry point.
 * Controls layout DOM updates, button routing paths, and boots the canvas handshake engine.
 * @param {Object} user - The authenticated user profile object sent down from map_rasterizer.html
 */
export function initGame(user) {
    console.log("🚀 Game Application Initialization Engine Triggered Manually");
    
    // Fetch target DOM UI elements
    const emailBadge = document.getElementById('game-user-email');
    const homeBtn = document.getElementById('return-home-btn');
    const logoutBtn = document.getElementById('game-logout-btn');
    const canvas = document.getElementById('gameCanvas');

    // 1. Dynamic Environment Target Home Path Calculation Loop
    const localHome = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") 
        ? "http://127.0.0.1:8080" 
        : "https://onrender.com";

    // Update the Return Home Hub button layout link so it functions accurately
    if (homeBtn) {
        homeBtn.href = localHome;
    }

    // 2. Strict Authentication Integrity Safety Check
    if (!user) {
        if (emailBadge) {
            emailBadge.innerText = "Verification Failure";
        }
        alert("Session Expired or Untrusted Device Identity Status. Returning to Central Security Gateway.");
        window.location.href = localHome; 
        return;
    }
    
    // Successfully verified identity! Update layout email profile badge container text
    if (emailBadge) {
        emailBadge.innerText = user.email;
    }

    // 3. Central Application Session Sign Out Mechanics Hook
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (emailBadge) emailBadge.innerText = "Signing out...";
            
            // Invoke the master shared global storage clear execution call routines
            if (window.supabaseClient) {
                await window.supabaseClient.auth.signOut();
            }
            
            // Redirect the window workspace cleanly back to your active portal landing port grid
            window.location.href = localHome;
        });
    }

    // 4. Fire up Graphic Canvas Engine Context Layout Procedures
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#00ffcc';
            ctx.fillRect(225, 125, 150, 150);
            ctx.fillStyle = '#000';
            ctx.font = '14px sans-serif';
            ctx.fillText('Secure Session Active', 235, 205);

            // 5. Boot Up Network Handshake Game Pipeline Socket Loops
            const game = new GameClient(canvas, ctx);
            game.connect();
        }
    }
}
