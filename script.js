/* ==========================================================================
   EDWELL CORE APPLICATION JAVASCRIPT ENGINE (FULLY FIXED & RE-ARCHITECTED)
   ========================================================================== */

const appState = {
    currentScreen: 'authScreen',
    subOptions: { aiCore: 'ai-calories', studyEntertain: 'se-timer' },
    nativeLang: null,
    streak: 0,
    inventory: [],
    mathIndex: 1,
    
    // 15-Puzzle Engine Architecture States
    puzzleGridSize: 3, // 3 means 3x3, 4 means 4x4 Matrix
    puzzleTilesArray: [],
    
    // Flashcard Core States
    selectedFlashcardTopic: 'Software Eng',
    activeFlashcardIndex: 0,
    reviewedFlashcardsCount: 0,
    
    // Quantum Anti-Procrastination Engine States
    focusCapital: 0,
    currentBehavioralProtocolIdx: 0,
    quantumTimerIntervalId: null,
    quantumTimeRemaining: 300, // 5 Minutes in Seconds
    isQuantumLockdownActive: false,
    audioSynthContext: null,
    audioSynthOscillator: null,
    isSynthAudioPlaying: false
};

const englishLessonsDatabase = [
    [
        { word: "Apple", native: { Arabic: "تفاحة", French: "Pomme", Spanish: "Manzana", Turkish: "Elma" }, ipa: "/ˈæpəl/", ex: "I eat an apple every single morning." },
        { word: "Laptop", native: { Arabic: "حاسوب محمول", French: "Ordinateur", Spanish: "Portátil", Turkish: "Dizüstü" }, ipa: "/ˈlæptɒp/", ex: "My gaming laptop has neon RGB keycaps." },
        { word: "Cozy", native: { Arabic: "دافئ ومريح", French: "Douillet", Spanish: "Acogedor", Turkish: "Rahat" }, ipa: "/ˈkəʊzi/", ex: "This dark gaming space feels incredibly cozy." },
        { word: "Ocean", native: { Arabic: "محيط", French: "Océan", Spanish: "Océano", Turkish: "Okyanus" }, ipa: "/ˈəʊʃən/", ex: "The deep blue ocean reflects the moonlight." },
        { word: "Algorithm", native: { Arabic: "خوارزمية", French: "Algorithme", Spanish: "Algoritmo", Turkish: "Algoritma" }, ipa: "/ˈælɡərɪðəm/", ex: "The AI recommendation algorithm works perfectly." },
        { word: "Matrix", native: { Arabic: "مصفوفة", French: "Matrice", Spanish: "Matriz", Turkish: "Matris" }, ipa: "/ˈmeɪtrɪks/", ex: "We live inside a futuristic data matrix." },
        { word: "Aesthetic", native: { Arabic: "جمالي", French: "Esthétique", Spanish: "Estético", Turkish: "Estetik" }, ipa: "/ɛsˈθɛtɪk/", ex: "Your room layout achieves a high aesthetic rating." },
        { word: "Velocity", native: { Arabic: "السرعة المتجهة", French: "Vélocité", Spanish: "Velocidad", Turkish: "Hız" }, ipa: "/vɪˈlɒsəti/", ex: "The processor executes operations with extreme velocity." }
    ]
];

const flashcardsDatabase = {
    "Software Eng": [
        { q: "What is the core structural computational variance between a List and a Tuple?", a: "Lists are dynamic and mutable (can modify), whereas Tuples possess fixed structures and are completely immutable." },
        { q: "Explain the architectural definition of RESTful state transfer protocols.", a: "An architectural framework for hypermedia systems utilizing standard HTTP stateless operations (GET, POST)." },
        { q: "What is the purpose of Big O notation in computer engineering?", a: "It mathematically quantifies the limiting behavior and execution scalability of an algorithm regarding time or space." }
    ],
    "Medical Science": [
        { q: "What specific cellular function occurs inside the inner membrane of Mitochondria?", a: "Adenosine Triphosphate (ATP) chemical energy units are fully synthesized via the electron transport system." },
        { q: "Define the anatomical primary operational objective of the human Cerebellum.", a: "It regulates and coordinates complex muscular movement patterns, posture preservation, and biological balance." }
    ]
};

