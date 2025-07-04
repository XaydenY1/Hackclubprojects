class Question {
    constructor(id, text, options, correctAnswer, difficulty, category, expectedAge) {
        this.id = id;
        this.text = text;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty;
        this.category = category;
        this.expectedAge = expectedAge;
    }
}

class TestResult {
    constructor(totalQuestions, correctAnswers, estimatedAge, confidence, categoryScores, timestamp) {
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.estimatedAge = estimatedAge;
        this.confidence = confidence;
        this.categoryScores = categoryScores;
        this.timestamp = timestamp;
    }
}

class IntellectualAgeAssessment {
    constructor() {
        this.questions = this.loadQuestions();
        this.testHistory = this.loadHistory();
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.responses = [];
        this.selectedAnswer = null;
    }

    loadQuestions() {
        return [
            new Question(1, "What color do you get when you mix red and blue?", 
                ["Green", "Purple", "Yellow", "Orange"], 1, "child", "general_knowledge", 7),
            
            new Question(2, "How many legs does a spider have?", 
                ["6", "8", "10", "12"], 1, "child", "general_knowledge", 8),
            
            new Question(3, "What comes next: 2, 4, 6, 8, ?", 
                ["9", "10", "11", "12"], 3, "child", "pattern", 9),
            
            new Question(4, "Which is bigger: a mouse or an elephant?", 
                ["Mouse", "Elephant", "They're the same", "It depends"], 1, "child", "logic", 5),
            
            new Question(5, "What do plants need to grow?", 
                ["Only water", "Only sunlight", "Water and sunlight", "Nothing"], 2, "child", "general_knowledge", 8),
            
            new Question(6, "If a train travels 60 miles in 1 hour, how far will it travel in 3 hours?", 
                ["120 miles", "150 miles", "180 miles", "200 miles"], 2, "teen", "math", 13),
            
            new Question(7, "What is the capital of France?", 
                ["London", "Paris", "Rome", "Madrid"], 1, "teen", "general_knowledge", 12),
            
            new Question(8, "Which word doesn't belong: Apple, Orange, Carrot, Banana?", 
                ["Apple", "Orange", "Carrot", "Banana"], 2, "teen", "logic", 14),
            
            new Question(9, "What comes next in this sequence: A, C, E, G, ?", 
                ["H", "I", "J", "K"], 1, "teen", "pattern", 15),
            
            new Question(10, "If all roses are flowers, and some flowers are red, then:", 
                ["All roses are red", "Some roses might be red", "No roses are red", "All flowers are roses"], 1, "teen", "logic", 16),
            
            new Question(11, "What is 15% of 240?", 
                ["30", "36", "42", "48"], 1, "young_adult", "math", 20),
            
            new Question(12, "Which logical fallacy is: 'Everyone else is doing it, so it must be right'?", 
                ["Ad hominem", "Bandwagon", "Straw man", "False dilemma"], 1, "young_adult", "logic", 22),
            
            new Question(13, "In which year did World War II end?", 
                ["1944", "1945", "1946", "1947"], 1, "young_adult", "general_knowledge", 19),
            
            new Question(14, "If a product costs $80 after a 20% discount, what was the original price?", 
                ["$96", "$100", "$104", "$120"], 1, "young_adult", "math", 24),
            
            new Question(15, "What does 'ubiquitous' mean?", 
                ["Rare", "Everywhere", "Ancient", "Valuable"], 1, "young_adult", "language", 23),
            
            new Question(16, "If the probability of rain tomorrow is 0.3, what's the probability it won't rain?", 
                ["0.3", "0.6", "0.7", "1.0"], 2, "adult", "math", 28),
            
            new Question(17, "Which economic principle states that as price increases, demand decreases?", 
                ["Law of supply", "Law of demand", "Pareto principle", "Gresham's law"], 1, "adult", "general_knowledge", 32),
            
            new Question(18, "In a company of 100 people, 60% are men. If 40% of the men wear glasses, how many men wear glasses?", 
                ["20", "24", "30", "40"], 1, "adult", "math", 30),
            
            new Question(19, "What is the main theme of George Orwell's '1984'?", 
                ["Love story", "Totalitarian surveillance", "Space exploration", "Economic theory"], 1, "adult", "general_knowledge", 35),
            
            new Question(20, "If correlation doesn't imply causation, what does this mean for data analysis?", 
                ["All correlations are meaningless", "We need additional evidence for causal claims", "Statistics are unreliable", "Only perfect correlations matter"], 1, "adult", "logic", 38),
            
            new Question(21, "What is the philosophical problem of induction?", 
                ["How to teach logic", "How to justify reasoning from specific to general", "How to solve equations", "How to measure intelligence"], 1, "mature", "logic", 45),
            
            new Question(22, "In Bayesian statistics, what happens to the posterior probability as you gather more evidence?", 
                ["It becomes less accurate", "It becomes more refined/accurate", "It stays the same", "It becomes random"], 1, "mature", "math", 42),
            
            new Question(23, "What is the 'wisdom of crowds' phenomenon?", 
                ["Crowds are always wrong", "Groups often make better decisions than individuals", "Large groups are dangerous", "Popular opinion is always right"], 1, "mature", "general_knowledge", 40),
            
            new Question(24, "What is the fundamental attribution error?", 
                ["Making math mistakes", "Overestimating personal factors vs situational factors in others' behavior", "Logical fallacies", "Memory problems"], 1, "mature", "logic", 48),
            
            new Question(25, "If you're managing a project with diminishing returns, what's the optimal stopping point?", 
                ["When costs equal benefits", "When marginal cost equals marginal benefit", "Never stop", "After fixed time"], 1, "mature", "logic", 50)
        ];
    }

