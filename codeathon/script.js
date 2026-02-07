// AI Interview Intelligence Platform - Vanilla JS
(function () {
  const app = {
    currentUser: null,
    userResume: null,
    currentRound: null,
    currentQuestionIndex: 0,
    answers: [],
    scores: {},
    startTime: null,
    isMockInterview: false,
    mockType: null,

    // Question Banks
    questionBanks: {
      aptitude: [
        { id: 'apt1', topic: 'Aptitude', type: 'mcq', difficulty: 'easy', text: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correct: 0, keywords: ['15', '200', '30'] },
        { id: 'apt2', topic: 'Aptitude', type: 'mcq', difficulty: 'easy', text: 'A train travels 300km in 5 hours. What is its average speed?', options: ['50km/h', '60km/h', '80km/h', '100km/h'], correct: 1, keywords: ['300', 'speed', '60'] },
        { id: 'apt3', topic: 'Aptitude', type: 'mcq', difficulty: 'medium', text: 'If x + y = 10 and x - y = 2, what is x?', options: ['4', '6', '8', '12'], correct: 1, keywords: ['equation', '6', 'solving'] },
        { id: 'apt4', topic: 'Aptitude', type: 'mcq', difficulty: 'medium', text: 'What percentage is 25 out of 200?', options: ['10%', '12.5%', '15%', '20%'], correct: 1, keywords: ['percentage', '12.5', '25'] },
        { id: 'apt5', topic: 'Aptitude', type: 'mcq', difficulty: 'hard', text: 'A compound interest problem: If 1000 becomes 1210 in 2 years at compound interest, what is the rate per annum?', options: ['8%', '9%', '10%', '12%'], correct: 2, keywords: ['compound interest', '10', '1210'] }
      ],
      coding: {
        python: [
          { id: 'cod1', topic: 'Python', type: 'code', difficulty: 'easy', text: 'Write a Python function that returns the sum of two numbers.', keywords: ['def', 'return', 'sum', '+'], expectedApproach: 'simple addition function' },
          { id: 'cod2', topic: 'Python', type: 'code', difficulty: 'easy', text: 'Write a function to reverse a string in Python.', keywords: ['reverse', 'slice', '::-1', 'def'], expectedApproach: 'string manipulation' },
          { id: 'cod3', topic: 'Python', type: 'code', difficulty: 'medium', text: 'Write a function that checks if a number is a palindrome.', keywords: ['palindrome', 'str', 'reverse', '=='], expectedApproach: 'condition checking' },
          { id: 'cod4', topic: 'Python', type: 'code', difficulty: 'medium', text: 'Write a function to find the second largest number in a list.', keywords: ['sort', 'list', 'max', 'index'], expectedApproach: 'list manipulation' },
          { id: 'cod5', topic: 'Python', type: 'code', difficulty: 'hard', text: 'Write a function to implement merge sort algorithm.', keywords: ['merge', 'sort', 'divide', 'recursion', 'list'], expectedApproach: 'divide and conquer' }
        ],
        javascript: [
          { id: 'cod1', topic: 'JavaScript', type: 'code', difficulty: 'easy', text: 'Write a function that returns the sum of two numbers.', keywords: ['function', 'return', '+', 'parameters'], expectedApproach: 'simple addition' },
          { id: 'cod2', topic: 'JavaScript', type: 'code', difficulty: 'easy', text: 'Write a function to reverse a string.', keywords: ['reverse', 'split', 'join', 'map'], expectedApproach: 'string methods' },
          { id: 'cod3', topic: 'JavaScript', type: 'code', difficulty: 'medium', text: 'Explain event delegation and write an example.', keywords: ['event', 'delegation', 'target', 'addEventListener'], expectedApproach: 'event handling' },
          { id: 'cod4', topic: 'JavaScript', type: 'code', difficulty: 'medium', text: 'Write a function that handles promises and async/await.', keywords: ['async', 'await', 'promise', '.then()'], expectedApproach: 'async programming' },
          { id: 'cod5', topic: 'JavaScript', type: 'code', difficulty: 'hard', text: 'Implement a debounce function.', keywords: ['debounce', 'setTimeout', 'closure', 'function'], expectedApproach: 'function composition' }
        ],
        java: [
          { id: 'cod1', topic: 'Java', type: 'code', difficulty: 'easy', text: 'Write a class to represent a Person with constructor.', keywords: ['class', 'public', 'constructor', 'this'], expectedApproach: 'OOP basics' },
          { id: 'cod2', topic: 'Java', type: 'code', difficulty: 'medium', text: 'Write a function to sort an array of integers.', keywords: ['Arrays.sort', 'loop', 'algorithm', 'comparator'], expectedApproach: 'sorting' },
          { id: 'cod3', topic: 'Java', type: 'code', difficulty: 'hard', text: 'Implement a singleton pattern.', keywords: ['singleton', 'static', 'private constructor', 'synchronized'], expectedApproach: 'design patterns' }
        ]
      },
      dsa: [
        { id: 'dsa1', topic: 'DSA', type: 'code', difficulty: 'easy', text: 'Explain binary search and write its implementation.', keywords: ['binary search', 'log n', 'divide', 'sorted', 'O(log n)'], expectedApproach: 'efficient searching' },
        { id: 'dsa2', topic: 'DSA', type: 'code', difficulty: 'easy', text: 'Write a function to find the maximum element in an array.', keywords: ['max', 'loop', 'compare', 'linear'], expectedApproach: 'simple traversal' },
        { id: 'dsa3', topic: 'DSA', type: 'code', difficulty: 'medium', text: 'Implement a linked list insertion operation.', keywords: ['linked list', 'node', 'pointer', 'insertion'], expectedApproach: 'linked list operations' },
        { id: 'dsa4', topic: 'DSA', type: 'code', difficulty: 'medium', text: 'How do you detect a cycle in a linked list?', keywords: ['two pointers', 'Floyd', 'cycle', 'detection', 'fast slow'], expectedApproach: 'pointer technique' },
        { id: 'dsa5', topic: 'DSA', type: 'code', difficulty: 'hard', text: 'Explain and implement the merge sort algorithm.', keywords: ['merge sort', 'divide conquer', 'O(n log n)', 'recursion', 'merge'], expectedApproach: 'efficient sorting' }
      ],
      hr: [
        { id: 'hr1', topic: 'HR', type: 'text', difficulty: 'easy', text: 'Tell me about yourself in 2-3 minutes.', keywords: ['background', 'experience', 'skills', 'motivation'], expectedApproach: 'professional introduction' },
        { id: 'hr2', topic: 'HR', type: 'text', difficulty: 'easy', text: 'Why do you want to work with us?', keywords: ['company', 'interests', 'align', 'values', 'goals'], expectedApproach: 'company research' },
        { id: 'hr3', topic: 'HR', type: 'text', difficulty: 'medium', text: 'Describe a time you handled a conflict in a team.', keywords: ['conflict', 'resolve', 'listen', 'compromise', 'outcome'], expectedApproach: 'leadership & communication' },
        { id: 'hr4', topic: 'HR', type: 'text', difficulty: 'medium', text: 'What are your strengths and weaknesses?', keywords: ['honest', 'self-aware', 'growth', 'improvement', 'specific'], expectedApproach: 'self-assessment' },
        { id: 'hr5', topic: 'HR', type: 'text', difficulty: 'hard', text: 'How do you prioritize when you have multiple deadlines?', keywords: ['prioritize', 'deadline', 'communication', 'strategy', 'organized'], expectedApproach: 'time management' }
      ]
    },

    // Initialize App
    init() {
      this.setupEventListeners();
      this.checkUserSession();
      this.showPage('loginPage');
    },

    // Page Management
    showPage(pageId) {
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      document.getElementById(pageId).classList.remove('hidden');
    },

    setupEventListeners() {
      // Login Flow
      document.getElementById('sendOtpBtn').addEventListener('click', () => this.sendOTP());
      document.getElementById('verifyOtpBtn').addEventListener('click', () => this.verifyOTP());
      document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

      // OTP auto-advance
      ['otp1', 'otp2', 'otp3', 'otp4'].forEach((id, i) => {
        document.getElementById(id).addEventListener('input', (e) => {
          if (e.target.value && i < 3) document.getElementById(['otp1', 'otp2', 'otp3', 'otp4'][i+1]).focus();
        });
      });

      // Resume Upload
      const resumeUpload = document.getElementById('resumeUpload');
      resumeUpload.addEventListener('click', () => document.getElementById('resumeFile').click());
      resumeUpload.addEventListener('dragover', (e) => { e.preventDefault(); resumeUpload.classList.add('bg-blue-50'); });
      resumeUpload.addEventListener('dragleave', () => resumeUpload.classList.remove('bg-blue-50'));
      resumeUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        resumeUpload.classList.remove('bg-blue-50');
        const files = e.dataTransfer.files;
        if (files.length) this.handleResumeUpload(files[0]);
      });
      document.getElementById('resumeFile').addEventListener('change', (e) => {
        if (e.target.files.length) this.handleResumeUpload(e.target.files[0]);
      });

      document.getElementById('proceedBtn').addEventListener('click', () => this.startInterview());
      document.getElementById('retryResumeBtn').addEventListener('click', () => this.resetResume());

      // Interview Controls
      document.getElementById('submitAnswerBtn').addEventListener('click', () => this.submitAnswer());
      document.getElementById('skipQuestionBtn').addEventListener('click', () => this.skipQuestion());

      // Mock Interview
      document.querySelectorAll('.mock-type-btn').forEach(btn => {
        btn.addEventListener('click', () => this.startMockInterview(btn.dataset.type));
      });
      document.getElementById('mockSubmitBtn').addEventListener('click', () => this.submitMockAnswer());
      document.getElementById('mockSkipBtn').addEventListener('click', () => this.skipMockQuestion());

      // Scorecard Exports
      document.getElementById('downloadPdfBtn').addEventListener('click', () => this.exportPDF());
      document.getElementById('downloadJsonBtn').addEventListener('click', () => this.exportJSON());
      document.getElementById('retakeMockBtn').addEventListener('click', () => {
        this.showPage('mockInterviewPage');
        document.getElementById('mockQuestionSection').classList.add('hidden');
      });
    },

    // Authentication
    sendOTP() {
      const email = document.getElementById('loginEmail').value.trim();
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      this.currentUser = { email, otp: '1234' }; // Mock OTP
      document.getElementById('otpSection').classList.remove('hidden');
      this.startOTPTimer();
    },

    startOTPTimer() {
      let time = 30;
      const timerEl = document.getElementById('timer');
      const interval = setInterval(() => {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
          clearInterval(interval);
          document.getElementById('otpTimer').innerHTML = '<button class="text-blue-600 font-medium">Resend OTP</button>';
        }
      }, 1000);
    },

    verifyOTP() {
      const otp = ['otp1', 'otp2', 'otp3', 'otp4'].map(id => document.getElementById(id).value).join('');
      if (otp === this.currentUser.otp) {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        document.getElementById('userEmail').textContent = this.currentUser.email;
        document.getElementById('logoutBtn').classList.remove('hidden');
        this.showPage('resumePage');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    },

    checkUserSession() {
      const user = localStorage.getItem('user');
      if (user) {
        this.currentUser = JSON.parse(user);
        document.getElementById('userEmail').textContent = this.currentUser.email;
        document.getElementById('logoutBtn').classList.remove('hidden');
      }
    },

    logout() {
      localStorage.removeItem('user');
      this.currentUser = null;
      this.userResume = null;
      this.currentRound = null;
      this.answers = [];
      this.scores = {};
      document.getElementById('userEmail').textContent = '';
      document.getElementById('logoutBtn').classList.add('hidden');
      this.showPage('loginPage');
    },

    // Resume Handling
    handleResumeUpload(file) {
      // Check file format first
      const isTextFile = file.type === 'text/plain' || file.type === 'text/plain; charset=utf-8' || file.name.endsWith('.txt');
      const fileSize = file.size;
      
      if (!isTextFile) {
        alert('Please upload a plain text file (.txt)\n\nSupported: Text files only\nNOT supported: PDF, Word, Images\n\nHow to convert:\n1. Open your resume in Word/Google Docs\n2. Export as "Plain Text" or "Text Only"\n3. Save with .txt extension\n4. Upload here');
        this.resetResume();
        return;
      }

      if (fileSize === 0) {
        alert('File is empty. Please upload a file with resume content.');
        this.resetResume();
        return;
      }

      if (fileSize > 5 * 1024 * 1024) { // 5MB limit
        alert('File is too large. Please keep resume under 5MB.');
        this.resetResume();
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => {
        alert('Error reading file. Please ensure the file is a valid text file.');
        this.resetResume();
      };
      reader.onload = (e) => {
        try {
          let text = e.target.result;
          
          // Check if content looks like valid text or if it's garbled
          if (!text || text.trim().length === 0) {
            alert('Uploaded file appears to be empty or not a valid text file. Please upload a file with content.');
            this.resetResume();
            return;
          }

          // Check for binary/garbled content indicators
          const nonPrintableChars = (text.match(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g) || []).length;
          const totalChars = text.length;
          const garbledRatio = nonPrintableChars / totalChars;

          if (garbledRatio > 0.2) { // More than 20% non-printable chars = likely binary
            alert('The uploaded file contains binary or unreadable content.\n\nPlease convert your resume to plain text format:\n1. Open resume in Word/Google Docs\n2. Save As → Plain Text (.txt)\n3. Upload the .txt file');
            this.resetResume();
            return;
          }

          // Extract first 2000 chars and trim
          text = text.substring(0, 2000).trim();

          if (text.length < 20) {
            alert('Resume content is too short. Please upload a resume with at least some content.');
            this.resetResume();
            return;
          }

          this.userResume = { fileName: file.name, content: text, skills: [], languages: [], validation: [] };
          this.validateAndExtractResume(text);
        } catch (error) {
          alert('Error processing resume: ' + error.message);
          this.resetResume();
        }
      };
      
      reader.readAsText(file, 'UTF-8');
    },

    validateAndExtractResume(content) {
      const resumeText = content.toLowerCase();
      const skills = [];
      const languages = [];
      const validation = [];

      // Check if content looks reasonable
      if (content.length < 50) {
        validation.push('✗ Resume content is too short to analyze properly');
      } else {
        validation.push('✓ Resume content loaded successfully');
      }

      // Extract skills
      const skillList = ['python', 'javascript', 'java', 'cpp', 'nodejs', 'react', 'django', 'spring', 'sql', 'aws', 'docker', 'c#', '.net', 'sql server', 'mysql', 'mongodb', 'firebase', 'kubernetes', 'terraform'];
      skillList.forEach(skill => {
        if (resumeText.includes(skill)) {
          skills.push(skill);
          validation.push(`✓ Found skill: ${skill}`);
        }
      });

      // Extract programming languages
      if (resumeText.includes('python')) languages.push('python');
      if (resumeText.includes('javascript') || resumeText.includes('js')) languages.push('javascript');
      if (resumeText.includes('java') && !resumeText.includes('javascript')) languages.push('java');
      if (resumeText.includes('c++') || resumeText.includes('cpp')) languages.push('cpp');

      // Format validation
      if (content.length > 200) {
        validation.push('✓ Resume has substantial content (' + content.length + ' characters)');
      } else if (content.length > 50) {
        validation.push('⚠ Resume is relatively short (' + content.length + ' characters)');
      }

      if (resumeText.includes('experience') && resumeText.includes('education')) {
        validation.push('✓ Standard resume sections detected (Experience & Education)');
      } else if (resumeText.includes('experience') || resumeText.includes('education')) {
        validation.push('✓ Resume sections detected');
      }

      if (skills.length === 0) {
        validation.push('⚠ No programming skills detected - general interview will be used');
        this.userResume.skills = ['general'];
        this.userResume.languages = ['general'];
      } else {
        validation.push(`✓ Interview will be customized for: ${[...new Set(skills)].join(', ')}`);
        this.userResume.skills = [...new Set(skills)];
        this.userResume.languages = languages.length ? languages : ['general'];
      }

      this.userResume.validation = validation;

      // Hide resume preview and validation details (backend verification only)
      document.getElementById('resumePreview').classList.add('hidden');
      document.getElementById('validationResults').classList.add('hidden');

      // Show only success message and proceed button
      document.getElementById('resumeVerifiedMessage').classList.remove('hidden');
      document.getElementById('proceedBtn').classList.remove('hidden');
      document.getElementById('retryResumeBtn').classList.remove('hidden');
      
      // Log validation data in console for verification (backend view)
      console.log('Resume Verification (Backend):', {
        fileName: this.userResume.fileName,
        contentLength: content.length,
        skills: this.userResume.skills,
        languages: this.userResume.languages,
        validation: this.userResume.validation
      });
    },

    resetResume() {
      this.userResume = null;
      document.getElementById('resumeFile').value = '';
      document.getElementById('resumePreview').classList.add('hidden');
      document.getElementById('validationResults').classList.add('hidden');
      document.getElementById('resumeVerifiedMessage').classList.add('hidden');
      document.getElementById('proceedBtn').classList.add('hidden');
      document.getElementById('retryResumeBtn').classList.add('hidden');
    },

    // Interview Engine
    startInterview() {
      if (!this.userResume) {
        alert('Please upload and verify your resume first');
        this.showPage('resumePage');
        return;
      }
      this.isMockInterview = false;
      this.answers = [];
      this.scores = {};
      this.currentQuestionIndex = 0;
      this.startTime = Date.now();
      this.currentRound = 'aptitude';
      this.showPage('interviewPage');
      this.displayQuestion();
    },

    displayQuestion() {
      const round = this.currentRound;
      let questionBank = this.questionBanks[round];

      if (round === 'coding' && this.userResume && this.userResume.languages && this.userResume.languages[0]) {
        questionBank = this.questionBanks.coding[this.userResume.languages[0]] || this.questionBanks.coding.python;
      }

      const totalQuestions = questionBank.length;
      const question = questionBank[this.currentQuestionIndex];

      if (!question) {
        if (round === 'aptitude') {
          this.currentRound = 'coding';
          this.currentQuestionIndex = 0;
          this.displayQuestion();
        } else if (round === 'coding') {
          this.currentRound = 'dsa';
          this.currentQuestionIndex = 0;
          this.displayQuestion();
        } else if (round === 'dsa') {
          this.currentRound = 'hr';
          this.currentQuestionIndex = 0;
          this.displayQuestion();
        } else {
          this.generateScorecard();
        }
        return;
      }

      // Update UI
      document.getElementById('roundLabel').textContent = `Round: ${round.charAt(0).toUpperCase() + round.slice(1)}`;
      document.getElementById('questionCounter').textContent = `Q${this.currentQuestionIndex + 1} / ${totalQuestions}`;
      document.getElementById('progressBar').style.width = `${((this.currentQuestionIndex + 1) / totalQuestions) * 100}%`;

      // For coding questions, hide language name and show only difficulty
      if (round === 'coding') {
        document.getElementById('questionMeta').textContent = `Difficulty: ${question.difficulty}`;
      } else {
        document.getElementById('questionMeta').textContent = `${question.topic} • ${question.difficulty}`;
      }
      document.getElementById('questionText').textContent = question.text;

      // Clear previous inputs
      document.getElementById('answerInput').value = '';
      document.getElementById('codeInput').value = '';
      document.getElementById('mcqSection').innerHTML = '';

      // Show appropriate input type
      if (question.type === 'code') {
        document.getElementById('codeEditorSection').classList.remove('hidden');
        document.getElementById('textAnswerSection').classList.add('hidden');
        document.getElementById('mcqSection').classList.add('hidden');
      } else if (question.type === 'mcq') {
        document.getElementById('codeEditorSection').classList.add('hidden');
        document.getElementById('textAnswerSection').classList.add('hidden');
        document.getElementById('mcqSection').classList.remove('hidden');
        this.renderMCQOptions(question);
      } else {
        document.getElementById('codeEditorSection').classList.add('hidden');
        document.getElementById('textAnswerSection').classList.remove('hidden');
        document.getElementById('mcqSection').classList.add('hidden');
      }

      this.currentQuestion = question;
    },

    renderMCQOptions(question) {
      const mcqSection = document.getElementById('mcqSection');
      mcqSection.innerHTML = '';
      question.options.forEach((option, idx) => {
        const label = document.createElement('label');
        label.className = 'flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition';
        label.innerHTML = `
          <input type="radio" name="mcq" value="${idx}" class="mr-3" />
          <span>${option}</span>
        `;
        mcqSection.appendChild(label);
      });
    },

    submitAnswer() {
      const question = this.currentQuestion;
      let answer = '';

      if (question.type === 'code') {
        answer = document.getElementById('codeInput').value;
      } else if (question.type === 'mcq') {
        const selected = document.querySelector('input[name="mcq"]:checked');
        if (!selected) {
          alert('Please select an option');
          return;
        }
        answer = selected.value;
      } else {
        answer = document.getElementById('answerInput').value;
      }

      if (!answer.trim()) {
        alert('Please provide an answer');
        return;
      }

      this.answers.push({
        questionId: question.id,
        round: this.currentRound,
        question: question.text,
        answer: answer,
        type: question.type,
        difficulty: question.difficulty,
        timestamp: new Date().toISOString()
      });

      this.currentQuestionIndex++;
      this.displayQuestion();
    },

    skipQuestion() {
      const question = this.currentQuestion;
      this.answers.push({
        questionId: question.id,
        round: this.currentRound,
        question: question.text,
        answer: '<<SKIPPED>>',
        type: question.type,
        difficulty: question.difficulty,
        timestamp: new Date().toISOString()
      });

      this.currentQuestionIndex++;
      this.displayQuestion();
    },

    // Scoring Engine
    generateScorecard() {
      try {
        const scores = { byDimension: {}, byRound: {}, perQuestion: [], weightedScores: [] };

        // Difficulty weights: easy=1x, medium=1.5x, hard=2x
        const difficultyWeights = { easy: 1, medium: 1.5, hard: 2 };

        const dimensions = ['Clarity', 'Technical Accuracy', 'Completeness', 'Confidence'];
        dimensions.forEach(d => { scores.byDimension[d] = { total: 0, count: 0, weightedTotal: 0, weightedCount: 0 }; });

        const rounds = ['aptitude', 'coding', 'dsa', 'hr'];
        rounds.forEach(r => { scores.byRound[r] = { total: 0, count: 0, weightedTotal: 0, questions: 0 }; });

        let totalWeight = 0;
        let weightedOverallSum = 0;

        this.answers.forEach(answer => {
          const questionScore = this.scoreAnswer(answer);
          const weight = difficultyWeights[answer.difficulty] || 1;
          questionScore.weight = weight;
          questionScore.weightedScore = questionScore.overall * weight;
          scores.perQuestion.push(questionScore);
          scores.weightedScores.push(questionScore.weightedScore);

          totalWeight += weight;
          weightedOverallSum += questionScore.weightedScore;

          // Aggregate scores
          Object.entries(questionScore.dimensions).forEach(([dim, score]) => {
            scores.byDimension[dim].total += score;
            scores.byDimension[dim].count++;
            scores.byDimension[dim].weightedTotal += score * weight;
            scores.byDimension[dim].weightedCount += weight;
          });

          scores.byRound[answer.round].total += questionScore.overall;
          scores.byRound[answer.round].weightedTotal += questionScore.weightedScore;
          scores.byRound[answer.round].count++;
          scores.byRound[answer.round].questions++;
        });

        // Calculate averages (both simple and weighted)
        const dimensionAverages = {};
        const dimensionWeightedAverages = {};
        Object.entries(scores.byDimension).forEach(([dim, data]) => {
          dimensionAverages[dim] = data.count > 0 ? (data.total / data.count).toFixed(2) : 0;
          dimensionWeightedAverages[dim] = data.weightedCount > 0 ? (data.weightedTotal / data.weightedCount).toFixed(2) : 0;
        });

        const roundAverages = {};
        Object.entries(scores.byRound).forEach(([round, data]) => {
          roundAverages[round] = data.count > 0 ? (data.total / data.count).toFixed(2) : 0;
        });

        // Overall score with weightage
        const overallScore = scores.perQuestion.length > 0
          ? (scores.perQuestion.reduce((sum, q) => sum + q.overall, 0) / scores.perQuestion.length).toFixed(2)
          : 0;
        const weightedOverallScore = totalWeight > 0
          ? (weightedOverallSum / totalWeight).toFixed(2)
          : 0;

        const recommendation = weightedOverallScore >= 4.0 ? 'Strong Hire' : weightedOverallScore >= 3.0 ? 'Hire' : weightedOverallScore >= 2.0 ? 'Borderline' : 'No Hire';

        // Calculate Clarity and Confidence averages (primary metrics)
        const clarityAvg = dimensionWeightedAverages['Clarity'] || 0;
        const confidenceAvg = dimensionWeightedAverages['Confidence'] || 0;

        const strengths = Object.entries(dimensionWeightedAverages)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([dim, score]) => `${dim} (${score}/5)`);

        const improvements = Object.entries(dimensionWeightedAverages)
          .sort((a, b) => a[1] - b[1])
          .slice(0, 3)
          .map(([dim, score]) => `${dim} (${score}/5)`);

        this.scores = {
          overallScore,
          weightedOverallScore,
          clarityAvg,
          confidenceAvg,
          recommendation,
          dimensionAverages,
          dimensionWeightedAverages,
          roundAverages,
          byRound: scores.byRound,
          strengths,
          improvements,
          perQuestion: scores.perQuestion,
          totalTime: Math.round((Date.now() - this.startTime) / 60000),
          questionsAnswered: this.answers.filter(a => a.answer !== '<<SKIPPED>>').length,
          totalWeight: totalWeight.toFixed(2)
        };

        this.displayScorecard();
      } catch (error) {
        console.error('Error generating scorecard:', error);
        alert('Error generating scorecard. Please refresh the page and try again.');
      }
    },

    scoreAnswer(answer) {
      const text = answer.answer.toLowerCase();
      const wordCount = text.split(/\s+/).length;
      let clarity = 2, technicalAccuracy = 2, completeness = 2, confidence = 2;

      if (answer.type === 'mcq') {
        const isCorrect = parseInt(answer.answer) === (this.currentQuestion?.correct || 0);
        clarity = technicalAccuracy = completeness = confidence = isCorrect ? 5 : 1;
      } else if (answer.answer === '<<SKIPPED>>') {
        clarity = technicalAccuracy = completeness = confidence = 0;
      } else {
        // Enhanced heuristic scoring with emphasis on Clarity and Confidence
        
        // CLARITY SCORING (Primary metric)
        let clarityScore = 1.5;
        // Presence of logical structure/connectors
        const logicalConnectors = ['because', 'therefore', 'thus', 'hence', 'first', 'second', 'third', 'finally', 'algorithm', 'approach', 'method'];
        const connectorCount = logicalConnectors.filter(c => text.includes(c)).length;
        clarityScore += connectorCount * 0.8;
        // Sentence structure quality (multiple sentences)
        const sentenceCount = (text.match(/\.|\\?|\\!/g) || []).length;
        if (sentenceCount > 2) clarityScore += 1;
        // Word count adequacy
        if (wordCount > 15) clarityScore += 0.5;
        clarity = Math.min(5, clarityScore);

        // CONFIDENCE SCORING (Primary metric)
        let confidenceScore = 2.5;
        // Assertive language
        const assertiveWords = ['definitely', 'certainly', 'always', 'clearly', 'obviously', 'absolutely', 'without doubt'];
        const hesitantWords = ['maybe', 'think', 'probably', 'perhaps', 'might', 'could be', 'sort of'];
        const assertiveCount = assertiveWords.filter(w => text.includes(w)).length;
        const hesitantCount = hesitantWords.filter(w => text.includes(w)).length;
        confidenceScore += (assertiveCount * 0.8) - (hesitantCount * 0.7);
        // Answer length correlates with confidence
        if (wordCount > 50) confidenceScore += 0.8;
        if (wordCount > 100) confidenceScore += 0.8;
        confidence = Math.min(5, Math.max(1, confidenceScore));

        // TECHNICAL ACCURACY
        if (text.match(/\d+|true|false|correct|algorithm|function|class|structure|api|database|cache/))
          technicalAccuracy = Math.min(5, technicalAccuracy + 1.5);
        if (text.includes('implementation') || text.includes('solution')
          || text.includes('approach') || text.includes('strategy'))
          technicalAccuracy = Math.min(5, technicalAccuracy + 0.8);

        // COMPLETENESS
        if (wordCount > 20) completeness = Math.min(5, 2 + (wordCount / 50));
        if (sentenceCount > 3) completeness = Math.min(5, completeness + 0.5);
      }

      // Weighted average emphasizing Clarity (35%) and Confidence (35%), other dims (30%)
      const weightedOverall = (clarity * 0.35 + confidence * 0.35 + technicalAccuracy * 0.2 + completeness * 0.1);

      return {
        ...answer,
        dimensions: {
          'Clarity': Math.round(clarity),
          'Technical Accuracy': Math.round(technicalAccuracy),
          'Completeness': Math.round(completeness),
          'Confidence': Math.round(confidence)
        },
        overall: Math.round(weightedOverall)
      };
    },

    displayScorecard() {
      const scores = this.scores;

      document.getElementById('overallScore').textContent = scores.weightedOverallScore;
      document.getElementById('recommendationText').textContent = scores.recommendation;
      document.getElementById('questionsAnswered').textContent = scores.questionsAnswered;
      document.getElementById('timeTaken').textContent = `${scores.totalTime}m`;

      // KEY METRICS: Clarity, Confidence, and Weighted Score - Featured at Top
      let dimensionScoresHTML = `
        <div class="border-l-4 border-blue-600 bg-blue-50 p-4 rounded mb-4">
          <h4 class="font-bold text-blue-800 mb-3">📊 Primary Performance Metrics</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-3 rounded">
              <div class="text-xs text-gray-600 mb-1">Clarity Score</div>
              <div class="text-3xl font-bold text-blue-600">${scores.clarityAvg}</div>
              <div class="text-xs text-gray-600 mt-1">/ 5.0</div>
              <div class="mt-2 text-xs text-gray-700">How well-presented your answers are</div>
            </div>
            <div class="bg-white p-3 rounded">
              <div class="text-xs text-gray-600 mb-1">Confidence Score</div>
              <div class="text-3xl font-bold text-purple-600">${scores.confidenceAvg}</div>
              <div class="text-xs text-gray-600 mt-1">/ 5.0</div>
              <div class="mt-2 text-xs text-gray-700">Assurance & conviction in answers</div>
            </div>
            <div class="bg-white p-3 rounded">
              <div class="text-xs text-gray-600 mb-1">Weighted Score</div>
              <div class="text-3xl font-bold text-green-600">${scores.weightedOverallScore}</div>
              <div class="text-xs text-gray-600 mt-1">/ 5.0 (Difficulty adjusted)</div>
              <div class="mt-2 text-xs text-gray-700">Based on question difficulty</div>
            </div>
          </div>
        </div>
      `;

      // All Dimension Scores
      dimensionScoresHTML += `<h4 class="font-bold mb-3 mt-4">📈 All Dimensions (Weighted)</h4>`;
      dimensionScoresHTML += Object.entries(scores.dimensionWeightedAverages)
        .map(([dim, score]) => {
          const percentage = (parseFloat(score) / 5) * 100;
          const simpleScore = scores.dimensionAverages[dim];
          return `
            <div class="mb-3">
              <div class="flex justify-between mb-2">
                <span class="font-medium">${dim}</span>
                <span class="text-xs text-gray-600">${simpleScore} → <strong class="text-blue-600">${score}/5</strong></span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style="width: ${percentage}%"></div>
              </div>
            </div>
          `;
        }).join('');
      document.getElementById('dimensionScores').innerHTML = dimensionScoresHTML;

      // Round Scores
      const roundScoresHTML = Object.entries(scores.roundAverages)
        .filter(([_, score]) => score > 0)
        .map(([round, score]) => `
          <div class="text-center p-4 border rounded-lg">
            <p class="text-sm text-gray-600 mb-2">${round.charAt(0).toUpperCase() + round.slice(1)}</p>
            <p class="text-2xl font-bold text-blue-600">${score}</p>
            <p class="text-xs text-gray-500">${scores.byRound[round].questions} questions</p>
          </div>
        `).join('');
      document.getElementById('roundScores').innerHTML = roundScoresHTML;

      // Strengths and Improvements
      document.getElementById('strengthsList').innerHTML = scores.strengths.map(s => `<li>✓ ${s}</li>`).join('');
      document.getElementById('improvementsList').innerHTML = scores.improvements.map(s => `<li>→ ${s}</li>`).join('');

      // Answers Review
      const answersReviewHTML = scores.perQuestion
        .map((q, idx) => {
          const weightageColor = q.weight >= 2 ? 'bg-red-100 border-red-300' : q.weight >= 1.5 ? 'bg-yellow-100 border-yellow-300' : 'bg-green-100 border-green-300';
          const weightageLabel = q.weight >= 2 ? 'Hard (2x)' : q.weight >= 1.5 ? 'Medium (1.5x)' : 'Easy (1x)';
          return `
            <div class="border rounded-lg p-4 mb-3">
              <div class="flex justify-between items-start mb-2">
                <div class="font-medium">Q${idx + 1}: ${q.question.substring(0, 100)}${q.question.length > 100 ? '...' : ''}</div>
                <span class="px-2 py-1 text-xs font-bold rounded ${weightageColor}">${weightageLabel}</span>
              </div>
              <div class="bg-gray-50 p-3 rounded text-sm mb-3">
                <strong>Your Answer:</strong> ${q.answer === '<<SKIPPED>>' ? '<em class="text-gray-500">Skipped</em>' : q.answer.substring(0, 200) + (q.answer.length > 200 ? '...' : '')}
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-2">
                ${Object.entries(q.dimensions).map(([dim, score]) => {
                  const isPrimary = dim === 'Clarity' || dim === 'Confidence' ? 'bg-blue-100 font-bold' : '';
                  return `<div class="p-2 rounded ${isPrimary}">${dim}: <span class="text-blue-600">${score}/5</span></div>`;
                }).join('')}
              </div>
              <div class="text-xs text-gray-700 pt-2 border-t">
                Score: <strong>${q.overall}/5</strong> | Weighted: <strong>${q.weightedScore.toFixed(1)}</strong> (×${q.weight})
              </div>
            </div>
          `;
        }).join('');
      document.getElementById('answersReview').innerHTML = answersReviewHTML;

      this.showPage('scorecardPage');
    },

    // Mock Interview
    startMockInterview(type) {
      this.isMockInterview = true;
      this.mockType = type;
      this.answers = [];
      this.currentQuestionIndex = 0;      let questionCount = 5;
      let selectedRounds = [];

      switch (type) {
        case 'quick': questionCount = 5; selectedRounds = ['aptitude']; break;
        case 'focused': questionCount = 5; selectedRounds = ['coding', 'dsa']; break;
        case 'full': questionCount = 20; selectedRounds = ['aptitude', 'coding', 'dsa', 'hr']; break;
        case 'behavioral': questionCount = 5; selectedRounds = ['hr']; break;
      }

      this.mockQuestions = [];
      selectedRounds.forEach(round => {
        const questions = this.questionBanks[round] || [];
        this.mockQuestions = this.mockQuestions.concat(questions.slice(0, Math.ceil(questionCount / selectedRounds.length)));
      });

      document.getElementById('mockRoundLabel').textContent = `Practice: ${type.charAt(0).toUpperCase() + type.slice(1)} Round`;
      document.getElementById('mockQuestionSection').classList.remove('hidden');
      this.displayMockQuestion();
    },

    displayMockQuestion() {
      if (this.currentQuestionIndex >= this.mockQuestions.length) {
        alert('Mock interview completed! Check regular scorecard for detailed feedback.');
        this.showPage('mockInterviewPage');
        document.getElementById('mockQuestionSection').classList.add('hidden');
        return;
      }

      const question = this.mockQuestions[this.currentQuestionIndex];
      document.getElementById('mockQuestionCounter').textContent = `Q${this.currentQuestionIndex + 1} / ${this.mockQuestions.length}`;
      document.getElementById('mockProgressBar').style.width = `${((this.currentQuestionIndex + 1) / this.mockQuestions.length) * 100}%`;
      document.getElementById('mockQuestionText').textContent = question.text;
      document.getElementById('mockAnswerInput').value = '';
      document.getElementById('mockFeedback').classList.add('hidden');

      this.currentMockQuestion = question;
    },

    submitMockAnswer() {
      const answer = document.getElementById('mockAnswerInput').value.trim();
      if (!answer) {
        alert('Please provide an answer');
        return;
      }

      // Quick feedback
      let feedback = '✓ Good effort! ';
      if (answer.length < 20) feedback += 'Tip: Try to provide more detail.';
      else if (answer.includes('because') || answer.includes('algorithm')) feedback += 'Great explanation with reasoning!';
      else feedback += 'Well done!';

      document.getElementById('mockFeedbackText').textContent = feedback;
      document.getElementById('mockFeedback').classList.remove('hidden');

      setTimeout(() => {
        this.currentQuestionIndex++;
        this.displayMockQuestion();
      }, 2000);
    },

    skipMockQuestion() {
      this.currentQuestionIndex++;
      this.displayMockQuestion();
    },

    // Export Functions
    exportPDF() {
      const element = this.generateScorecardHTML();
      const opt = {
        margin: 10,
        filename: `Interview_Scorecard_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      };
      html2pdf().set(opt).from(element).save();
    },

    exportJSON() {
      const data = {
        user: this.currentUser.email,
        resume: this.userResume,
        scores: {
          overallScore: this.scores.overallScore,
          weightedOverallScore: this.scores.weightedOverallScore,
          clarityScore: this.scores.clarityAvg,
          confidenceScore: this.scores.confidenceAvg,
          recommendation: this.scores.recommendation,
          dimensionAverages: this.scores.dimensionAverages,
          dimensionWeightedAverages: this.scores.dimensionWeightedAverages,
          roundAverages: this.scores.roundAverages,
          questionsAnswered: this.scores.questionsAnswered,
          totalTime: this.scores.totalTime,
          totalWeight: this.scores.totalWeight,
          scoringMethodology: {
            clarity: '35% weight - How well-articulated and logically structured',
            confidence: '35% weight - Based on assertive language and comprehensiveness',
            technicalAccuracy: '20% weight - Correctness and technical depth',
            completeness: '10% weight - Coverage of key concepts',
            difficultyWeighting: 'Easy (1x), Medium (1.5x), Hard (2x)'
          }
        },
        answers: this.answers,
        perQuestionDetails: this.scores.perQuestion,
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Interview_Data_${new Date().getTime()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },

    generateScorecardHTML() {
      const scores = this.scores;
      return `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Interview Scorecard Report</h1>
          <p><strong>Candidate:</strong> ${this.currentUser.email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">Overall Performance</h2>
          <p><strong>Overall Score (Weighted):</strong> ${scores.weightedOverallScore}/5</p>
          <p><strong>Simple Average Score:</strong> ${scores.overallScore}/5</p>
          <p><strong>Recommendation:</strong> <span style="font-weight: bold; color: ${scores.recommendation === 'Strong Hire' ? '#16a34a' : scores.recommendation === 'Hire' ? '#2563eb' : scores.recommendation === 'Borderline' ? '#ea580c' : '#dc2626'}">${scores.recommendation}</span></p>
          <p><strong>Questions Answered:</strong> ${scores.questionsAnswered}</p>
          <p><strong>Time Taken:</strong> ${scores.totalTime} minutes</p>

          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">Primary Metrics (Weighted)</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
            <tr>
              <th style="border: 1px solid #ddd; padding: 10px; background-color: #f3f4f6;">Clarity Score</th>
              <th style="border: 1px solid #ddd; padding: 10px; background-color: #f3f4f6;">Confidence Score</th>
              <th style="border: 1px solid #ddd; padding: 10px; background-color: #f3f4f6;">Difficulty Weight</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>${scores.clarityAvg}/5</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>${scores.confidenceAvg}/5</strong></td>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>${scores.totalWeight}x</strong></td>
            </tr>
          </table>

          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">All Dimension Scores (Weighted)</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
            <tr>
              <th style="border: 1px solid #ddd; padding: 10px; background-color: #f3f4f6;">Dimension</th>
              <th style="border: 1px solid #ddd; padding: 10px; background-color: #f3f4f6;">Score (Weighted)</th>
            </tr>
            ${Object.entries(scores.dimensionWeightedAverages).map(([dim, score]) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">${dim}</td>
              <td style="border: 1px solid #ddd; padding: 10px;"><strong>${score}/5</strong></td>
            </tr>
            `).join('')}
          </table>

          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">Strengths</h2>
          <ul>
            ${scores.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>

          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">Areas for Improvement</h2>
          <ul>
            ${scores.improvements.map(s => `<li>${s}</li>`).join('')}
          </ul>

          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 20px;">Scoring Methodology</h2>
          <p style="font-size: 12px; color: #666;">
            <strong>Clarity (35% weight):</strong> Measures how well-articulated and logically structured your answers are.<br>
            <strong>Confidence (35% weight):</strong> Heuristic assessment based on assertive language and answer comprehensiveness.<br>
            <strong>Technical Accuracy (20% weight):</strong> Measures correctness and technical depth of responses.<br>
            <strong>Completeness (10% weight):</strong> Assesses coverage of key concepts and answer depth.<br>
            <strong>Difficulty Weighting:</strong> Easy questions (1x), Medium questions (1.5x), Hard questions (2x).
          </p>
        </div>
      `;
    }
  };

  // Initialize
  app.init();
  window.interviewApp = app;
})();