const behavioralProtocolsDatabase = [
    { title: "The 5-Minute Friction Override", desc: "Commit to study for exactly 300 seconds. If you desire to stop afterwards, you are permitted. Inertia is your only true obstacle.", icon: "fa-solid fa-brain-circuit" },
    { title: "Atmospheric Faraday Protocol", desc: "Physically decouple your phone asset from your visual line of sight. Place it inside an alternate room structure entirely.", icon: "fa-solid fa-mobile-screen-button" },
    { title: "Simulated Group Velocity", desc: "Connect with the grid. Realize that 1,420 peer studiers are currently executing high intensity computation sessions synchronously with your timeline.", icon: "fa-solid fa-network-wired" }
];

const poolRewards = [
    { name: "Cyber Neon Plant", icon: "fa-solid fa-seedling", rarity: "Common" },
    { name: "Gaming Monitor", icon: "fa-solid fa-tv", rarity: "Epic" },
    { name: "Neon Cat Aura", icon: "fa-solid fa-cat", rarity: "Legendary" }
];

// --- APP CORE ROUTING ARCHITECTURE ---
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
    const target = document.getElementById(screenId);
    target.style.display = (screenId==='authScreen') ? 'flex' : 'block';
    setTimeout(() => { target.classList.add('active'); }, 50);
    appState.currentScreen = screenId;
    
    if(screenId === 'englishRoomScreen') loadEnglishRoomEngine();
    if(screenId === 'studyEntertainScreen') syncStudyEntertainSubsystems();
}

function switchAuthTab(mode) {
    document.getElementById('tabLogin').classList.toggle('active', mode==='login');
    document.getElementById('tabRegister').classList.toggle('active', mode==='register');
    document.getElementById('authSubmitBtn').innerText = mode==='login' ? 'Enter Space' : 'Create Space Account';
}
function handleAuth(e) { e.preventDefault(); document.getElementById('displayUsername').innerText = document.getElementById('username').value.trim(); navigateTo('mainDashboard'); }
function logout() { navigateTo('authScreen'); }

