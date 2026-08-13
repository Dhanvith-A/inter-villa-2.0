(function () {
  'use strict';

  
  // 1. DATASETS & QUESTION BANKS
  
  const INTERVIEW_ROLES = [
    { id: 'swe_fullstack', name: 'Software Engineer — Fullstack', category: 'Engineering' },
    { id: 'swe_frontend', name: 'Software Engineer — Frontend', category: 'Engineering' },
    { id: 'swe_backend', name: 'Software Engineer — Backend', category: 'Engineering' },
    { id: 'system_design', name: 'System Architect / Lead', category: 'Architecture' },
    { id: 'product_manager', name: 'Product Manager', category: 'Product' },
    { id: 'data_science', name: 'Data Scientist & ML Engineer', category: 'AI & Data' },
    { id: 'behavioral', name: 'Behavioral & Leadership (STAR)', category: 'Behavioral' }
  ];

  const COMPANY_PRESETS = [
    { id: 'faang', name: 'FAANG / Big Tech', badge: 'High Rigor' },
    { id: 'startup', name: 'Fast-Paced Tech Startup', badge: 'Agile & Execution' },
    { id: 'fintech', name: 'FinTech & Scale-up', badge: 'Security & Scale' },
    { id: 'enterprise', name: 'Global Enterprise', badge: 'Process & Architecture' }
  ];

  const QUESTION_BANKS = {
    swe_fullstack: [
      {
        id: 'fs_1',
        type: 'conceptual',
        title: 'JavaScript Variables',
        prompt: "In one simple sentence, what is the main difference between let and const in JavaScript?",
        rubric: ['reassign', 'constant', 'immutable', 'change', 'let', 'const'],
        followUps: ["When would you use const instead of let?"]
      },
      {
        id: 'fs_2',
        type: 'conceptual',
        title: 'HTTP GET vs POST',
        prompt: "In one sentence, what is the key difference between an HTTP GET request and a POST request?",
        rubric: ['get', 'post', 'fetch', 'send', 'data', 'retrieve'],
        followUps: ["Which request type passes parameters in the URL?"]
      },
      {
        id: 'fs_3',
        type: 'conceptual',
        title: 'HTML vs CSS',
        prompt: "In one sentence, what is the difference between HTML and CSS?",
        rubric: ['html', 'css', 'structure', 'style', 'layout', 'content'],
        followUps: ["What does CSS stand for?"]
      }
    ],

    swe_frontend: [
      {
        id: 'fe_1',
        type: 'conceptual',
        title: 'CSS Main Purpose',
        prompt: "In one simple sentence, what is the main job of CSS on a web page?",
        rubric: ['style', 'design', 'layout', 'appearance', 'look', 'format'],
        followUps: ["What is a CSS class selector?"]
      },
      {
        id: 'fe_2',
        type: 'conceptual',
        title: 'DOM Definition',
        prompt: "In one sentence, what is the Document Object Model or DOM?",
        rubric: ['tree', 'representation', 'html', 'structure', 'memory', 'elements'],
        followUps: ["How does JavaScript access a DOM element?"]
      },
      {
        id: 'fe_3',
        type: 'conceptual',
        title: 'Event Listeners',
        prompt: "In one sentence, what does addEventListener do in JavaScript?",
        rubric: ['event', 'listen', 'trigger', 'click', 'handler', 'function'],
        followUps: ["Give an example of a web event."]
      }
    ],

    swe_backend: [
      {
        id: 'be_1',
        type: 'conceptual',
        title: 'SQL Primary Key',
        prompt: "In one simple sentence, what is a Primary Key in a database table?",
        rubric: ['unique', 'identifier', 'row', 'record', 'table', 'key'],
        followUps: ["Can a table have two primary keys?"]
      },
      {
        id: 'be_2',
        type: 'conceptual',
        title: 'API Endpoint',
        prompt: "In one sentence, what is an API endpoint?",
        rubric: ['url', 'location', 'server', 'request', 'address', 'point'],
        followUps: ["What HTTP method retrieves data from an endpoint?"]
      },
      {
        id: 'be_3',
        type: 'conceptual',
        title: 'JSON Format',
        prompt: "In one sentence, what is JSON used for in software development?",
        rubric: ['data', 'format', 'exchange', 'store', 'transfer', 'json'],
        followUps: ["What does JSON stand for?"]
      }
    ],

    system_design: [
      {
        id: 'sd_1',
        type: 'conceptual',
        title: 'Database Indexing',
        prompt: "In one simple sentence, what is the primary benefit of a database index?",
        rubric: ['speed', 'faster', 'query', 'retrieval', 'search', 'performance'],
        followUps: ["What is a potential drawback of having too many indexes?"]
      },
      {
        id: 'sd_2',
        type: 'conceptual',
        title: 'Load Balancers',
        prompt: "In one sentence, what is the main job of a Load Balancer?",
        rubric: ['distribute', 'traffic', 'servers', 'load', 'balance', 'requests'],
        followUps: ["How does a load balancer prevent server overloading?"]
      }
    ],

    product_manager: [
      {
        id: 'pm_1',
        type: 'conceptual',
        title: 'Minimum Viable Product',
        prompt: "In one simple sentence, what is an MVP or Minimum Viable Product?",
        rubric: ['basic', 'features', 'test', 'early', 'users', 'feedback', 'product'],
        followUps: ["Why is launching an MVP helpful?"]
      }
    ],

    data_science: [
      {
        id: 'ds_1',
        type: 'conceptual',
        title: 'Supervised Learning',
        prompt: "In one simple sentence, what is Supervised Machine Learning?",
        rubric: ['labeled', 'data', 'training', 'predict', 'inputs', 'targets'],
        followUps: ["Give one example of labeled data."]
      }
    ],

    behavioral: [
      {
        id: 'beh_1',
        type: 'behavioral',
        title: 'Task Prioritization',
        prompt: "In one simple sentence, how do you decide which coding task to work on first?",
        rubric: ['priority', 'blocking', 'urgent', 'important', 'impact', 'first'],
        followUps: ["What do you do if two tasks are equally urgent?"]
      },
      {
        id: 'beh_2',
        type: 'behavioral',
        title: 'Coding Motivation',
        prompt: "In one simple sentence, why do you enjoy building software applications?",
        rubric: ['solve', 'problem', 'create', 'build', 'learn', 'impact', 'enjoy'],
        followUps: ["What was your favorite software feature you built recently?"]
      }
    ]
  };

  
  // 2. WEB AUDIO SYNTHESIZER SOUND EFFECTS
  
  class SoundEffectsService {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio synthesis warning:', e);
      }
    }

    playQuestionNext() {
      this.playTone(520, 'triangle', 0.12, 0.15);
      setTimeout(() => this.playTone(650, 'triangle', 0.12, 0.15), 100);
      setTimeout(() => this.playTone(780, 'triangle', 0.2, 0.15), 200);
    }

    playHint() {
      this.playTone(440, 'sine', 0.15, 0.1);
      setTimeout(() => this.playTone(880, 'sine', 0.25, 0.12), 120);
    }

    playReportGenerated() {
      this.playTone(400, 'sine', 0.15, 0.15);
      setTimeout(() => this.playTone(500, 'sine', 0.15, 0.15), 120);
      setTimeout(() => this.playTone(600, 'sine', 0.15, 0.15), 240);
      setTimeout(() => this.playTone(800, 'sine', 0.35, 0.2), 360);
    }
  }

  const soundFx = new SoundEffectsService();

  
  // 3. WEB SPEECH API RECOGNITION & SYNTHESIS SERVICE

  class SpeechService {
    constructor() {
      this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
      this.recognition = null;
      this.isListening = false;
      this.shouldListen = false;
      this.isAiSpeaking = false;
      this.accumulatedTranscript = '';
      this.onResultCallback = null;
      this.onErrorCallback = null;
      this.voices = [];
      this.watchdogInterval = null;
      this.initVoices();
      this.initRecognition();
      this.startWatchdog();
    }

    startWatchdog() {
      if (this.watchdogInterval) clearInterval(this.watchdogInterval);
      this.watchdogInterval = setInterval(() => {
        if (this.shouldListen && !this.isListening && !this.isAiSpeaking) {
          this.safeStart();
        }
      }, 1500);
    }

    safeStart() {
      if (!this.recognition || !this.shouldListen) return;
      if (this.isListening) return;

      try {
        this.recognition.start();
        this.isListening = true;
      } catch (e) {
        if (e.name === 'InvalidStateError' || (e.message && e.message.includes('already started'))) {
          this.isListening = true;
        } else {
          console.warn('SpeechRecognition safeStart warning:', e);
          this.isListening = false;
          setTimeout(() => {
            if (this.shouldListen && !this.isListening) {
              this.safeStart();
            }
          }, 300);
        }
      }
    }

    initVoices() {
      if (!this.synth) return;
      this.voices = this.synth.getVoices();
      if (typeof this.synth.onvoiceschanged !== 'undefined') {
        this.synth.onvoiceschanged = () => {
          this.voices = this.synth.getVoices();
        };
      }
    }

    initRecognition() {
      if (typeof window === 'undefined') return;
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = 'en-US';

          rec.onresult = (event) => {
            if (this.isAiSpeaking || (this.synth && this.synth.speaking)) {
              this.accumulatedTranscript = '';
              return;
            }

            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                this.accumulatedTranscript += event.results[i][0].transcript + ' ';
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }
            const fullText = (this.accumulatedTranscript + interimTranscript).trim();
            if (this.onResultCallback) {
              this.onResultCallback({
                final: this.accumulatedTranscript.trim(),
                interim: interimTranscript.trim(),
                combined: fullText
              });
            }
          };

          rec.onerror = (event) => {
            console.warn('SpeechRecognition error:', event.error);
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'audio-capture') {
              this.shouldListen = false;
              this.isListening = false;
            }
            if (event.error === 'no-speech' || event.error === 'network' || event.error === 'aborted') {
              if (this.shouldListen) {
                setTimeout(() => this.safeStart(), 200);
              }
              return;
            }
            if (this.onErrorCallback) this.onErrorCallback(event.error);
          };

          rec.onend = () => {
            this.isListening = false;
            if (this.shouldListen) {
              setTimeout(() => {
                this.safeStart();
              }, 150);
            }
          };

          this.recognition = rec;
        } catch (err) {
          console.warn('SpeechRecognition init error:', err);
        }
      }
    }

    getEnglishVoices() {
      if (!this.synth) return [];
      const list = this.voices.length > 0 ? this.voices : this.synth.getVoices();
      return list.filter(v => v.lang.startsWith('en'));
    }

    speak(text, options = {}) {
      if (!this.synth) return Promise.resolve();

      return new Promise((resolve) => {
        this.stopSpeaking();
        this.isAiSpeaking = true;
        this.accumulatedTranscript = '';

        // Clean markdown backticks, code symbols, and formatting for natural speech synthesis
        const spokenText = (text || '')
          .replace(/`/g, '')
          .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
          .replace(/_([^_]+)_/g, '$1')
          .trim();

        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.rate = options.rate || 1.0;
        utterance.pitch = options.pitch || 1.0;

        const voices = this.getEnglishVoices();
        if (voices.length > 0) {
          const preferred = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'));
          utterance.voice = preferred || voices[0];
        }

        utterance.onstart = () => {
          this.isAiSpeaking = true;
          this.accumulatedTranscript = '';
          if (options.onStart) options.onStart();
        };

        const finishSpeech = () => {
          setTimeout(() => {
            this.isAiSpeaking = false;
            this.accumulatedTranscript = '';
            if (options.onEnd) options.onEnd();
            resolve();
          }, 600);
        };

        utterance.onend = finishSpeech;

        utterance.onerror = (err) => {
          console.warn('SpeechSynthesis warning:', err);
          this.isAiSpeaking = false;
          this.accumulatedTranscript = '';
          finishSpeech();
        };

        try {
          this.synth.speak(utterance);
        } catch (e) {
          this.isAiSpeaking = false;
          this.accumulatedTranscript = '';
          finishSpeech();
        }
      });
    }

    stopSpeaking() {
      this.isAiSpeaking = false;
      if (this.synth) {
        try {
          this.synth.cancel();
        } catch (e) {
          console.warn('Error stopping speech synthesis:', e);
        }
      }
    }

    clearTranscript() {
      this.accumulatedTranscript = '';
    }

    startListening(onResult, onError) {
      if (onResult) this.onResultCallback = onResult;
      if (onError) this.onErrorCallback = onError;
      this.shouldListen = true;

      if (!this.recognition) {
        if (onError) onError('not-supported');
        return;
      }

      this.safeStart();
    }

    stopListening() {
      this.shouldListen = false;
      if (this.recognition && this.isListening) {
        try {
          this.recognition.stop();
        } catch (e) {
          console.warn('Error stopping recognition:', e);
        }
        this.isListening = false;
      }
    }
  }

  const speechService = new SpeechService();

  
  // 4. AI EVALUATION & DIAGNOSTIC REPORT ENGINE
  
  const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'literally', 'sort of', 'kind of', 'i mean', 'actually'];

  function analyzeResponse(userText, questionObj, codeContent = '', whiteboardElements = 0) {
    const text = (userText || '').trim();
    const words = text.length > 0 ? text.split(/\s+/) : [];
    const wordCount = words.length;

    const initialCode = (questionObj.initialCode || '').trim();
    const currentCode = (codeContent || '').trim();

    const isCodeModified = currentCode.length > 0 && currentCode !== initialCode && currentCode.replace(/\s+/g, '') !== initialCode.replace(/\s+/g, '');
    const hasCode = isCodeModified && currentCode.length > 20;
    const hasWhiteboard = whiteboardElements > 0;

    // Skipped or un-edited template response -> 0 marks
    if (wordCount === 0 && !hasCode && !hasWhiteboard) {
      return {
        wordCount: 0,
        fillerCount: 0,
        fillerDetails: {},
        rubricScore: 0,
        matchedRubrics: [],
        missedRubrics: questionObj.rubric || [],
        starCheck: { situation: false, task: false, action: false, result: false },
        starScore: 0,
        codeScore: 0,
        codeFeedback: 'No response submitted (un-edited template).',
        score: 0
      };
    }

    const lowerText = text.toLowerCase();
    let fillerCount = 0;
    const fillerDetails = {};

    FILLER_WORDS.forEach(filler => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        const count = matches.length;
        fillerCount += count;
        fillerDetails[filler] = count;
      }
    });

    const rubric = questionObj.rubric || [];
    let rubricHits = 0;
    const matchedRubrics = [];
    const missedRubrics = [];

    rubric.forEach(item => {
      const keywords = item.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
      const isHit = keywords.some(kw => kw.length > 2 && lowerText.includes(kw));
      if (isHit) {
        rubricHits++;
        matchedRubrics.push(item);
      } else {
        missedRubrics.push(item);
      }
    });

    const rubricScore = rubric.length > 0 ? Math.round((rubricHits / rubric.length) * 100) : (wordCount > 15 ? 60 : 0);

    const starCheck = {
      situation: /\b(when|at my|during|while|project|company|team|role|situation)\b/i.test(text),
      task: /\b(goal|needed|required|task|objective|challenge|problem|assigned)\b/i.test(text),
      action: /\b(i created|i built|i implemented|i decided|i led|i designed|i analyzed|i proposed|action)\b/i.test(text),
      result: /\b(result|outcome|increased|reduced|improved|saved|achieved|learned|metrics|percent|%)\b/i.test(text)
    };
    const starScore = Object.values(starCheck).filter(Boolean).length * 25;

    let codeScore = 0;
    let codeFeedback = '';
    if (questionObj.type === 'coding') {
      if (isCodeModified) {
        const hasFunction = /function|class|const|let|def/i.test(currentCode);
        const hasReturn = /return/i.test(currentCode);
        if (hasCode && hasFunction && hasReturn) {
          codeScore = 90;
          codeFeedback = 'Solid code structure with functional logic and returns.';
        } else {
          codeScore = 50;
          codeFeedback = 'Code was edited, but appears incomplete.';
        }
      } else {
        codeScore = 0;
        codeFeedback = 'Starter template un-edited.';
      }
    }

    let systemDesignScore = 0;
    if (questionObj.type === 'system_design') {
      if (whiteboardElements > 3) systemDesignScore = 95;
      else if (whiteboardElements > 0) systemDesignScore = 70;
      else systemDesignScore = 0;
    }

    let score = 0;
    if (questionObj.type === 'coding') {
      score = Math.round(codeScore * 0.6 + rubricScore * 0.4);
    } else if (questionObj.type === 'system_design') {
      score = Math.round(systemDesignScore * 0.5 + rubricScore * 0.5);
    } else {
      score = rubricHits > 0 ? Math.min(100, Math.max(80, rubricScore)) : (wordCount > 3 ? 60 : 20);
    }

    score = Math.min(100, Math.max(0, score));

    return {
      wordCount,
      fillerCount,
      fillerDetails,
      rubricScore,
      matchedRubrics,
      missedRubrics,
      starCheck,
      starScore,
      codeScore,
      codeFeedback,
      score
    };
  }

  function generateFinalReport(sessionData) {
    const { role, company, difficulty, questions, responses, totalDurationSeconds } = sessionData;

    let totalScore = 0;
    let totalWords = 0;
    let totalFillers = 0;
    const questionEvaluations = [];

    questions.forEach((q, idx) => {
      const res = responses[q.id] || { text: '', code: '', whiteboardCount: 0, timeSpent: 0 };
      const evalResult = analyzeResponse(res.text, q, res.code, res.whiteboardCount);

      totalScore += evalResult.score;
      totalWords += evalResult.wordCount;
      totalFillers += evalResult.fillerCount;

      const idealAnswer = `An ideal response clearly addresses ${q.title} covering: ${q.rubric.join(', ')}. ` +
        (q.type === 'behavioral' ? 'It uses the STAR framework with concrete metric outcomes.' : 'It highlights key requirements and trade-offs.');

      const strengths = [];
      const improvements = [];

      if (evalResult.score === 0) {
        improvements.push('Question was skipped without an answer (un-edited template).');
      } else {
        if (evalResult.matchedRubrics.length > 0) {
          strengths.push(`Good coverage of core topics: ${evalResult.matchedRubrics.join(', ')}.`);
        } else {
          improvements.push(`Make sure to address foundational concepts such as ${q.rubric.slice(0, 2).join(' and ')}.`);
        }

        if (evalResult.fillerCount === 0 && evalResult.wordCount > 15) {
          strengths.push('Clean articulation with zero filler words.');
        } else if (evalResult.fillerCount > 2) {
          improvements.push(`Reduce vocal pauses (used ${evalResult.fillerCount} filler words).`);
        }

        if (q.type === 'behavioral') {
          if (evalResult.starScore >= 75) {
            strengths.push('Structured response following the STAR methodology.');
          } else {
            improvements.push('Structure your narrative explicitly: Situation, Task, Action, and Quantifiable Result.');
          }
        }
      }

      questionEvaluations.push({
        question: q,
        candidateResponse: res.text || '(No verbal response recorded)',
        candidateCode: res.code,
        evaluation: evalResult,
        idealAnswer,
        strengths,
        improvements,
        timeSpent: res.timeSpent || 0
      });
    });

    const overallScore = Math.round(totalScore / (questions.length || 1));
    const avgWpm = totalWords > 0 ? Math.round((totalWords / ((totalDurationSeconds || 180) / 60))) : 0;

    const radarMetrics = {
      technicalDepth: Math.round(overallScore * 0.95),
      communication: totalWords > 0 ? Math.max(10, Math.min(100, 100 - totalFillers * 5)) : 0,
      problemSolving: Math.round(overallScore * 0.9),
      starStructure: Math.round(questionEvaluations.reduce((acc, curr) => acc + curr.evaluation.starScore, 0) / (questions.length || 1)),
      confidence: totalWords > 0 ? Math.min(100, Math.max(20, Math.round(100 - (totalFillers * 3)))) : 0
    };

    let recommendation = 'NO HIRE';
    if (overallScore >= 85) recommendation = 'STRONG HIRE';
    else if (overallScore >= 70) recommendation = 'HIRE';
    else if (overallScore >= 50) recommendation = 'LEAN HIRE';

    return {
      id: 'report_' + Date.now(),
      timestamp: new Date().toISOString(),
      role,
      company,
      difficulty,
      overallScore,
      recommendation,
      totalDurationSeconds,
      totalWords,
      avgWpm,
      totalFillers,
      radarMetrics,
      questionEvaluations
    };
  }


  // 5. HTML5 CANVAS SYSTEM DESIGN WHITEBOARD TOOL
  
  class WhiteboardManager {
    constructor(containerId, canvasId) {
      this.container = document.getElementById(containerId);
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.tool = 'pen';
      this.color = '#8ab4f8';
      this.isDrawing = false;
      this.startPos = { x: 0, y: 0 };
      this.elementCount = 0;

      if (this.canvas) {
        this.initEvents();
      }
    }

    resize() {
      if (this.container && this.canvas) {
        const w = this.container.clientWidth || 380;
        const h = this.container.clientHeight || 300;
        this.canvas.width = w;
        this.canvas.height = h;
      }
    }

    initEvents() {
      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
      window.addEventListener('resize', () => this.resize());
    }

    getPos(e) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    handleMouseDown(e) {
      const pos = this.getPos(e);
      this.isDrawing = true;
      this.startPos = pos;
      if (this.tool === 'pen' || this.tool === 'eraser') {
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
      }
    }

    handleMouseMove(e) {
      if (!this.isDrawing) return;
      const pos = this.getPos(e);

      if (this.tool === 'pen') {
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 2.5;
        this.ctx.lineCap = 'round';
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
      } else if (this.tool === 'eraser') {
        this.ctx.clearRect(pos.x - 12, pos.y - 12, 24, 24);
      }
    }

    handleMouseUp(e) {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      const pos = this.getPos(e);

      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 2;

      if (this.tool === 'rect') {
        this.ctx.strokeRect(this.startPos.x, this.startPos.y, pos.x - this.startPos.x, pos.y - this.startPos.y);
      } else if (this.tool === 'circle') {
        const r = Math.sqrt(Math.pow(pos.x - this.startPos.x, 2) + Math.pow(pos.y - this.startPos.y, 2));
        this.ctx.beginPath();
        this.ctx.arc(this.startPos.x, this.startPos.y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
      }

      if (this.tool !== 'eraser') {
        this.elementCount++;
      }
    }

    clear() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.elementCount = 0;
      }
    }
  }


  // 6. MAIN SINGLE PAGE APPLICATION CONTROLLER
  
  document.addEventListener('DOMContentLoaded', () => {
    let currentView = 'setup';
    let sessionConfig = null;
    let currentQIndex = 0;
    let questions = [];
    let responses = {};
    let transcriptLog = [];
    let secondsRemaining = 1800;
    let timerInterval = null;
    let questionStartTime = Date.now();

    let isMicOn = true;
    let isCamOn = true;
    let candidateStream = null;
    let isWorkspaceOpen = false;

    let whiteboardMgr = null;
    let aiCanvasAnimId = null;

    // DOM Elements
    const setupView = document.getElementById('setup-view');
    const roomView = document.getElementById('room-view');
    const reportView = document.getElementById('report-view');

    const navRoleBadge = document.getElementById('nav-active-role');
    const clockText = document.getElementById('clock-text');

    const setupVideo = document.getElementById('setup-video');
    const setupCamPlaceholder = document.getElementById('setup-cam-placeholder');
    const selectRole = document.getElementById('select-role');
    const selectCompany = document.getElementById('select-company');
    const selectDifficulty = document.getElementById('select-difficulty');
    const inputResume = document.getElementById('input-resume');

    const roomCandidateVideo = document.getElementById('room-candidate-video');
    const roomCamPlaceholder = document.getElementById('room-cam-placeholder');
    const roomQuestionTitle = document.getElementById('room-question-title');
    const roomTimerText = document.getElementById('room-timer-text');
    const roomTextInput = document.getElementById('room-text-input');
    const candidateMicStatus = document.getElementById('candidate-mic-status');
    const aiCaptionText = document.getElementById('ai-caption-text');
    const candidateCaptionText = document.getElementById('candidate-caption-text');

    const workspaceDrawer = document.getElementById('workspace-drawer');
    const videoGrid = document.getElementById('video-grid');

    const codeTextarea = document.getElementById('code-textarea');
    const codeLineNumbers = document.getElementById('code-line-numbers');
    const consoleOutput = document.getElementById('console-output');
    const consoleText = document.getElementById('console-text');
    const transcriptList = document.getElementById('transcript-list');

    const modalHistory = document.getElementById('modal-history');
    const modalSettings = document.getElementById('modal-settings');
    const inputApiKey = document.getElementById('input-api-key');

    // Init App
    initClock();
    populateSetupForm();
    initSetupCamera();
    initEventListeners();

    function initClock() {
      const updateTime = () => {
        const now = new Date();
        clockText.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
      updateTime();
      setInterval(updateTime, 1000);
    }

    function populateSetupForm() {
      selectRole.innerHTML = INTERVIEW_ROLES.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
      selectCompany.innerHTML = COMPANY_PRESETS.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    async function initSetupCamera() {
      // Reuse active candidate stream if already obtained (ask once on first load)
      if (candidateStream && candidateStream.active) {
        const hasVideo = candidateStream.getVideoTracks().some(t => t.readyState === 'live');
        const hasAudio = candidateStream.getAudioTracks().some(t => t.readyState === 'live');
        if (hasVideo || hasAudio) {
          setupVideo.srcObject = candidateStream;
          setupCamPlaceholder.style.display = isCamOn ? 'none' : 'flex';
          setupVideo.style.display = isCamOn ? 'block' : 'none';
          return;
        }
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        candidateStream = stream;
        setupVideo.srcObject = stream;
        setupCamPlaceholder.style.display = isCamOn ? 'none' : 'flex';
        setupVideo.style.display = isCamOn ? 'block' : 'none';

        // Apply current toggle state
        candidateStream.getAudioTracks().forEach(t => t.enabled = isMicOn);
        candidateStream.getVideoTracks().forEach(t => t.enabled = isCamOn);

        // Pre-initialize SpeechRecognition in Setup so permission is requested upfront before joining interview
        if (isMicOn && speechService) {
          startSpeechListen();
        }
      } catch (e) {
        console.warn('Camera/Microphone access warning:', e);
        setupCamPlaceholder.style.display = 'flex';
        setupVideo.style.display = 'none';
      }
    }

    function stopCandidateCamera() {
      // Retain media stream tracks across room transitions so permissions are not re-prompted
      if (roomCandidateVideo) {
        roomCandidateVideo.srcObject = null;
      }
    }

    function stopAiVisualizer() {
      if (aiCanvasAnimId) {
        cancelAnimationFrame(aiCanvasAnimId);
        aiCanvasAnimId = null;
      }
    }

    function switchView(viewName) {
      currentView = viewName;
      setupView.style.display = viewName === 'setup' ? 'flex' : 'none';
      roomView.style.display = viewName === 'room' ? 'flex' : 'none';
      reportView.style.display = viewName === 'report' ? 'flex' : 'none';

      if (viewName !== 'room') {
        stopAiVisualizer();
      }

      if (viewName === 'setup') {
        navRoleBadge.style.display = 'none';
        initSetupCamera();
      }
    }

    function initEventListeners() {
      document.getElementById('btn-logo-home').addEventListener('click', () => {
        if (confirm('Return to home setup screen?')) {
          speechService.stopSpeaking();
          speechService.stopListening();
          clearInterval(timerInterval);
        window.location.href = 'index.html';
        }
      });

      document.getElementById('setup-toggle-mic').addEventListener('click', () => {
        isMicOn = !isMicOn;
        document.getElementById('svg-mic-on').style.display = isMicOn ? 'block' : 'none';
        document.getElementById('svg-mic-off').style.display = isMicOn ? 'none' : 'block';
        if (candidateStream) candidateStream.getAudioTracks().forEach(t => t.enabled = isMicOn);
        if (isMicOn) {
          startSpeechListen();
        } else {
          speechService.stopListening();
        }
      });

      document.getElementById('setup-toggle-cam').addEventListener('click', () => {
        isCamOn = !isCamOn;
        document.getElementById('svg-cam-on').style.display = isCamOn ? 'block' : 'none';
        document.getElementById('svg-cam-off').style.display = isCamOn ? 'none' : 'block';
        setupVideo.style.display = isCamOn ? 'block' : 'none';
        setupCamPlaceholder.style.display = isCamOn ? 'none' : 'flex';
        if (candidateStream) candidateStream.getVideoTracks().forEach(t => t.enabled = isCamOn);
      });

      document.getElementById('btn-join-interview').addEventListener('click', startInterviewSession);

      document.getElementById('room-btn-mic').addEventListener('click', toggleRoomMic);
      document.getElementById('room-btn-cam').addEventListener('click', toggleRoomCam);
      document.getElementById('room-btn-hint').addEventListener('click', askForHint);
      document.getElementById('room-btn-workspace').addEventListener('click', toggleWorkspaceDrawer);
      document.getElementById('btn-close-drawer').addEventListener('click', toggleWorkspaceDrawer);
      document.getElementById('room-btn-next').addEventListener('click', handleNextQuestion);
    document.getElementById('room-btn-end').addEventListener('click', () => {
    // Stop interview
    endInterviewEarly();

    // Show message
    alert("Interview Failed. The interview was ended before completion.");

    // Redirect after clicking OK
    window.location.href = "index.html";
});

      document.getElementById('btn-restart-mic').addEventListener('click', restartVoiceListening);

      roomTextInput.addEventListener('input', (e) => {
        const val = e.target.value;
        candidateCaptionText.textContent = val ? `"${val}"` : '';
        candidateCaptionText.style.display = val ? 'block' : 'none';
      });

      document.getElementById('tab-btn-code').addEventListener('click', () => switchDrawerTab('code'));
      document.getElementById('tab-btn-whiteboard').addEventListener('click', () => switchDrawerTab('whiteboard'));
      document.getElementById('tab-btn-transcript').addEventListener('click', () => switchDrawerTab('transcript'));

      codeTextarea.addEventListener('input', () => updateLineNumbers());
      document.getElementById('btn-code-reset').addEventListener('click', resetCodeEditor);
    document.getElementById("btn-code-run").addEventListener("click", async () => {
      const code = document.getElementById("code-textarea").value;
      const language = document.getElementById("code-language").value;

      if (!code.trim()) {
          alert("Please write some code first.");
          return;
      }

      try {
          const response = await fetch("http://localhost:3000/run-code", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ code, language })
          });

          const result = await response.json();

          consoleOutput.style.display = "block";

          if (!result.success) {
              consoleText.textContent = result.error || "Code execution failed.";
              return;
          }

          consoleText.textContent = result.output || "Code executed successfully.";
      } catch (error) {
          console.error(error);
          consoleOutput.style.display = "block";
          consoleText.textContent = "Could not connect to the code runner server. Start the server with: node server.js";
      }
    });

      document.getElementById('wb-tool-pen').addEventListener('click', (e) => setWbTool('pen', e.currentTarget));
      document.getElementById('wb-tool-rect').addEventListener('click', (e) => setWbTool('rect', e.currentTarget));
      document.getElementById('wb-tool-circle').addEventListener('click', (e) => setWbTool('circle', e.currentTarget));
      document.getElementById('wb-tool-eraser').addEventListener('click', (e) => setWbTool('eraser', e.currentTarget));
      document.getElementById('btn-wb-clear').addEventListener('click', () => whiteboardMgr && whiteboardMgr.clear());

      document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
          e.target.classList.add('active');
          if (whiteboardMgr) whiteboardMgr.color = e.target.dataset.color;
        });
      });

      document.getElementById('btn-report-retake').addEventListener('click', () => switchView('setup'));
      document.getElementById('btn-print-pdf').addEventListener('click', () => window.print());
      document.getElementById('btn-export-json').addEventListener('click', exportReportJSON);

      document.getElementById('btn-open-history').addEventListener('click', openHistoryModal);
      document.getElementById('btn-close-history').addEventListener('click', () => modalHistory.style.display = 'none');
      document.getElementById('btn-clear-history').addEventListener('click', clearHistory);

      document.getElementById('btn-open-settings').addEventListener('click', () => {
        inputApiKey.value = localStorage.getItem('interview_api_key') || '';
        modalSettings.style.display = 'flex';
      });
      document.getElementById('btn-close-settings').addEventListener('click', () => modalSettings.style.display = 'none');
      document.getElementById('btn-cancel-settings').addEventListener('click', () => modalSettings.style.display = 'none');
      document.getElementById('btn-save-settings').addEventListener('click', () => {
        localStorage.setItem('interview_api_key', inputApiKey.value.trim());
        modalSettings.style.display = 'none';
      });
    }

    async function startInterviewSession() {
      const roleObj = INTERVIEW_ROLES.find(r => r.id === selectRole.value) || INTERVIEW_ROLES[0];
      const companyObj = COMPANY_PRESETS.find(c => c.id === selectCompany.value) || COMPANY_PRESETS[0];

      sessionConfig = {
        role: roleObj,
        company: companyObj,
        difficulty: selectDifficulty.value,
        resumeText: inputResume.value.trim()
      };

      questions = QUESTION_BANKS[roleObj.id] || QUESTION_BANKS['swe_fullstack'];
      currentQIndex = 0;
      responses = {};
      transcriptLog = [];
      secondsRemaining = 1800;

      navRoleBadge.textContent = roleObj.name;
      navRoleBadge.style.display = 'inline-block';

      switchView('room');
      initRoomStage();
    }

    function initRoomStage() {
      soundFx.playQuestionNext();

      if (candidateStream && candidateStream.active) {
        roomCandidateVideo.srcObject = candidateStream;
        roomCandidateVideo.style.display = isCamOn ? 'block' : 'none';
        roomCamPlaceholder.style.display = isCamOn ? 'none' : 'flex';
        roomCandidateVideo.play().catch(() => {});
      } else {
        initSetupCamera().then(() => {
          if (candidateStream) {
            roomCandidateVideo.srcObject = candidateStream;
            roomCandidateVideo.style.display = isCamOn ? 'block' : 'none';
            roomCamPlaceholder.style.display = isCamOn ? 'none' : 'flex';
            roomCandidateVideo.play().catch(() => {});
          }
        });
      }

      whiteboardMgr = new WhiteboardManager('wb-container', 'wb-canvas');
      startAiVisualizerCanvas();

      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        secondsRemaining--;
        const mins = Math.floor(secondsRemaining / 60);
        const secs = secondsRemaining % 60;
        roomTimerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (secondsRemaining <= 0) {
          clearInterval(timerInterval);
          completeInterviewSession();
        }
      }, 1000);

      if (isMicOn) {
        startSpeechListen();
      }

      loadQuestion(0);
    }

    function loadQuestion(idx) {
      currentQIndex = idx;
      const q = questions[idx];
      questionStartTime = Date.now();

      roomQuestionTitle.textContent = `Question ${idx + 1} of ${questions.length}: ${q.title}`;
      document.getElementById('next-btn-text').textContent = idx === questions.length - 1 ? 'Finish' : 'Next';

      roomTextInput.value = '';
      candidateCaptionText.textContent = '';
      candidateCaptionText.style.display = 'none';

      codeTextarea.value = q.initialCode || '';
      updateLineNumbers();
      consoleOutput.style.display = 'none';

      speechService.clearTranscript();

      speakAiPrompt(q.prompt);
    }

    function speakAiPrompt(text) {
      speechService.stopSpeaking();
      aiCaptionText.textContent = text;
      logTranscript('AI Interviewer', text);

      roomTextInput.value = '';
      candidateCaptionText.textContent = '';
      candidateCaptionText.style.display = 'none';

      speechService.speak(text, {
        onEnd: () => {
          roomTextInput.value = '';
          candidateCaptionText.textContent = '';
          candidateCaptionText.style.display = 'none';
          speechService.clearTranscript();
          if (isMicOn) candidateMicStatus.textContent = '🎤 Listening...';
        }
      });
    }

    function startSpeechListen() {
      if (!isMicOn) return;
      if (candidateMicStatus) candidateMicStatus.textContent = '🎤 Listening...';

      speechService.startListening(
        (res) => {
          if (roomTextInput) roomTextInput.value = res.combined;
          if (candidateCaptionText) {
            candidateCaptionText.textContent = `"${res.combined}"`;
            candidateCaptionText.style.display = res.combined ? 'block' : 'none';
          }
        },
        (err) => {
          if (err === 'not-supported' || err === 'NotAllowedError') {
            if (candidateMicStatus) candidateMicStatus.textContent = '⌨️ Type answer below';
          }
        }
      );
    }

    function restartVoiceListening() {
      speechService.stopListening();
      startSpeechListen();
    }

    function toggleRoomMic() {
      isMicOn = !isMicOn;
      document.getElementById('room-mic-on').style.display = isMicOn ? 'block' : 'none';
      document.getElementById('room-mic-off').style.display = isMicOn ? 'none' : 'block';
      candidateMicStatus.textContent = isMicOn ? '🎤 Listening...' : 'Muted';
      if (candidateStream) candidateStream.getAudioTracks().forEach(t => t.enabled = isMicOn);
      if (!isMicOn) speechService.stopListening();
      else startSpeechListen();
    }

    function toggleRoomCam() {
      isCamOn = !isCamOn;
      document.getElementById('room-cam-on').style.display = isCamOn ? 'block' : 'none';
      document.getElementById('room-cam-off').style.display = isCamOn ? 'none' : 'block';
      roomCandidateVideo.style.display = isCamOn ? 'block' : 'none';
      roomCamPlaceholder.style.display = isCamOn ? 'none' : 'flex';
      if (candidateStream) candidateStream.getVideoTracks().forEach(t => t.enabled = isCamOn);
    }

    function askForHint() {
      soundFx.playHint();
      speechService.stopSpeaking();
      const q = questions[currentQIndex];
      const hintMsg = `Hint: Focus on ${q.title} core requirements (${q.rubric.slice(0, 2).join(', ')}).`;
      speakAiPrompt(hintMsg);
    }

    function toggleWorkspaceDrawer() {
      isWorkspaceOpen = !isWorkspaceOpen;
      workspaceDrawer.style.display = isWorkspaceOpen ? 'flex' : 'none';

      const btnWorkspace = document.getElementById('room-btn-workspace');
      if (btnWorkspace) {
        if (isWorkspaceOpen) {
          btnWorkspace.classList.add('active');
        } else {
          btnWorkspace.classList.remove('active');
        }
      }

      if (window.innerWidth > 1024) {
        videoGrid.style.gridTemplateColumns = isWorkspaceOpen ? '1fr' : '1fr 1fr';
        videoGrid.style.gridTemplateRows = '1fr';
      } else {
        videoGrid.style.gridTemplateColumns = '1fr 1fr';
        videoGrid.style.gridTemplateRows = '1fr';
      }

      if (isWorkspaceOpen) {
        updateLineNumbers();
        if (whiteboardMgr) {
          setTimeout(() => whiteboardMgr.resize(), 100);
        }
      }
    }

    function switchDrawerTab(tabId) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');

      document.getElementById(`tab-btn-${tabId}`).classList.add('active');
      const pane = document.getElementById(`pane-${tabId}`);
      pane.style.display = 'flex';

      if (tabId === 'whiteboard' && whiteboardMgr) {
        setTimeout(() => whiteboardMgr.resize(), 50);
      }
    }

    function updateLineNumbers() {
      const lines = codeTextarea.value.split('\n').length;
      let nums = '';
      for (let i = 1; i <= lines; i++) nums += i + '\n';
      codeLineNumbers.textContent = nums;
    }

    function resetCodeEditor() {
      const q = questions[currentQIndex];
      codeTextarea.value = q.initialCode || '';
      updateLineNumbers();
      consoleOutput.style.display = 'none';
    }

    function runCodeSandbox() {
      soundFx.playTone(600, 'sine', 0.1);
      consoleOutput.style.display = 'block';
      const code = codeTextarea.value;
      try {
        let logs = [];
        const customConsole = { log: (...args) => logs.push(args.join(' ')) };
        const runnable = new Function('console', code);
        runnable(customConsole);
        consoleText.textContent = logs.length > 0 ? logs.join('\n') : 'Code executed successfully.';
      } catch (e) {
        consoleText.textContent = `Runtime Error: ${e.message}`;
      }
    }

    function setWbTool(toolName, btnEl) {
      document.querySelectorAll('.wb-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
      if (whiteboardMgr) whiteboardMgr.tool = toolName;
    }

    function logTranscript(speaker, text) {
      if (!text) return;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      transcriptLog.push({ speaker, text, time });

      if (transcriptList) {
        transcriptList.innerHTML = transcriptLog.map(item => `
          <div class="transcript-item">
            <div class="transcript-speaker">${item.speaker} • ${item.time}</div>
            <div class="transcript-text">${item.text}</div>
          </div>
        `).join('');
      }
    }

    function handleNextQuestion() {
      soundFx.playQuestionNext();
      speechService.stopSpeaking();

      const userVal = roomTextInput.value.trim();
      if (userVal) logTranscript('Candidate', userVal);

      const q = questions[currentQIndex];
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
      responses[q.id] = {
        text: userVal,
        code: codeTextarea.value,
        whiteboardCount: whiteboardMgr ? whiteboardMgr.elementCount : 0,
        timeSpent
      };

      if (currentQIndex < questions.length - 1) {
        loadQuestion(currentQIndex + 1);
      } else {
        completeInterviewSession();
      }
    }

    function endInterviewEarly() {
      if (confirm('End interview session early?')) {
        handleNextQuestion();
      }
    }

    function completeInterviewSession() {
      clearInterval(timerInterval);
      speechService.stopSpeaking();
      speechService.stopListening();
      stopCandidateCamera();
      stopAiVisualizer();
      soundFx.playReportGenerated();

      const sessionDuration = 1800 - secondsRemaining;
      const sessionData = {
        role: sessionConfig.role,
        company: sessionConfig.company,
        difficulty: sessionConfig.difficulty,
        questions,
        responses,
        totalDurationSeconds: Math.max(30, sessionDuration)
      };

      renderReportView(sessionData);
      switchView('report');
    }

    function renderReportView(sessionData) {
      speechService.stopSpeaking();
      const report = generateFinalReport(sessionData);

      document.getElementById('report-meta-text').textContent = `Diagnostic report for ${report.role.name} (${report.company.name})`;
      document.getElementById('report-score-num').textContent = report.overallScore;

      const badgeEl = document.getElementById('report-hire-badge');
      badgeEl.textContent = report.recommendation;

      document.getElementById('metric-wpm').textContent = `${report.avgWpm} WPM`;
      document.getElementById('metric-fillers').textContent = `${report.totalFillers} Fillers`;
      document.getElementById('metric-words').textContent = `${report.totalWords}`;
      document.getElementById('metric-time').textContent = `${Math.round(report.totalDurationSeconds / 60)} Mins`;

      renderRadarCanvas(report.radarMetrics);

      const listEl = document.getElementById('report-questions-list');
      listEl.innerHTML = report.questionEvaluations.map((item, idx) => `
        <div class="report-q-card">
          <div class="q-card-head">
            <div class="q-title">Q${idx + 1}: ${item.question.title}</div>
            <div class="q-score">${item.evaluation.score}/100</div>
          </div>
          <p class="q-prompt">"${item.question.prompt}"</p>
          <div class="q-answer-box"><strong>Your Answer: </strong>${item.candidateResponse}</div>
          ${item.candidateCode ? `<pre class="q-code-pre">${item.candidateCode}</pre>` : ''}
          <div class="q-feedback-grid">
            <div class="feedback-box strengths">
              <div class="box-title">Strengths</div>
              <ul>${item.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
            <div class="feedback-box improvements">
              <div class="box-title">Areas to improve</div>
              <ul>${item.improvements.map(imp => `<li>${imp}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
      `).join('');

      saveReportHistory(report);
    }

    function renderRadarCanvas(metrics) {
      const canvas = document.getElementById('canvas-radar');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = 85;

      ctx.clearRect(0, 0, w, h);
      const labels = [
        { key: 'technicalDepth', label: 'Technical' },
        { key: 'communication', label: 'Communication' },
        { key: 'problemSolving', label: 'Problem Solving' },
        { key: 'starStructure', label: 'STAR' },
        { key: 'confidence', label: 'Confidence' }
      ];
      const n = labels.length;

      for (let lvl = 1; lvl <= 5; lvl++) {
        const rad = (r / 5) * lvl;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * rad;
          const y = cy + Math.sin(angle) * rad;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();
      }

      ctx.font = '10px Roboto, sans-serif';
      ctx.fillStyle = '#9aa0a6';
      ctx.textAlign = 'center';

      labels.forEach((l, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * (r + 20);
        const y = cy + Math.sin(angle) * (r + 20);
        ctx.fillText(l.label, x, y);
      });

      ctx.beginPath();
      labels.forEach((l, i) => {
        const val = (metrics[l.key] || 70) / 100;
        const rad = r * val;
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * rad;
        const y = cy + Math.sin(angle) * rad;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();

      ctx.fillStyle = 'rgba(138, 180, 248, 0.25)';
      ctx.fill();
      ctx.strokeStyle = '#8ab4f8';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function startAiVisualizerCanvas() {
      const canvas = document.getElementById('canvas-ai-visualizer');
      if (!canvas) return;
      stopAiVisualizer();
      const ctx = canvas.getContext('2d');
      let angle = 0;

      const draw = () => {
        if (currentView !== 'room') return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        angle += 0.03;

        ctx.beginPath();
        ctx.arc(cx, cy, 48 + Math.sin(angle * 2) * 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(138, 180, 248, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 40);
        grad.addColorStop(0, '#8ab4f8');
        grad.addColorStop(1, '#1a73e8');
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        aiCanvasAnimId = requestAnimationFrame(draw);
      };
      draw();
    }

    function saveReportHistory(report) {
      try {
        const history = JSON.parse(localStorage.getItem('interview_history') || '[]');
        history.unshift(report);
        localStorage.setItem('interview_history', JSON.stringify(history.slice(0, 20)));
      } catch (e) {
        console.warn('History save error:', e);
      }
    }

    function openHistoryModal() {
      const container = document.getElementById('history-list-container');
      const history = JSON.parse(localStorage.getItem('interview_history') || '[]');
      if (history.length === 0) {
        container.innerHTML = '<div class="empty-history">No past interview reports saved yet.</div>';
      } else {
        container.innerHTML = history.map(item => `
          <div class="history-item">
            <div>
              <div style="font-weight:600">${item.role.name}</div>
              <div style="font-size:0.8rem;color:var(--text-muted)">${new Date(item.timestamp).toLocaleDateString()} • ${item.company.name}</div>
            </div>
            <div style="font-weight:700;color:var(--gm-blue)">${item.overallScore} / 100</div>
          </div>
        `).join('');
      }
      modalHistory.style.display = 'flex';
    }

    function clearHistory() {
      if (confirm('Clear all interview history?')) {
        localStorage.removeItem('interview_history');
        openHistoryModal();
      }
    }

    function exportReportJSON() {
      const history = JSON.parse(localStorage.getItem('interview_history') || '[]');
      const report = history[0];
      if (!report) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
      const dl = document.createElement('a');
      dl.setAttribute("href", dataStr);
      dl.setAttribute("download", `interview_report_${Date.now()}.json`);
      document.body.appendChild(dl);
      dl.click();
      dl.remove();
    }
  });
})();