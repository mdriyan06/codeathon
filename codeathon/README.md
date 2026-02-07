# 🚀 AI Interview Intelligence Platform

## Overview

A fully-featured browser-based interview assessment platform that automatically conducts interviews, captures answers, evaluates responses across multiple dimensions, and generates structured scorecards—all without requiring a backend server.

---

## ✨ Key Features

### 1. **Authentication & Security**
- Email-based OTP verification (mock: OTP is `1234`)
- Session management with localStorage
- Secure logout with data clearance

### 2. **Resume Upload & Analysis**
- Drag-and-drop resume upload
- Automatic skill extraction (Python, JavaScript, Java, C++, etc.)
- Resume format validation
- Customized interview questions based on detected skills

### 3. **Multi-Round Interview Process**
- **Aptitude Round** (5 MCQ questions)
- **Coding Round** (5 language-specific code problems)
- **DSA Round** (5 algorithm/data structure questions)
- **HR Round** (5 behavioral questions)

### 4. **Intelligent Scoring Engine**
Scores each answer across **4 dimensions**:
- **Clarity** — How well-articulated and focused the answer is
- **Technical Accuracy** — Correctness and technical depth
- **Completeness** — Coverage of key concepts
- **Confidence** — Heuristic assessment based on language and answer structure

**Scoring Logic:**
- Non-skipped answers: 0-5 scale based on keywords, word count, language patterns
- MCQ answers: Binary (5 if correct, 1 if incorrect)
- Skipped questions: 0 across all dimensions

### 5. **Instant Scorecard Generation**
- Overall score and hiring recommendation
- Per-question breakdown with scores
- Dimension averages
- Round-wise analysis
- AI-identified strengths and improvement areas

### 6. **Export Capabilities**
- **PDF Report** — Professional, printable scorecard with complete analysis
- **JSON Export** — Full interview data, answers, and scores for integration

### 7. **Mock Interview Practice**
- **Quick Round** — 5 random questions in 10 minutes
- **Focused Round** — Topic-specific practice (Coding + DSA)
- **Full Interview** — Complete 20-question session
- **Behavioral Round** — HR practice only
- Instant feedback on mock answers
- Separate from scored interviews

---

## 🎨 Design & UX

- **Light, Modern Aesthetic** — Gradient backgrounds (blue, purple, pink)
- **Responsive Layout** — Mobile, tablet, and desktop optimized
- **Accessibility** — Clear typography, high contrast, intuitive navigation
- **Progress Indicators** — Visual feedback on interview progress
- **Professional Interface** — Recruiter-focused design

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required
- No installation needed

### How to Run

#### Option 1: Direct File Open
1. **Open `index.html` in your browser**
   - Double-click `index.html`, or
   - Right-click → "Open with" → Your preferred browser

#### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server
```
Then open: `http://localhost:8000`

---

## 📋 User Flow

### 1. **Login**
- Enter email address
- Click "Send OTP to Email"
- Enter OTP: `1234` (demo OTP)
- Click "Verify OTP"

### 2. **Resume Upload**
- Click upload area or drag resume
- Supported formats: `.pdf`, `.doc`, `.docx`, `.txt`
- System validates resume and extracts skills
- Proceed to interview

### 3. **Interview**
- Answer 20 total questions across 4 rounds
- Submit each answer or skip
- Progress tracked in real-time

### 4. **View Scorecard**
- Overall score (0-5)
- Hiring recommendation
- Per-dimension analysis
- Strengths and improvement areas
- Detailed answer review

### 5. **Export & Archive**
- Download PDF report
- Export JSON for records
- Try mock interviews for practice

---

## 🧪 Sample Test Data

### Test Login Credentials
```
Email: test@example.com
OTP: 1234
```

### Sample Resume Content
For auto-skill detection, include these keywords in your resume:

```
Professional Experience
Python Django Developer at Tech Corp
- Built REST APIs with Python and Django
- Optimized database queries for 10x performance
- Managed PostgreSQL and Redis databases
- AWS Lambda deployment

Skills:
JavaScript, Python, Java, C++, Node.js, React, 
SQL, AWS, Docker, System Design, Algorithm Design

Certifications in DSA and Full-Stack Development
```

