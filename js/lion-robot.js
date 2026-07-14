/* ===== ROBOT AI ASSISTANT ===== */
(function() {
  'use strict';

  const ready = fn => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

  const pageTips = {
    'index.html': {
      greeting: "Hey there! I'm ARO, your AI guide! 🤖",
      tips: [
        "Want to learn about AI? Try the Kids section for fun games!",
        "Curious about something? Click 'Ask AI' to search 200+ questions!",
        "New to AI? Check out the Timeline to see how it all started!",
        "Want to compare AI models? The Compare page has a great table!",
      ],
      suggestions: ['What is AI?', 'Show me games', 'Tell me a fun fact']
    },
    'ask.html': {
      greeting: "Welcome to Ask AI! I can help you find answers! 🤖",
      tips: [
        "Type any AI question and get instant answers!",
        "Try asking about LLMs, RAG, or prompt engineering!",
        "I've got answers on 200+ AI topics!",
      ],
      suggestions: ['How do LLMs work?', 'What is RAG?', 'AI career paths']
    },
    'kids.html': {
      greeting: "Hey, future AI explorer! Ready to play? 🤖",
      tips: [
        "Try 'Sort It' to see how AI learns to classify things!",
        "Pattern Detective teaches you how AI finds patterns!",
        "Code the Robot is like giving AI instructions!",
        "Can you beat my high score? ⭐",
      ],
      suggestions: ['Tell me about AI', 'Fun AI facts', 'How does AI learn?']
    },
    'glossary.html': {
      greeting: "Welcome to the AI Glossary! 🤖",
      tips: [
        "Use the search bar to find any AI term!",
        "Click the letter to jump to that section!",
        "Try searching for 'neural network' or 'transformer'!",
      ],
      suggestions: ['What is ML?', 'Define LLM', 'What is deep learning?']
    },
    'timeline.html': {
      greeting: "Let's travel through AI history! 🤖",
      tips: [
        "AI started in the 1950s — that's over 70 years ago!",
        "The Transformer architecture in 2017 changed everything!",
        "We're living in the most exciting era of AI right now!",
      ],
      suggestions: ['When was AI invented?', 'What is GPT?', 'Future of AI']
    },
    'compare.html': {
      greeting: "Want to compare AI models? I love this page! 🤖",
      tips: [
        "Use the filters to compare models by provider!",
        "Check the Quick Picks for common use cases!",
        "GPT-4o and Claude 3.5 are great all-rounders!",
      ],
      suggestions: ['Best free model?', 'GPT vs Claude', 'What is GPT-4?']
    },
    'about.html': {
      greeting: "Curious about AI Explorer? Great! 🤖",
      tips: [
        "I was built to make AI learning accessible for everyone!",
        "Have feedback? I'd love to hear it!",
        "Share AI Explorer with your friends!",
      ],
      suggestions: ['What is this site?', 'Who made you?', 'How can I help?']
    },
    'resources.html': {
      greeting: "Looking for AI resources? Great taste! 🤖",
      tips: [
        "The Learning section has courses for every level!",
        "Check out the Tools page for the best AI platforms!",
        "The Models page lists the top AI models right now!",
      ],
      suggestions: ['Best AI course?', 'Free AI tools', 'Start learning AI']
    }
  };

  const generalResponses = {
    'what is ai': "AI (Artificial Intelligence) is technology that lets machines think and learn like humans! It's like teaching a computer to be smart. Want to learn more? Check out our <a href='detail-fundamentals.html'>Fundamentals page</a>!",
    'tell me a fun fact': "Here's a fun fact! 🤖 The first AI program was written in 1951 by Christopher Strachey. It played checkers! Now AI can write art, music, and even code. How cool is that?",
    'show me games': "We have awesome AI games for kids! 🎮 Click <a href='kids.html'>Kids</a> in the navigation to play sorting games, pattern detective, and more!",
    'how does ai learn': "AI learns by looking at TONS of examples — just like you learn patterns! Show an AI 1000 cat photos and it learns what cats look like! 🐱",
    'who made you': "I'm ARO the Robot! 🤖 I was created to help you explore the world of AI. The AI Explorer website has everything you need to learn about artificial intelligence!",
    'what is ml': "ML stands for Machine Learning — it's how AI learns from data! Instead of programming every rule, we show the AI examples and it figures out the patterns itself. Pretty smart, right? 🧠",
    'what is llm': "LLM = Large Language Model! These are AI systems trained on massive amounts of text. GPT, Claude, Llama — they're all LLMs! They can write, answer questions, and even code! 💻",
    'what is rag': "RAG (Retrieval-Augmented Generation) helps AI give accurate answers by looking up information first! It's like letting AI use a search engine before answering. Smart, right? 📚",
    'future of ai': "The future of AI is SUPER exciting! 🚀 We'll see AI doctors, teachers, artists, and assistants. AI will help solve climate change, cure diseases, and explore space!",
    'best ai course': "For beginners, I recommend Andrew Ng's 'AI for Everyone' on Coursera — it's free! For kids, check out our <a href='kids.html'>Games section</a>! 📚",
    'free ai tools': "There are tons of free AI tools! ChatGPT (free tier), Google Gemini, Hugging Face, Google Colab for ML, and Ollama for running AI locally! 🔧",
    'start learning ai': "Here's my recommended path: 1️⃣ Start with our <a href='detail-fundamentals.html'>Fundamentals</a>, 2️⃣ Try the <a href='kids.html'>Kids games</a>, 3️⃣ Explore <a href='resources-learning.html'>Learning Resources</a>! You got this! 💪",
    'hi': "Hi there! 🤖 I'm ARO, your AI assistant! I can help you learn about AI, find resources, or just chat. What would you like to know?",
    'hello': "Hello! 🤖 Welcome to AI Explorer! I'm ARO, and I'm here to help you navigate the amazing world of AI. What interests you?",
    'thanks': "You're welcome! 🤖 That's what I'm here for! Feel free to ask me anything else about AI!",
    'help': "I can help you with: 🧠 Explaining AI concepts, 📚 Finding resources, 🎮 Directing you to games, 🔍 Answering questions. Just ask!"
  };

  function createRobot() {
    const container = document.createElement('div');
    container.className = 'lion-robot';
    container.id = 'lion-robot';
    container.innerHTML = `
      <div class="lion-chat" id="lion-chat">
        <div class="lion-chat-header">
          <div class="lion-chat-avatar">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
              <rect x="12" y="16" width="40" height="36" rx="8" fill="#7c8da6" stroke="#4a5568" stroke-width="2"/>
              <rect x="16" y="20" width="32" height="24" rx="4" fill="#1a2332"/>
              <circle cx="26" cy="32" r="5" fill="#00e5b3"/>
              <circle cx="38" cy="32" r="5" fill="#00e5b3"/>
              <circle cx="26" cy="31" r="2" fill="white"/>
              <circle cx="38" cy="31" r="2" fill="white"/>
              <rect x="26" y="40" width="12" height="2" rx="1" fill="#00e5b3"/>
              <line x1="32" y1="4" x2="32" y2="16" stroke="#7c8da6" stroke-width="3" stroke-linecap="round"/>
              <circle cx="32" cy="4" r="3" fill="#ff6b9d"/>
              <rect x="4" y="28" width="8" height="10" rx="3" fill="#7c8da6" stroke="#4a5568" stroke-width="1"/>
              <rect x="52" y="28" width="8" height="10" rx="3" fill="#7c8da6" stroke="#4a5568" stroke-width="1"/>
              <circle cx="8" cy="33" r="2" fill="#00e5b3"/>
              <circle cx="56" cy="33" r="2" fill="#00e5b3"/>
            </svg>
          </div>
          <div class="lion-chat-info">
            <h4>ARO the Robot</h4>
            <span>🤖 AI Assistant • Online</span>
          </div>
          <button class="lion-chat-close" id="lion-chat-close" aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="lion-chat-messages" id="lion-messages"></div>
        <div class="lion-chat-input">
          <input type="text" id="lion-input" placeholder="Ask ARO anything..." aria-label="Ask ARO anything">
          <button class="lion-chat-send" id="lion-send" aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <div class="lion-speech" id="lion-speech"></div>

      <button class="lion-btn" id="lion-btn" aria-label="Chat with ARO the Robot AI assistant">
        <span class="lion-badge" id="lion-badge" style="display: none;">1</span>
        <div class="lion-face">
          <svg viewBox="0 0 64 64" fill="none" width="100%" height="100%">
            <!-- Head -->
            <rect x="10" y="14" width="44" height="38" rx="10" fill="#7c8da6" stroke="#4a5568" stroke-width="2"/>
            <!-- Screen face -->
            <rect x="15" y="19" width="34" height="28" rx="6" fill="#1a2332"/>
            <!-- Eyes -->
            <circle cx="26" cy="32" r="6" fill="#00e5b3"/>
            <circle cx="38" cy="32" r="6" fill="#00e5b3"/>
            <circle cx="26" cy="31" r="2.5" fill="white"/>
            <circle cx="38" cy="31" r="2.5" fill="white"/>
            <!-- Mouth -->
            <rect x="24" y="40" width="16" height="2.5" rx="1.25" fill="#00e5b3"/>
            <rect x="26" y="40" width="3" height="2.5" rx="0.5" fill="#1a2332"/>
            <rect x="31" y="40" width="3" height="2.5" rx="0.5" fill="#1a2332"/>
            <!-- Antenna -->
            <line x1="32" y1="2" x2="32" y2="14" stroke="#7c8da6" stroke-width="3" stroke-linecap="round"/>
            <circle cx="32" cy="2" r="4" fill="#ff6b9d">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
            </circle>
            <!-- Ears -->
            <rect x="2" y="26" width="8" height="14" rx="4" fill="#7c8da6" stroke="#4a5568" stroke-width="1"/>
            <rect x="54" y="26" width="8" height="14" rx="4" fill="#7c8da6" stroke="#4a5568" stroke-width="1"/>
            <circle cx="6" cy="33" r="2.5" fill="#00e5b3">
              <animate attributeName="fill" values="#00e5b3;#ff6b9d;#00e5b3" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="58" cy="33" r="2.5" fill="#00e5b3">
              <animate attributeName="fill" values="#00e5b3;#4d9fff;#00e5b3" dur="3s" repeatCount="indefinite"/>
            </circle>
            <!-- Bolts -->
            <circle cx="16" cy="22" r="1.5" fill="#4a5568"/>
            <circle cx="48" cy="22" r="1.5" fill="#4a5568"/>
          </svg>
        </div>
      </button>
    `;
    document.body.appendChild(container);
  }

  function initRobot() {
    createRobot();

    const btn = document.getElementById('lion-btn');
    const chat = document.getElementById('lion-chat');
    const closeBtn = document.getElementById('lion-chat-close');
    const input = document.getElementById('lion-input');
    const sendBtn = document.getElementById('lion-send');
    const messages = document.getElementById('lion-messages');
    const speech = document.getElementById('lion-speech');
    const badge = document.getElementById('lion-badge');
    const face = document.querySelector('.lion-face');

    let chatOpen = false;
    let welcomeShown = false;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageData = pageTips[currentPage] || pageTips['index.html'];

    setTimeout(() => {
      if (!chatOpen) {
        speech.textContent = pageData.greeting + ' Need any help?';
        speech.classList.add('show');
        badge.style.display = 'grid';
        badge.textContent = '!';
        setTimeout(() => speech.classList.remove('show'), 5000);
      }
    }, 2000);

    let tipIndex = 0;
    setInterval(() => {
      if (!chatOpen) {
        const tip = pageData.tips[tipIndex % pageData.tips.length];
        speech.textContent = tip;
        speech.classList.add('show');
        tipIndex++;
        setTimeout(() => speech.classList.remove('show'), 5000);
      }
    }, 12000);

    btn.addEventListener('click', () => {
      chatOpen = !chatOpen;
      chat.classList.toggle('open', chatOpen);
      speech.classList.remove('show');
      badge.style.display = 'none';

      if (chatOpen && !welcomeShown) {
        welcomeShown = true;
        setTimeout(() => {
          addBotMessage(pageData.greeting);
          setTimeout(() => {
            addBotMessage("I can help you navigate, explain AI concepts, or just chat! What would you like to know?", pageData.suggestions);
          }, 600);
        }, 400);
      }

      if (chatOpen) {
        setTimeout(() => input.focus(), 400);
      }
    });

    closeBtn.addEventListener('click', () => {
      chatOpen = false;
      chat.classList.remove('open');
    });

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      addUserMessage(text);
      input.value = '';

      const typingEl = document.createElement('div');
      typingEl.className = 'lion-msg';
      typingEl.innerHTML = `
        <div class="lion-msg-avatar">🤖</div>
        <div class="lion-msg-bubble">
          <div class="lion-typing"><span></span><span></span><span></span></div>
        </div>
      `;
      messages.appendChild(typingEl);
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        typingEl.remove();
        const response = findResponse(text);
        addBotMessage(response);
      }, 800 + Math.random() * 600);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMessage();
    });

    function addUserMessage(text) {
      const div = document.createElement('div');
      div.className = 'lion-msg';
      div.style.justifyContent = 'flex-end';
      div.innerHTML = `
        <div class="lion-msg-bubble" style="background: var(--accent-dim); border-color: rgba(0,229,179,0.2); color: var(--fg); border-top-left-radius: var(--radius-md); border-top-right-radius: 4px;">${escapeHtml(text)}</div>
      `;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function addBotMessage(text, suggestions) {
      const div = document.createElement('div');
      div.className = 'lion-msg';
      let suggestionsHtml = '';
      if (suggestions && suggestions.length) {
        suggestionsHtml = `<div class="lion-suggestions">${suggestions.map(s => `<button class="lion-suggestion" data-q="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div>`;
      }
      div.innerHTML = `
        <div class="lion-msg-avatar">🤖</div>
        <div class="lion-msg-bubble">${text}${suggestionsHtml}</div>
      `;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;

      div.querySelectorAll('.lion-suggestion').forEach(sug => {
        sug.addEventListener('click', () => {
          input.value = sug.dataset.q;
          sendMessage();
        });
      });
    }

    function findResponse(text) {
      const lower = text.toLowerCase();

      for (const [key, val] of Object.entries(generalResponses)) {
        if (lower.includes(key)) return val;
      }

      if (lower.match(/\b(hi|hello|hey|howdy|greetings)\b/)) return generalResponses['hi'];
      if (lower.match(/\b(thank|thanks|thx)\b/)) return generalResponses['thanks'];
      if (lower.match(/\b(help|assist|guide)\b/)) return generalResponses['help'];
      if (lower.match(/\b(game|play|fun|kids|child)\b/)) return generalResponses['show me games'];
      if (lower.match(/\b(fact|fun fact|interesting|cool)\b/)) return generalResponses['tell me a fun fact'];
      if (lower.match(/\b(machine learning|ml)\b/)) return generalResponses['what is ml'];
      if (lower.match(/\b(llm|large language)\b/)) return generalResponses['what is llm'];
      if (lower.match(/\b(rag|retrieval)\b/)) return generalResponses['what is rag'];
      if (lower.match(/\b(future|coming|next|upcoming)\b/)) return generalResponses['future of ai'];
      if (lower.match(/\b(course|learn|tutorial|class|study)\b/)) return generalResponses['best ai course'];
      if (lower.match(/\b(tool|free|platform|app)\b/)) return generalResponses['free ai tools'];
      if (lower.match(/\b(start|begin|beginner|newbie|first)\b/)) return generalResponses['start learning ai'];
      if (lower.match(/\b(who|made|created|built|you are)\b/)) return generalResponses['who made you'];
      if (lower.match(/\b(what is|what's|define|explain|meaning)\b/)) {
        if (lower.match(/\b(ai|artificial intelligence)\b/)) return generalResponses['what is ai'];
        return "Great question! 🤖 AI is a big topic. Could you be more specific? Try asking about machine learning, LLMs, or neural networks!";
      }

      return "Hmm, that's an interesting question! 🤖 I'm best at explaining AI concepts and helping you navigate the site. Try asking me about AI, machine learning, or check out our <a href='ask.html'>Ask AI page</a> for 200+ answers!";
    }

    btn.addEventListener('mouseenter', () => {
      face.style.animation = 'robotBounce 0.6s ease';
    });
    btn.addEventListener('mouseleave', () => {
      face.style.animation = '';
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes robotBounce {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-4px) rotate(-3deg); }
      50% { transform: translateY(-2px) rotate(3deg); }
      75% { transform: translateY(-4px) rotate(-2deg); }
    }
  `;
  document.head.appendChild(style);

  ready(initRobot);
})();
