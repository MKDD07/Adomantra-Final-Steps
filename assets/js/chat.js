/**
 * Adomantra AI Chatbot
 * Powered by Groq API — strictly scoped to adomantra.com content
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────── */
  const GROQ_API_KEY = ''; // Provide your Groq API Key here
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const MODEL = 'llama-3.3-70b-versatile';
  const SYSTEM_PROMPT = `You are the official AI assistant for Adomantra (adomantra.com) — an award-winning digital advertising agency based in New Delhi, India.

Your role: Answer and request for what may i help your and from your side question asked by client should be small and natural tone and not always talk about adomantra's only questions related to Adomantra's services, team, achievements, contact info, and digital marketing topics they specialise in and dont use "**".

Key facts about Adomantra:
- Full name: Adomantra Digital India Pvt Ltd
- Website: https://www.adomantra.com/
- Address: 3rd Floor, Tower-1, Plot No. 48, Rama Rd, Industrial Area, Najafgarh Road Industrial Area, New Delhi – 110015
- Email: connect@adomantra.com | info@adomantra.com
- Phone: +91-9650706427
- Social: Facebook, Instagram, LinkedIn, Twitter (@adomantra1)
- Rating: 4.4 stars from 52 reviews
- Founded: 13+ years ago (ISO-certified)
- Working hours: Mon–Fri, 09:30 AM – 6:30 PM IST

Core services:
1. Programmatic Advertising & CTV Advertising
2. Performance Marketing (PPC, Google Ads, Meta Ads)
3. SEO Services (organic search growth)
4. Social Media Marketing & Optimization (SMO)
5. Display & Rich Media Advertising
6. DV360 & Amazon DSP Campaigns
7. UI/UX Design & Web Development
8. Branding & Creative Design
9. Digital Strategy & Consulting

Key stats:
- 500+ Happy Clients
- 20+ Industry Verticals
- 400+ Active Campaigns
- 100B+ Monthly Impressions
- 800M+ Monthly Clicks
- 1B+ Monthly Video Views

Team:
- Mohit — Graphics Designer & Video Editor
- Deepak — SEO Expert & Digital Marketing Expert
- Annie — Content Writer
- Harshita — Creative Content & Social Media
- Shubham — Programmatic Manager
- Naman — Media Buyer
- Nupur — SEO Expert & Digital Marketing Expert
- Simran — Media Buyer

FAQ:
Q1: What does Adomantra specialize in?
A: Adomantra specializes in performance marketing, programmatic advertising, SEO, social media marketing, and creative digital campaigns.

Q2: How can I contact Adomantra?
A: Email connect@adomantra.com or info@adomantra.com, or call +91-9650706427. Office hours: Mon–Fri, 09:30 AM – 6:30 PM IST.

Q3: Where is Adomantra located?
A: 3rd Floor, Tower-1, Plot No. 48, Rama Rd, Industrial Area, Najafgarh Road, New Delhi – 110015.

Q4: Does Adomantra handle large-scale campaigns?
A: Yes — 400+ active campaigns across Google, Meta, DV360, and Amazon DSP with 100B+ monthly impressions.

Q5: What makes Adomantra different?
A: Data-driven strategy + advanced ad-tech + creative execution = measurable business growth for 500+ clients.

Q6: Can Adomantra help with SEO and web development?
A: Yes, they offer full SEO services, UI/UX design, and web development to improve both rankings and user experience.

Rules:
- Keep answers SHORT (2–4 sentences max).
- Only answer Adomantra or digital-marketing related queries.
- Be friendly, professional, and brand-aligned.
- For contact/sales queries direct users to contact@adomantra.com or the Contact page.`;

  /* ─────────────────────────────────────────
     1. INJECT CSS
  ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.id = 'adomantra-chatbot-css';
  style.textContent = `
  /* ── Variables ── */
  #ado-chatbot-root {
    --ado-primary: #1257A2;
    --ado-primary-dark: #0D3F76;
    --ado-accent: #FF8427;
    --ado-white: #ffffff;
    --ado-surface: #f8fafc;
    --ado-black: #0f172a;
    --ado-gray-light: #f1f5f9;
    --ado-gray-border: rgba(18, 87, 162, 0.12);
    --ado-text-muted: #64748b;
    --ado-green: #22c55e;
    font-family: 'Google Sans Text', 'Google Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* ── FAB Button ── */
  #ado-chat-fab {
    position: fixed;
    bottom: 40px;
    right: 84px;
    z-index: 99999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--ado-primary), var(--ado-primary-dark));
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(18, 87, 162, 0.4);
    color: #fff;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    outline: none;
  }
  #ado-chat-fab:hover {
    transform: scale(1.08);
    box-shadow: 0 14px 36px rgba(18, 87, 162, 0.5);
  }
  #ado-chat-fab i {
    font-size: 20px;
    position: absolute;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  #ado-chat-fab .ado-icon-chat  { opacity: 1; transform: rotate(0deg) scale(1); }
  #ado-chat-fab .ado-icon-close { opacity: 0; transform: rotate(-90deg) scale(0.6); }
  #ado-chat-fab.open .ado-icon-chat  { opacity: 0; transform: rotate(90deg) scale(0.6); }
  #ado-chat-fab.open .ado-icon-close { opacity: 1; transform: rotate(0deg) scale(1); }

  /* Pulse ring */
  #ado-chat-fab::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid rgba(18, 87, 162, 0.4);
    animation: ado-pulse 2.4s ease-out infinite;
    pointer-events: none;
  }
  @keyframes ado-pulse {
    0%   { transform: scale(1);   opacity: 0.8; }
    70%  { transform: scale(1.4); opacity: 0; }
    100% { transform: scale(1.4); opacity: 0; }
  }

  /* ── Chat Window (Desktop) ── */
  #ado-chat-window {
    position: fixed;
    bottom: 96px;
    right: 28px;
    z-index: 99998;
    width: 385px;
    max-height: 620px;
    height: 82vh;
    border-radius: 24px;
    background: #ffffff;
    border: 1px solid rgba(18, 87, 162, 0.12);
    box-shadow: 0 20px 50px rgba(18, 87, 162, 0.18), 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px) scale(0.96);
    transform-origin: bottom right;
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
  }
  #ado-chat-window.visible {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0) scale(1);
  }

  /* Header */
  .ado-chat-header {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--ado-primary) 0%, var(--ado-primary-dark) 100%);
    color: #ffffff;
  }
  .ado-chat-header-main {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }
  .ado-chat-header-avatar {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #ffffff;
    flex-shrink: 0;
  }
  .ado-chat-header-info { flex: 1; min-width: 0; }
  .ado-chat-header-info h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  .ado-chat-header-info span {
    font-size: 11.5px;
    color: rgba(255, 255, 255, 0.82);
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 3px;
  }
  .ado-online-dot {
    width: 7px;
    height: 7px;
    background: #22c55e;
    box-shadow: 0 0 6px #22c55e;
    border-radius: 50%;
    display: inline-block;
    animation: ado-blink 1.8s ease infinite;
  }
  @keyframes ado-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .ado-chat-close-btn {
    background: rgba(255, 255, 255, 0.14);
    border: none;
    color: #ffffff;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .ado-chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.06);
  }

  /* Messages scroll area */
  .ado-chat-messages {
    flex: 1;
    overflow-y: auto;
    background: #ffffff;
    scrollbar-width: thin;
    scrollbar-color: rgba(18, 87, 162, 0.2) transparent;
  }
  .ado-chat-messages::-webkit-scrollbar { width: 4px; }
  .ado-chat-messages::-webkit-scrollbar-thumb { background: rgba(18, 87, 162, 0.2); border-radius: 4px; }

  /* Welcome area */
  .ado-welcome-area { padding: 20px 18px; }
  .ado-welcome-area h3 {
    margin: 0 0 4px;
    font-size: 17px;
    font-weight: 500;
    color: var(--ado-black);
    letter-spacing: -0.01em;
  }
  .ado-welcome-area > p {
    font-size: 13px;
    color: var(--ado-text-muted);
    margin: 0 0 16px;
    line-height: 1.45;
  }

  /* Feature cards grid */
  .ado-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }
  .ado-feature-item {
    padding: 14px 12px;
    border: 1px solid rgba(18, 87, 162, 0.1);
    border-radius: 14px;
    cursor: pointer;
    background: #f8fafc;
    text-align: left;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .ado-feature-item:hover {
    border-color: var(--ado-primary);
    background: rgba(18, 87, 162, 0.04);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(18, 87, 162, 0.08);
  }
  .ado-feature-item i {
    font-size: 16px;
    color: var(--ado-primary);
  }
  .ado-feature-item span {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--ado-black);
  }

  /* Suggested questions */
  .ado-section-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--ado-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 10px;
  }
  .ado-question-prompt {
    width: 100%;
    text-align: left;
    padding: 10px 14px;
    background: #f8fafc;
    border: 1px solid rgba(18, 87, 162, 0.08);
    border-radius: 10px;
    font-size: 13px;
    color: var(--ado-black);
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ado-question-prompt::after {
    content: '→';
    font-size: 13px;
    color: var(--ado-primary);
    opacity: 0.6;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  .ado-question-prompt:hover {
    background: #ffffff;
    border-color: var(--ado-primary);
    color: var(--ado-primary);
    transform: translateX(3px);
  }
  .ado-question-prompt:hover::after {
    opacity: 1;
    transform: translateX(2px);
  }

  /* Chat conversation bubbles */
  .ado-conversation { padding: 14px 18px; display: flex; flex-direction: column; gap: 12px; }

  .ado-msg {
    display: flex;
    gap: 8px;
    animation: ado-msg-in 0.28s cubic-bezier(0.34,1.2,0.64,1) both;
  }
  @keyframes ado-msg-in {
    from { opacity: 0; transform: translateY(8px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .ado-msg.user { flex-direction: row-reverse; align-items: flex-end; }

  .ado-bot-mini {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(18, 87, 162, 0.1);
    border: 1px solid rgba(18, 87, 162, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: var(--ado-primary);
    flex-shrink: 0;
  }

  .ado-bubble {
    max-width: 82%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.55;
    word-break: break-word;
    font-family: inherit;
  }
  .ado-msg.bot .ado-bubble {
    background: #f1f5f9;
    color: var(--ado-black);
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-bottom-left-radius: 4px;
  }
  .ado-msg.user .ado-bubble {
    background: linear-gradient(135deg, var(--ado-primary), var(--ado-primary-dark));
    color: #ffffff;
    border-bottom-right-radius: 4px;
    box-shadow: 0 4px 12px rgba(18, 87, 162, 0.25);
  }

  /* Typing indicator */
  .ado-typing-dots {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 14px;
    background: #f1f5f9;
    border-radius: 14px;
    border-bottom-left-radius: 4px;
    width: fit-content;
  }
  .ado-typing-dots span {
    width: 6px;
    height: 6px;
    background: var(--ado-primary);
    border-radius: 50%;
    animation: ado-bounce 1.2s ease infinite;
    opacity: 0.7;
  }
  .ado-typing-dots span:nth-child(2) { animation-delay: 0.18s; }
  .ado-typing-dots span:nth-child(3) { animation-delay: 0.36s; }
  @keyframes ado-bounce {
    0%,80%,100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
  }

  /* Input area */
  .ado-chat-input-area {
    padding: 12px 16px;
    border-top: 1px solid rgba(18, 87, 162, 0.08);
    display: flex;
    gap: 8px;
    align-items: flex-end;
    background: #ffffff;
    flex-shrink: 0;
  }
  #ado-chat-input {
    flex: 1;
    border: 1px solid rgba(18, 87, 162, 0.15);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 13.5px;
    font-family: inherit;
    resize: none;
    outline: none;
    line-height: 1.45;
    max-height: 90px;
    min-height: 40px;
    background: #f8fafc;
    color: var(--ado-black);
    transition: border-color 0.2s, background 0.2s;
  }
  #ado-chat-input:focus {
    border-color: var(--ado-primary);
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(18, 87, 162, 0.1);
  }
  #ado-chat-input::placeholder { color: #94a3b8; }

  #ado-chat-send {
    background: linear-gradient(135deg, var(--ado-primary), var(--ado-primary-dark));
    color: #fff;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 14px;
    transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 12px rgba(18, 87, 162, 0.3);
  }
  #ado-chat-send:hover   { transform: scale(1.05); box-shadow: 0 6px 16px rgba(18, 87, 162, 0.4); }
  #ado-chat-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

  /* Footer */
  .ado-chat-footer {
    text-align: center;
    padding: 8px 12px;
    font-size: 11px;
    color: var(--ado-text-muted);
    border-top: 1px solid rgba(18, 87, 162, 0.06);
    flex-shrink: 0;
    background: #f8fafc;
  }
  .ado-chat-footer a {
    color: var(--ado-primary);
    text-decoration: none;
    font-weight: 600;
  }
  .ado-chat-footer a:hover { text-decoration: underline; }

  /* =========================================================
     MOBILE (< 576px) — SLIDE UP FROM BOTTOM (BOTTOM SHEET STYLE)
     ========================================================= */
  @media (max-width: 576px) {
    #ado-chat-fab {
      display: none !important;
    }

    #ado-chat-window {
      position: fixed;
      bottom: calc(64px + env(safe-area-inset-bottom, 0px)) !important;
      left: 0 !important;
      right: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      height: 75vh !important;
      max-height: calc(100dvh - 80px) !important;
      border-radius: 28px 28px 0 0 !important;
      border-left: none !important;
      border-right: none !important;
      border-bottom: none !important;
      box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.25) !important;
      transform: translateY(100%) !important;
      transform-origin: center bottom !important;
      opacity: 0 !important;
      transition: transform 0.35s cubic-bezier(0.32, 1, 0.23, 1), opacity 0.25s ease !important;
    }

    #ado-chat-window.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
      pointer-events: auto !important;
    }

    /* Pull handle indicator on mobile header */
    .ado-chat-header::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 36px;
      height: 4px;
      border-radius: 100px;
      background: rgba(255, 255, 255, 0.35);
    }
  }
  `;
  document.head.appendChild(style);

  /* ─────────────────────────────────────────
     2. INJECT HTML  (single injection only)
  ───────────────────────────────────────── */
  const root = document.createElement('div');
  root.id = 'ado-chatbot-root';
  root.innerHTML = `
    <!-- FAB -->
    <button id="ado-chat-fab" aria-label="Open Adomantra AI Assistant">
      <i class="fa-solid fa-comment-dots ado-icon-chat"></i>
      <i class="fa-solid fa-xmark ado-icon-close"></i>
    </button>

    <!-- Chat Window -->
    <div id="ado-chat-window" role="dialog" aria-label="Adomantra AI Assistant">

      <!-- Header -->
      <div class="ado-chat-header">
        <div class="ado-chat-header-main">
          <div class="ado-chat-header-avatar">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div class="ado-chat-header-info">
            <h4>Adomantra Assistant</h4>
            <span><span class="ado-online-dot"></span> Active Now</span>
          </div>
        </div>
        <button class="ado-chat-close-btn" id="ado-chat-close-btn" aria-label="Close chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Scrollable body -->
      <div class="ado-chat-messages" id="ado-chat-messages">

        <!-- Welcome / Home view -->
        <div class="ado-welcome-area" id="ado-welcome-area">
          <h3>Hi! How can we help? 👋</h3>
          <p>Choose a category or ask your own question below.</p>

          <div class="ado-features-grid">
            <button class="ado-feature-item" data-q="What services does Adomantra offer?">
              <i class="fa-solid fa-briefcase"></i>
              <span>Services</span>
            </button>
            <button class="ado-feature-item" data-q="What is CTV advertising?">
              <i class="fa-solid fa-tv"></i>
              <span>CTV Ads</span>
            </button>
            <button class="ado-feature-item" data-q="Tell me about Adomantra achievements and stats.">
              <i class="fa-solid fa-trophy"></i>
              <span>Success</span>
            </button>
            <button class="ado-feature-item" data-q="How can I contact Adomantra?">
              <i class="fa-solid fa-headset"></i>
              <span>Support</span>
            </button>
          </div>

          <div class="ado-section-title">Common Questions</div>
          <button class="ado-question-prompt" data-q="What services does Adomantra offer?">What services do you offer?</button>
          <button class="ado-question-prompt" data-q="How can I start a digital marketing campaign with Adomantra?">How do I start a campaign?</button>
          <button class="ado-question-prompt" data-q="What technology and platforms does Adomantra use?">Tell me about your technology.</button>
        </div>

        <!-- Conversation messages injected here -->
        <div class="ado-conversation" id="ado-conversation"></div>

      </div>

      <!-- Input -->
      <div class="ado-chat-input-area">
        <textarea id="ado-chat-input" placeholder="Ask anything about Adomantra…" rows="1"></textarea>
        <button id="ado-chat-send" aria-label="Send">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>

      <div class="ado-chat-footer">
        Powered by <a href="https://www.adomantra.com/" target="_blank" rel="noopener">Adomantra</a> &amp; Groq AI
      </div>
    </div>
  `;
  document.body.appendChild(root);

  /* ─────────────────────────────────────────
     3. REFERENCES
  ───────────────────────────────────────── */
  const fab = document.getElementById('ado-chat-fab');
  const chatWindow = document.getElementById('ado-chat-window');
  const msgArea = document.getElementById('ado-chat-messages');
  const conversation = document.getElementById('ado-conversation');
  const welcomeArea = document.getElementById('ado-welcome-area');
  const inputEl = document.getElementById('ado-chat-input');
  const sendBtn = document.getElementById('ado-chat-send');

  const closeBtn = document.getElementById('ado-chat-close-btn');

  const history = [];
  let isOpen = false;
  let isLoading = false;

  /* ─────────────────────────────────────────
     4. TOGGLE
  ───────────────────────────────────────── */
  function toggleChat(forceState) {
    isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (fab) fab.classList.toggle('open', isOpen);
    if (chatWindow) chatWindow.classList.toggle('visible', isOpen);
    const mbNavChatbot = document.getElementById('mbNavChatbot');
    if (mbNavChatbot) mbNavChatbot.classList.toggle('active', isOpen);
    if (isOpen && inputEl) inputEl.focus();
  }

  if (fab) fab.addEventListener('click', () => toggleChat());
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

  /* ─────────────────────────────────────────
     5. QUICK-QUESTION HANDLERS (event delegation)
  ───────────────────────────────────────── */
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-q]');
    if (btn && btn.dataset.q) {
      sendMessage(btn.dataset.q);
    }
  });

  /* ─────────────────────────────────────────
     6. RENDER HELPERS
  ───────────────────────────────────────── */
  function addMessage(role, text) {
    // Hide welcome on first real message
    if (welcomeArea && conversation.children.length === 0) {
      welcomeArea.style.display = 'none';
    }

    const msg = document.createElement('div');
    msg.className = `ado-msg ${role}`;

    const avatar = role === 'bot'
      ? `<div class="ado-bot-mini"><i class="fa-solid fa-robot"></i></div>`
      : '';

    msg.innerHTML = `
      ${avatar}
      <div class="ado-bubble">${escapeHtml(text)}</div>
    `;
    conversation.appendChild(msg);
    scrollToBottom();
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'ado-msg bot';
    row.id = 'ado-typing-indicator';
    row.innerHTML = `
      <div class="ado-bot-mini"><i class="fa-solid fa-robot"></i></div>
      <div class="ado-typing-dots"><span></span><span></span><span></span></div>
    `;
    conversation.appendChild(row);
    scrollToBottom();
  }

  function removeTyping() {
    const el = document.getElementById('ado-typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }

  /* ─────────────────────────────────────────
     7. SEND MESSAGE
  ───────────────────────────────────────── */
  async function sendMessage(userText) {
    userText = (userText || '').trim();
    if (!userText || isLoading) return;

    isLoading = true;
    sendBtn.disabled = true;

    addMessage('user', userText);
    history.push({ role: 'user', content: userText });

    inputEl.value = '';
    inputEl.style.height = 'auto';

    showTyping();

    if (!GROQ_API_KEY) {
      setTimeout(() => {
        removeTyping();
        addMessage('bot', '⚠️ Chatbot API key is not configured. Please add your Groq API Key to assets/js/chatbot.js to start chatting!');
        isLoading = false;
        sendBtn.disabled = false;
        inputEl.focus();
      }, 600);
      return;
    }

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.slice(-10)
          ],
          max_tokens: 200,
          temperature: 0.6,
          stream: false
        })
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`HTTP ${res.status}: ${errBody}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim()
        || "Sorry, I couldn't get a response. Please try again.";

      removeTyping();
      addMessage('bot', reply);
      history.push({ role: 'assistant', content: reply });

    } catch (err) {
      removeTyping();
      addMessage('bot', '⚠️ Something went wrong. Please check your connection and try again.');
      console.error('[Adomantra Chatbot]', err);
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  /* ─────────────────────────────────────────
     8. INPUT EVENT LISTENERS
  ───────────────────────────────────────── */
  if (sendBtn) sendBtn.addEventListener('click', () => sendMessage(inputEl.value));

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(inputEl.value);
      }
    });

    // Auto-grow textarea
    inputEl.addEventListener('input', () => {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + 'px';
    });
  }

  // Expose global controller for mobile bottom nav and external triggers
  window.AdoChatbot = {
    toggle: toggleChat,
    open: () => toggleChat(true),
    close: () => toggleChat(false),
    isOpen: () => isOpen
  };

})();