    getRandomQuestions(numQuestions) {
        const childQ = this.questions.filter(q => q.difficulty === "child");
        const teenQ = this.questions.filter(q => q.difficulty === "teen");
        const youngAdultQ = this.questions.filter(q => q.difficulty === "young_adult");
        const adultQ = this.questions.filter(q => q.difficulty === "adult");
        const matureQ = this.questions.filter(q => q.difficulty === "mature");
        
        let selected = [];
        const categories = [childQ, teenQ, youngAdultQ, adultQ, matureQ];
        
        for (const category of categories) {
            if (category.length >= 2) {
                const shuffled = category.sort(() => 0.5 - Math.random());
                selected.push(...shuffled.slice(0, 2));
            }
        }
        
        if (selected.length < numQuestions) {
            const remaining = this.questions.filter(q => !selected.includes(q));
            const needed = Math.min(numQuestions - selected.length, remaining.length);
            const shuffled = remaining.sort(() => 0.5 - Math.random());
            selected.push(...shuffled.slice(0, needed));
        }
        
        return selected.slice(0, numQuestions).sort(() => 0.5 - Math.random());
    }

    calculateIntellectualAge(responses) {
        const totalQuestions = responses.length;
        let correctAnswers = 0;
        let ageSum = 0;
        const categoryScores = {
            "logic": [],
            "math": [],
            "language": [],
            "pattern": [],
            "general_knowledge": []
        };
        
        for (const [question, userAnswer] of responses) {
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) {
                correctAnswers++;
                ageSum += question.expectedAge;
                categoryScores[question.category].push(1.0);
            } else {
                ageSum += Math.max(5, question.expectedAge - 15);
                categoryScores[question.category].push(0.0);
            }
        }
        
        const baseAge = totalQuestions > 0 ? ageSum / totalQuestions : 25;
        const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
        
        let estimatedAge;
        if (accuracy >= 0.9) {
            estimatedAge = Math.floor(baseAge * 1.2);
        } else if (accuracy >= 0.7) {
            estimatedAge = Math.floor(baseAge * 1.1);
        } else if (accuracy >= 0.5) {
            estimatedAge = Math.floor(baseAge);
        } else if (accuracy >= 0.3) {
            estimatedAge = Math.floor(baseAge * 0.9);
        } else {
            estimatedAge = Math.floor(baseAge * 0.8);
        }
        
        estimatedAge = Math.max(5, Math.min(65, estimatedAge));
        
        const categoryAverages = {};
        for (const [category, scores] of Object.entries(categoryScores)) {
            if (scores.length > 0) {
                categoryAverages[category] = scores.reduce((a, b) => a + b, 0) / scores.length;
            } else {
                categoryAverages[category] = 0.0;
            }
        }
        