### Key Points for Testing
- **Resume keywords matter** — Include specific languages/technologies
- **Mock OTP** — Always use `1234`
- **Skill-based questions** — Resume analysis determines coding language
- **Interview proceeds** — Regardless of answers (for demo purposes)

---

## 📊 Scoring Details

### Scoring Rules

| Dimension | How It's Scored |
|-----------|-----------------|
| **Clarity** | Based on presence of logical connectors (because, therefore, first, second), keyword density, and structured sentences |
| **Technical Accuracy** | Measured by presence of domain-specific keywords and technical terms matching expected topics |
| **Completeness** | Assessed by word count (vs. question difficulty) and coverage of expected concepts |
| **Confidence** | Heuristic based on assertive language (definitely, certainly) vs. hedging (maybe, think, probably) |

### Hiring Recommendation
- **Strong Hire**: Overall ≥ 4.0
- **Hire**: Overall ≥ 3.0
- **Borderline**: Overall ≥ 2.0
- **No Hire**: Overall < 2.0

---

## 💾 Data Storage

- **User sessions**: Stored in browser's `localStorage`
- **Interview data**: Never leaves your browser
- **No cloud sync**: All data is local and private
- **Export anytime**: Download your complete profile as JSON or PDF

---

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS via CDN)
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **PDF Generation**: html2pdf.js library (CDN)
- **Storage**: Browser localStorage API
- **Styling**: Tailwind CSS with custom gradients

---

## 📁 File Structure

```
/codeathon/
├── index.html          # Main HTML (all pages in SPA)
├── script.js           # Core logic, scoring engine, state management
└── README.md           # This file
```

**Total Size**: ~50KB (highly optimized)

---

## 🎯 Interview Question Bank

### Aptitude (5 questions, MCQ)
- Percentage calculations
- Speed/distance problems
- Algebraic equations
- Compound interest

### Coding (5 language-specific questions)
- **Python**: String reversal, palindrome check, list operations, merge sort
- **JavaScript**: Event delegation, async/await, debounce pattern
- **Java**: OOP principles, sorting, design patterns

### DSA (5 algorithm questions)
- Binary search explanation
- Array max element
- Linked list operations
- Cycle detection (Floyd's algorithm)
- Merge sort implementation

### HR (5 behavioral questions)
- Self introduction
- Company research/motivation
- Conflict resolution
- Strengths/weaknesses
- Deadline prioritization

---

## 🚨 Important Notes

### Data Privacy
- ✅ No data sent to any server
- ✅ Everything runs locally in your browser
- ✅ Only exported when you download
- ✅ Safe for sensitive hiring processes

### Browser Support
- ✅ Chrome/Chromium 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Limitations
- LocalStorage data persists across sessions (can be cleared)
- PDF export requires JavaScript enabled
- Multiple tabs will share localStorage

---

## 🎓 Example Output (JSON Export)

```json
{
  "user": "test@example.com",
  "resume": {
    "fileName": "resume.pdf",
    "skills": ["python", "javascript", "sql"],
    "languages": ["python"]
  },
  "scores": {
    "overallScore": 3.85,
    "recommendation": "Hire",
    "dimensionAverages": {
      "Clarity": 4.0,
      "Technical Accuracy": 3.8,
      "Completeness": 3.7,
      "Confidence": 3.8
    },
    "questionsAnswered": 18,
    "totalTime": 45
  },
  "exportedAt": "2026-02-07T10:30:00.000Z"
}
```

---

## 🤝 Support & Feedback

- **Issues?** Check browser console (F12 → Console)
- **Suggestions?** All features are extensible in vanilla JS
- **Customization?** Edit question banks in `script.js`

---

## 📝 License

This project is provided as-is for educational and recruitment purposes.

---

## ✅ Checklist Before Going Live

- [x] Light color scheme applied
- [x] All 4 scoring dimensions implemented
- [x] Mock interview practice mode
- [x] PDF & JSON export working
- [x] Responsive design tested
- [x] Zero backend dependencies
- [x] LocalStorage persistence
- [x] Email verification flow
- [x] Resume parsing & skill extraction
- [x] Multi-round interview engine

---

**Last Updated**: February 7, 2026  
**Version**: 1.0.0

