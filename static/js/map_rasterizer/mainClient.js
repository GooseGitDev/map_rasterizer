

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
        : "https://landing-page-xlpu.onrender.com";

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
            
            // Immediately notify UI to prevent user from clicking links during cleanup loops
            if (emailBadge) emailBadge.innerText = "Cleaning system pipeline...";
            
            try {
                // Drop session permissions globally via Supabase's local controller definition block
                if (window.supabaseClient) {
                    await window.supabaseClient.auth.signOut();
                }
            } catch (err) {
                console.warn("Storage sequence skipped or unmapped during network dump:", err);
            }
            
            // Clear all session cache keys bound to this project's origin domain
            localStorage.clear();
            sessionStorage.clear();
            
            // Force break history allocation by shooting straight home with the logout parameter
            window.location.replace(localHome + "?action=logout");
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