        const confidence = this.calculateConfidence(responses, estimatedAge);
        
        return new TestResult(
            totalQuestions,
            correctAnswers,
            estimatedAge,
            confidence,
            categoryAverages,
            new Date().toLocaleString()
        );
    }

    calculateConfidence(responses, estimatedAge) {
        const performanceByDifficulty = {};
        
        for (const [question, userAnswer] of responses) {
            const difficulty = question.difficulty;
            const isCorrect = userAnswer === question.correctAnswer;
            
            if (!performanceByDifficulty[difficulty]) {
                performanceByDifficulty[difficulty] = [];
            }
            performanceByDifficulty[difficulty].push(isCorrect);
        }
        
        const difficultyScores = [];
        for (const [difficulty, results] of Object.entries(performanceByDifficulty)) {
            if (results.length > 0) {
                const score = results.reduce((a, b) => a + b, 0) / results.length;
                difficultyScores.push(score);
            }
        }
        
        if (difficultyScores.length < 2) {
            return 0.5;
        }
        
        const mean = difficultyScores.reduce((a, b) => a + b, 0) / difficultyScores.length;
        const variance = difficultyScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / difficultyScores.length;
        const confidence = Math.max(0.1, Math.min(0.95, 1.0 - variance));
        
        return confidence;
    }

    saveHistory() {
        localStorage.setItem('intellectualAgeHistory', JSON.stringify(this.testHistory));
    }

    loadHistory() {
        const saved = localStorage.getItem('intellectualAgeHistory');
        return saved ? JSON.parse(saved) : [];
    }
}

let assessment;
let currentScreen = 'home-screen';