function switchSubOption(optionId) {
    document.querySelectorAll('#aiCoreScreen .sub-nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('#aiCoreScreen .sub-option-view').forEach(v => v.classList.remove('active'));
    document.getElementById(optionId).classList.add('active');
}

/* ==========================================================================
   AI CORE SUBSYSTEM
   ========================================================================== */
function simulateCalorieAI() {
    document.getElementById('calorieUploadWrapper').classList.add('hidden');
    const panel = document.getElementById('calorieResult'); panel.classList.remove('hidden');
    panel.innerHTML = `<h3><i class="fa-solid fa-gear fa-spin text-blue"></i> Computing Ingredients...</h3>`;
    setTimeout(() => {
        panel.innerHTML = `<div style="border-left:4px solid var(--neon-blue); padding-left:15px;"><h3>542 Kcal Extracted</h3><p>Proteins: 42g | Carbs: 28g</p><div class="refresh-panel-action"><button class="btn-neon-refresh" onclick="clearCalorie()"><i class="fa-solid fa-rotate-right"></i> Reset</button></div></div>`;
    }, 1000);
}
function clearCalorie() { document.getElementById('calorieResult').classList.add('hidden'); document.getElementById('calorieUploadWrapper').classList.remove('hidden'); }

function simulateHeightAI() {
    document.getElementById('heightUploadWrapper').classList.add('hidden');
    const panel = document.getElementById('heightResult'); panel.classList.remove('hidden');
    panel.innerHTML = `<h3><i class="fa-solid fa-spinner fa-spin text-blue"></i> Running Photogrammetry...</h3>`;
    setTimeout(() => {
        panel.innerHTML = `<div style="border-left:4px solid var(--neon-purple); padding-left:15px;"><h3>Estimated Height: 1.78M</h3><div class="refresh-panel-action"><button class="btn-neon-refresh" onclick="clearHeight()"><i class="fa-solid fa-rotate-right"></i> Reset</button></div></div>`;
    }, 1000);
}
function clearHeight() { document.getElementById('heightResult').classList.add('hidden'); document.getElementById('heightUploadWrapper').classList.remove('hidden'); }
function simulateOutfitAI() { document.getElementById('outfitResult').classList.remove('hidden'); document.getElementById('outfitResult').innerHTML = `<h4>Cyberpunk Techwear Matrix Recommended.</h4>`; }

/* ==========================================================================
   ONE MINUTE COZY ENGLISH ROOM
   ========================================================================== */
let englishIndex = 0;
function loadEnglishRoomEngine() {
    document.getElementById('streakCount').innerText = appState.streak;
    if(!appState.nativeLang) {
        document.getElementById('langSelectorView').classList.remove('hidden');
        document.getElementById('englishMainWorkspace').classList.add('layout-hidden');
    } else {
        document.getElementById('langSelectorView').classList.add('hidden');
        document.getElementById('englishMainWorkspace').classList.remove('layout-hidden');
        renderRoomAssets();
        renderEnglishLesson();
    }
}
function selectNativeLang(lang) { appState.nativeLang = lang; loadEnglishRoomEngine(); }

function renderRoomAssets() {
    const canvas = document.getElementById('virtualRoom'); canvas.innerHTML = '';
    document.getElementById('inventoryCount').innerText = appState.inventory.length;
    if(appState.inventory.length === 0) { canvas.innerHTML = `<div class="base-room-text">Empty Room Layer</div>`; return; }
    appState.inventory.forEach(i => { canvas.innerHTML += `<div class="room-item-node glow-${i.rarity.toLowerCase()}"><i class="${i.icon}"></i><span style="font-size:0.6rem;">${i.name}</span></div>`; });
}

function renderEnglishLesson() {
    const container = document.getElementById('dailyLessonContainer');
    const word = englishLessonsDatabase[0][englishIndex];
    container.innerHTML = `
        <h3>Daily English Synapse (${englishIndex+1}/8)</h3>
        <div class="interactive-carousel-wrapper">
            <div class="word-meta-row"><span class="word-main-txt">${word.word}</span><span class="word-ipa">${word.ipa}</span></div>
            <div class="word-native">${word.native[appState.nativeLang]}</div>
            <div class="word-ex"><i>"${word.ex}"</i></div>
        </div>
        <div class="carousel-controls-row">
            <button class="btn-nav-carousel" onclick="englishIndex--; renderEnglishLesson()" ${englishIndex===0?'disabled':''}>Prev</button>
            ${englishIndex === 7 ? `<button class="btn-primary" style="width:auto;" onclick="launchQuizMatrix()">Launch Quiz Evaluation</button>` : `<button class="btn-nav-carousel" onclick="englishIndex++; renderEnglishLesson()">Next</button>`}
        </div>`;
}

function launchQuizMatrix() {
    const container = document.getElementById('dailyLessonContainer');
    const word = englishLessonsDatabase[0][2]; // Cozy
    container.innerHTML = `
        <div class="challenge-header"><h3>Matrix Node Evaluation</h3></div>
        <div class="timer-bar-bg"><div class="timer-bar-fill"></div></div>
        <p style="margin-bottom:15px;">Identify true localization for: <b>"${word.word}"</b></p>
        <div class="quiz-options-stack">
            <button class="quiz-opt-btn" onclick="quizOutcome(true)">${word.native[appState.nativeLang]}</button>
            <button class="quiz-opt-btn" onclick="quizOutcome(false)">Alternative Faulty Branch</button>
        </div>`;
}
function quizOutcome(win) { if(win) { appState.streak++; document.getElementById('rewardModal').classList.add('active'); } else { englishIndex=0; renderEnglishLesson(); } }

function triggerMysteryBoxOpening() {
    document.getElementById('rewardBoxClosed').classList.add('hidden');
    document.getElementById('rewardBoxOpened').classList.remove('hidden');
    const item = poolRewards[Math.floor(Math.random()*poolRewards.length)];
    appState.inventory.push(item);
    document.getElementById('rewardRarity').innerText = item.rarity;
    document.getElementById('rewardGraphic').innerHTML = `<i class="${item.icon}"></i>`;
    document.getElementById('rewardTitle').innerText = item.name;
}
function closeRewardModal() { document.getElementById('rewardModal').classList.remove('active'); document.getElementById('rewardBoxClosed').classList.remove('hidden'); document.getElementById('rewardBoxOpened').classList.add('hidden'); loadEnglishRoomEngine(); }

/* ==========================================================================
   STUDY & ENTERTAINMENT: SUB-NAVIGATION MANAGEMENT
   ========================================================================== */
function switchSubOptionSE(optionId) {
    document.querySelectorAll('#studyEntertainScreen .sub-nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('#studyEntertainScreen .sub-option-view').forEach(v => v.classList.remove('SEactive'));
    document.getElementById(optionId).classList.add('SEactive');
}

function syncStudyEntertainSubsystems() {
    initOrRender15Puzzle();
    generateInfiniteMathQuestion();
    renderFlashcardMatrix();
}

/* ==========================================================================
   15-PUZZLE CORE ALGORITHM (FULLY FIXED & OPERATIONAL)
   ========================================================================== */
function togglePuzzleDifficulty() {
    appState.puzzleGridSize = appState.puzzleGridSize === 3 ? 4 : 3;
    document.getElementById('puzzleGridSizeLabel').innerText = `${appState.puzzleGridSize}x${appState.puzzleGridSize} Matrix`;
    initOrRender15Puzzle();
}

function initOrRender15Puzzle() {
    document.getElementById('puzzleWinMessage').classList.add('hidden');
    const size = appState.puzzleGridSize;
    const totalCells = size * size;
    
    // 1. Generate normal sequential ordered list array (0 represents the empty cell)
    let tiles = [];
    for(let i = 1; i < totalCells; i++) { tiles.push(i); }
    tiles.push(0); 

    // 2. High-reliability solvable shuffle engine
    // Instead of completely randomizing arrays which creates unsolvable boards half the time, 
    // we take an ordered array and perform valid adjacent random movements on it.
    let emptyIdx = totalCells - 1;
    for(let iterations = 0; iterations < 150; iterations++) {
        let validMoves = [];
        let row = Math.floor(emptyIdx / size);
        let col = emptyIdx % size;

        if(row > 0) validMoves.push(emptyIdx - size); // Move up
        if(row < size - 1) validMoves.push(emptyIdx + size); // Move down
        if(col > 0) validMoves.push(emptyIdx - 1); // Move left
        if(col < size - 1) validMoves.push(emptyIdx + 1); // Move right

        // Random pick an adjacent cell and swap with empty space
        let randomChosenTarget = validMoves[Math.floor(Math.random() * validMoves.length)];
        tiles[emptyIdx] = tiles[randomChosenTarget];
        tiles[randomChosenTarget] = 0;
        emptyIdx = randomChosenTarget;
    }

    appState.puzzleTilesArray = tiles;
    drawPuzzleHTMLGrid();
}

function drawPuzzleHTMLGrid() {
    const board = document.getElementById('puzzleBoard');
    board.innerHTML = '';
    const size = appState.puzzleGridSize;
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    appState.puzzleTilesArray.forEach((value, index) => {
        const cell = document.createElement('div');
        if(value === 0) {
            cell.className = 'puzzle-cell empty';
        } else {
            cell.className = 'puzzle-cell';
            cell.innerText = value;
            cell.onclick = () => executePuzzleTileSlidingMove(index);
        }
        board.appendChild(cell);
    });
}

function executePuzzleTileSlidingMove(clickedIndex) {
    const size = appState.puzzleGridSize;
    const emptyIndex = appState.puzzleTilesArray.indexOf(0);

    const clickedRow = Math.floor(clickedIndex / size);
    const clickedCol = clickedIndex % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    // Check adjacency rule (orthogonal coordinates absolute step equals 1)
    const isAdjacent = (Math.abs(clickedRow - emptyRow) + Math.abs(clickedCol - emptyCol)) === 1;

    if(isAdjacent) {
        // Swap values
        appState.puzzleTilesArray[emptyIndex] = appState.puzzleTilesArray[clickedIndex];
        appState.puzzleTilesArray[clickedIndex] = 0;
        
        drawPuzzleHTMLGrid();
        verifyPuzzleCompletionWinState();
    }
}

function verifyPuzzleCompletionWinState() {
    const tiles = appState.puzzleTilesArray;
    const size = appState.puzzleGridSize;
    const totalCells = size * size;

    // Check if empty cell is at the end position
    if(tiles[totalCells - 1] !== 0) return;

    // Verify all previous numbers are sequential
    for(let i = 0; i < totalCells - 1; i++) {
        if(tiles[i] !== (i + 1)) return; // Broken chain sequence
    }

    // Puzzle completely matched! Trigger success layout
    document.getElementById('puzzleWinMessage').classList.remove('hidden');
    appState.focusCapital += 50;
    document.getElementById('focusCapitalPoints').innerText = `${appState.focusCapital} FP`;
}

/* ==========================================================================
   INFINITE MATH ENGINE
   ========================================================================== */
function generateInfiniteMathQuestion() {
    document.getElementById('mathIndex').innerText = appState.mathIndex;
    const num1 = Math.floor(Math.random() * 15) + 5;
    const num2 = Math.floor(Math.random() * 12) + 3;
    const answer = num1 * num2;
    
    document.getElementById('mathQuestionString').innerText = `${num1} × ${num2} = ?`;
    const options = [answer, answer + 5, answer - 3, answer + 12].sort(() => Math.random() - 0.5);
    
    const container = document.getElementById('mathOptionsContainer'); container.innerHTML = '';
    options.forEach(opt => {
        container.innerHTML += `<button class="quiz-opt-btn" onclick="handleMathSubmission(${opt === answer})">${opt}</button>`;
    });
}
function handleMathSubmission(isCorrect) { if(isCorrect) appState.mathIndex++; generateInfiniteMathQuestion(); }
function skipMathQuestion() { appState.mathIndex++; generateInfiniteMathQuestion(); }

/* ==========================================================================
   FLASHCARDS MATRIX ENGINE
   ========================================================================== */
function renderFlashcardMatrix() {
    const bar = document.getElementById('flashcardTopicsBar'); bar.innerHTML = '';
    Object.keys(flashcardsDatabase).forEach(topic => {
        bar.innerHTML += `<button class="topic-tab-btn ${appState.selectedFlashcardTopic===topic?'active':''}" onclick="setFlashcardTopic('${topic}')">${topic}</button>`;
    });
    const card = flashcardsDatabase[appState.selectedFlashcardTopic][appState.activeFlashcardIndex];
    document.getElementById('fcQuestionText').innerText = card.q;
    document.getElementById('fcAnswerText').innerText = card.a;
    document.getElementById('flashcardCount').innerText = appState.reviewedFlashcardsCount;
}
function setFlashcardTopic(t) { appState.selectedFlashcardTopic = t; appState.activeFlashcardIndex = 0; renderFlashcardMatrix(); }
function flipActiveFlashcard() { document.getElementById('active3DCard').classList.toggle('flipped'); }
function cycleFlashcard(dir) {
    const len = flashcardsDatabase[appState.selectedFlashcardTopic].length;
    appState.activeFlashcardIndex = (appState.activeFlashcardIndex + dir + len) % len;
    document.getElementById('active3DCard').classList.remove('flipped');
    renderFlashcardMatrix();
}
function markFlashcardMastered() { appState.reviewedFlashcardsCount++; appState.focusCapital+=10; document.getElementById('focusCapitalPoints').innerText = `${appState.focusCapital} FP`; cycleFlashcard(1); }

/* ==========================================================================
   MIND WELL MOOD COACH & PACER
   ========================================================================== */
function analyzeMood(mood) {
    const box = document.getElementById('moodCoachFeedback'); box.classList.remove('hidden');
    box.innerHTML = `<p style="color:var(--neon-pink)">Mood Analyzed: <b>${mood}</b>. Deploying matching neuro-soundscapes inside the Quantum Core below.</p>`;
}
let breathInterval = null;
function toggleBreathPacer() {
    const btn = document.getElementById('breathBtn'); const circle = document.getElementById('breathCircle');
    if(breathInterval) { clearInterval(breathInterval); breathInterval = null; btn.innerText = "Start Guide"; circle.className = 'breath-circle'; return; }
    btn.innerText = "Stop Guide";
    let expand = true;
    breathInterval = setInterval(() => {
        circle.className = expand ? 'breath-circle expand' : 'breath-circle';
        circle.innerText = expand ? "Exhale" : "Inhale";
        expand = !expand;
    }, 4000);
}

/* ==========================================================================
   BRAND NEW QUANTUM FOCUS SYNAPSE ENGINEERING (RE-ENGINEERED PROCRASTINATION LAYER)
   ========================================================================== */
function generateNewBehavioralProtocol() {
    appState.currentBehavioralProtocolIdx = (appState.currentBehavioralProtocolIdx + 1) % behavioralProtocolsDatabase.length;
    const item = behavioralProtocolsDatabase[appState.currentBehavioralProtocolIdx];
    
    document.getElementById('procChallengeTitle').innerText = item.title;
    document.getElementById('procChallengeDesc').innerText = item.desc;
    document.getElementById('procrastinationIcon').className = item.icon;
}

function engageQuantumProcrastinationOverride() {
    const panel = document.querySelector('.quantum-radar-panel');
    const actionBtn = document.getElementById('btnQuantumAction');
    const msg = document.getElementById('quantumStatusMessage');

    if(appState.isQuantumLockdownActive) {
        // Safe disconnection cleanup routine
        clearInterval(appState.quantumTimerIntervalId);
        appState.quantumTimeRemaining = 300;
        appState.isQuantumLockdownActive = false;
        panel.classList.remove('active-lockdown');
        document.getElementById('quantumTimerDisplay').innerText = "05:00";
        actionBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Inject Focus Protocol`;
        msg.innerText = "SYSTEM IDLE // LOCKDOWN DEACTIVATED";
        return;
    }

    // Activate Lockdown Core
    appState.isQuantumLockdownActive = true;
    panel.classList.add('active-lockdown');
    actionBtn.innerHTML = `<i class="fa-solid fa-ban"></i> Terminate Current Lockdown`;
    msg.innerText = "CRITICAL COGNITIVE DISCIPLINE ENGAGED // NO DISTRACTIONS";

    appState.quantumTimerIntervalId = setInterval(() => {
        appState.quantumTimeRemaining--;
        
        let minutes = Math.floor(appState.quantumTimeRemaining / 60);
        let seconds = appState.quantumTimeRemaining % 60;
        document.getElementById('quantumTimerDisplay').innerText = 
            `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        if(appState.quantumTimeRemaining <= 0) {
            clearInterval(appState.quantumTimerIntervalId);
            appState.focusCapital += 150; // Mass reward grant payload
            document.getElementById('focusCapitalPoints').innerText = `${appState.focusCapital} FP`;
            
            // Auto complete resetting routine
            appState.isQuantumLockdownActive = false;
            panel.classList.remove('active-lockdown');
            actionBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Inject Focus Protocol`;
            msg.innerText = "MISSION COMPLETED // CORE EXPANSION ASSETS UNLOCKED";
            alert("🎯 Direct hit! Neural synchronization fully achieved. +150 Focus Capital allocated!");
        }
    }, 1000);
}

// ADVANCED WEB AUDIO API ANALOG GENERATOR FOR COGNITIVE NEURAL FOCUS
function toggleQuantumBinauralSynth() {
    const btn = document.getElementById('synthAudioBtn');

    if(appState.isSynthAudioPlaying) {
        // Destroy oscillator waves immediately
        if(appState.audioSynthOscillator) {
            appState.audioSynthOscillator.stop();
            appState.audioSynthOscillator.disconnect();
        }
        appState.isSynthAudioPlaying = false;
        btn.classList.remove('playing');
        btn.innerHTML = `<i class="fa-solid fa-headphones"></i>`;
        return;
    }

    try {
        // Initialize Web Audio Context if required
        if(!appState.audioSynthContext) {
            appState.audioSynthContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Generate customized binaural ambient focus hum (low alpha-inducing wave at 120Hz)
        let ctx = appState.audioSynthContext;
        let osc = ctx.createOscillator();
        let gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, ctx.currentTime); // Deep focusing hum frequency
        
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime); // Keep decibels softly layered in dark environment

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();

        appState.audioSynthOscillator = osc;
        appState.isSynthAudioPlaying = true;
        btn.classList.add('playing');
        btn.innerHTML = `<i class="fa-solid fa-waveform fa-pulse"></i>`;

    } catch (error) {
        console.error("Audio Synthesis subsystem blocked by hardware restrictions.", error);
    }
}

window.addEventListener('DOMContentLoaded', () => { navigateTo('authScreen'); });