function init() {
    assessment = new IntellectualAgeAssessment();
    showScreen('home-screen');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function startTest(numQuestions) {
    assessment.currentQuestions = assessment.getRandomQuestions(numQuestions);
    assessment.currentQuestionIndex = 0;
    assessment.responses = [];
    assessment.selectedAnswer = null;
    
    document.getElementById('total-questions').textContent = numQuestions;
    showScreen('test-screen');
    displayQuestion();
}

function displayQuestion() {
    const question = assessment.currentQuestions[assessment.currentQuestionIndex];
    const questionNumber = assessment.currentQuestionIndex + 1;
    const totalQuestions = assessment.currentQuestions.length;
    
    document.getElementById('current-question').textContent = questionNumber;
    document.getElementById('question-text').textContent = question.text;
    
    const progress = (questionNumber / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('next-btn').disabled = true;
    assessment.selectedAnswer = null;
}

function selectAnswer(answerIndex) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelectorAll('.option')[answerIndex].classList.add('selected');
    assessment.selectedAnswer = answerIndex;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (assessment.selectedAnswer === null) return;
    
    const currentQuestion = assessment.currentQuestions[assessment.currentQuestionIndex];
    assessment.responses.push([currentQuestion, assessment.selectedAnswer]);
    
    const isCorrect = assessment.selectedAnswer === currentQuestion.correctAnswer;
    const options = document.querySelectorAll('.option');
    
    options[currentQuestion.correctAnswer].classList.add('correct');
    if (!isCorrect) {
        options[assessment.selectedAnswer].classList.add('incorrect');
    }
    
    setTimeout(() => {
        assessment.currentQuestionIndex++;
        
        if (assessment.currentQuestionIndex < assessment.currentQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
    
    document.getElementById('next-btn').disabled = true;
}

function showResults() {
    const result = assessment.calculateIntellectualAge(assessment.responses);
    assessment.testHistory.push(result);
    assessment.saveHistory();
    
    document.getElementById('estimated-age').textContent = result.estimatedAge;
    document.getElementById('score-display').textContent = `${result.correctAnswers}/${result.totalQuestions}`;
    document.getElementById('accuracy-display').textContent = `${Math.round((result.correctAnswers / result.totalQuestions) * 100)}%`;
    document.getElementById('confidence-display').textContent = `${Math.round(result.confidence * 100)}%`;
    
    let interpretation;
    if (result.estimatedAge < 12) {
        interpretation = "Elementary school level thinking";
    } else if (result.estimatedAge < 18) {
        interpretation = "High school level thinking";
    } else if (result.estimatedAge < 25) {
        interpretation = "College level thinking";
    } else if (result.estimatedAge < 35) {
        interpretation = "Young professional level thinking";
    } else if (result.estimatedAge < 45) {
        interpretation = "Experienced professional level thinking";
    } else {
        interpretation = "Highly experienced/expert level thinking";
    }
    
    document.getElementById('interpretation').textContent = interpretation;
    
    const categoryBreakdown = document.getElementById('category-breakdown');
    categoryBreakdown.innerHTML = '<h3>Category Performance</h3>';
    
    for (const [category, score] of Object.entries(result.categoryScores)) {
        if (score > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-item';
            
            const categoryName = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            categoryDiv.innerHTML = `
                <span class="category-name">${categoryName}</span>
                <span class="category-score">${Math.round(score * 100)}%</span>
            `;
            categoryBreakdown.appendChild(categoryDiv);
        }
    }
    
    const suggestions = document.getElementById('suggestions');
    const weakAreas = Object.entries(result.categoryScores)
        .filter(([category, score]) => score < 0.6 && score > 0)
        .map(([category]) => category);
    
    if (weakAreas.length > 0) {
        suggestions.innerHTML = '<h3>💡 Suggestions for Improvement</h3><ul>';
        
        weakAreas.forEach(area => {
            const areaName = area.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            let suggestion = '';
            
            switch (area) {
                case 'logic':
                    suggestion = `${areaName}: Try puzzles, brain teasers, and logical reasoning exercises`;
                    break;
                case 'math':
                    suggestion = `${areaName}: Practice mental math and problem-solving`;
                    break;
                case 'language':
                    suggestion = `${areaName}: Read more, expand vocabulary, study etymology`;
                    break;
                case 'pattern':
                    suggestion = `${areaName}: Work on sequence puzzles and pattern recognition`;
                    break;
                case 'general_knowledge':
                    suggestion = `${areaName}: Read diverse topics, stay curious about the world`;
                    break;
            }
            
            suggestions.innerHTML += `<li>${suggestion}</li>`;
        });
        
        suggestions.innerHTML += '</ul>';
    } else {
        suggestions.innerHTML = '<h3>🎉 Excellent Performance!</h3><p>Great job! You performed well across all tested areas.</p>';
    }
    
    showScreen('results-screen');
}

function showHistory() {
    const historyContent = document.getElementById('history-content');
    
    if (assessment.testHistory.length === 0) {
        historyContent.innerHTML = '<div class="no-history">No test history available. Take a test first!</div>';
    } else {
        historyContent.innerHTML = '';
        
        assessment.testHistory.forEach((result, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const accuracy = Math.round((result.correctAnswers / result.totalQuestions) * 100);
            
            historyItem.innerHTML = `
                <div class="history-header">
                    <span class="test-date">Test ${index + 1} - ${result.timestamp}</span>
                    <span class="test-score">Age: ${result.estimatedAge}</span>
                </div>
                <div class="history-details">
                    Score: ${result.correctAnswers}/${result.totalQuestions} (${accuracy}%) | 
                    Confidence: ${Math.round(result.confidence * 100)}%
                </div>
            `;
            
            historyContent.appendChild(historyItem);
        });
        
        if (assessment.testHistory.length > 1) {
            const latest = assessment.testHistory[assessment.testHistory.length - 1];
            const previous = assessment.testHistory[assessment.testHistory.length - 2];
            const ageChange = latest.estimatedAge - previous.estimatedAge;
            
            const progressDiv = document.createElement('div');
            progressDiv.className = 'history-item';
            progressDiv.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            progressDiv.style.color = 'white';
            
            let progressText;
            if (ageChange > 0) {
                progressText = `📈 Your intellectual age increased by ${ageChange} years! 🎉`;
            } else if (ageChange < 0) {
                progressText = `📉 Your intellectual age decreased by ${Math.abs(ageChange)} years.`;
            } else {
                progressText = `📊 Your intellectual age remained stable.`;
            }
            
            progressDiv.innerHTML = `<strong>Latest Progress:</strong><br>${progressText}`;
            historyContent.appendChild(progressDiv);
        }
    }
    
    showScreen('history-screen');
}

function goHome() {
    showScreen('home-screen');
}

document.addEventListener('DOMContentLoaded', init);
