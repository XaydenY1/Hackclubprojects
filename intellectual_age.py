
"""
Intellectual Age Assessment System
Estimates a person's intellectual age based on their responses to various questions.
"""

import json
import random
import math
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Question:
    """Represents a single test question"""
    id: int
    text: str
    options: List[str]
    correct_answer: int
    difficulty: str  # 'child', 'teen', 'young_adult', 'adult', 'mature'
    category: str    # 'logic', 'math', 'language', 'pattern', 'general_knowledge'
    expected_age: int

@dataclass
class TestResult:
    """Represents the result of a test session"""
    total_questions: int
    correct_answers: int
    estimated_age: int
    confidence: float
    category_scores: Dict[str, float]
    timestamp: str

class IntellectualAgeAssessment:
    """Main class for the intellectual age assessment system"""
    
    def __init__(self):
        self.questions = self._load_questions()
        self.test_history = []
        self.current_session = []
        
    def _load_questions(self) -> List[Question]:
        """Load and return all test questions"""
        questions = [

            Question(1, "What color do you get when you mix red and blue?", 
                    ["Green", "Purple", "Yellow", "Orange"], 1, "child", "general_knowledge", 7),
            
            Question(2, "How many legs does a spider have?", 
                    ["6", "8", "10", "12"], 1, "child", "general_knowledge", 8),
            
            Question(3, "What comes next: 2, 4, 6, 8, ?", 
                    ["9", "10", "11", "12"], 3, "child", "pattern", 9),
            
            Question(4, "Which is bigger: a mouse or an elephant?", 
                    ["Mouse", "Elephant", "They're the same", "It depends"], 1, "child", "logic", 5),
            
            Question(5, "What do plants need to grow?", 
                    ["Only water", "Only sunlight", "Water and sunlight", "Nothing"], 2, "child", "general_knowledge", 8),
            
  
            Question(6, "If a train travels 60 miles in 1 hour, how far will it travel in 3 hours?", 
                    ["120 miles", "150 miles", "180 miles", "200 miles"], 2, "teen", "math", 13),
            
            Question(7, "What is the capital of France?", 
                    ["London", "Paris", "Rome", "Madrid"], 1, "teen", "general_knowledge", 12),
            
            Question(8, "Which word doesn't belong: Apple, Orange, Carrot, Banana?", 
                    ["Apple", "Orange", "Carrot", "Banana"], 2, "teen", "logic", 14),
            
            Question(9, "What comes next in this sequence: A, C, E, G, ?", 
                    ["H", "I", "J", "K"], 1, "teen", "pattern", 15),
            
            Question(10, "If all roses are flowers, and some flowers are red, then:", 
                     ["All roses are red", "Some roses might be red", "No roses are red", "All flowers are roses"], 1, "teen", "logic", 16),
            
      
            Question(11, "What is 15% of 240?", 
                    ["30", "36", "42", "48"], 1, "young_adult", "math", 20),
            
            Question(12, "Which logical fallacy is: 'Everyone else is doing it, so it must be right'?", 
                    ["Ad hominem", "Bandwagon", "Straw man", "False dilemma"], 1, "young_adult", "logic", 22),
            
            Question(13, "In which year did World War II end?", 
                    ["1944", "1945", "1946", "1947"], 1, "young_adult", "general_knowledge", 19),
            
            Question(14, "If a product costs $80 after a 20% discount, what was the original price?", 
                    ["$96", "$100", "$104", "$120"], 1, "young_adult", "math", 24),
            
            Question(15, "What does 'ubiquitous' mean?", 
                    ["Rare", "Everywhere", "Ancient", "Valuable"], 1, "young_adult", "language", 23),
            
      
            Question(16, "If the probability of rain tomorrow is 0.3, what's the probability it won't rain?", 
                    ["0.3", "0.6", "0.7", "1.0"], 2, "adult", "math", 28),
            
            Question(17, "Which economic principle states that as price increases, demand decreases?", 
                    ["Law of supply", "Law of demand", "Pareto principle", "Gresham's law"], 1, "adult", "general_knowledge", 32),
            
            Question(18, "In a company of 100 people, 60% are men. If 40% of the men wear glasses, how many men wear glasses?", 
                    ["20", "24", "30", "40"], 1, "adult", "math", 30),
            
            Question(19, "What is the main theme of George Orwell's '1984'?", 
                    ["Love story", "Totalitarian surveillance", "Space exploration", "Economic theory"], 1, "adult", "general_knowledge", 35),
            
            Question(20, "If correlation doesn't imply causation, what does this mean for data analysis?", 
                    ["All correlations are meaningless", "We need additional evidence for causal claims", "Statistics are unreliable", "Only perfect correlations matter"], 1, "adult", "logic", 38),
            
       
            Question(21, "What is the philosophical problem of induction?", 
                    ["How to teach logic", "How to justify reasoning from specific to general", "How to solve equations", "How to measure intelligence"], 1, "mature", "logic", 45),
            
            Question(22, "In Bayesian statistics, what happens to the posterior probability as you gather more evidence?", 
                    ["It becomes less accurate", "It becomes more refined/accurate", "It stays the same", "It becomes random"], 1, "mature", "math", 42),
            
            Question(23, "What is the 'wisdom of crowds' phenomenon?", 
                    ["Crowds are always wrong", "Groups often make better decisions than individuals", "Large groups are dangerous", "Popular opinion is always right"], 1, "mature", "general_knowledge", 40),
            
            Question(24, "What is the fundamental attribution error?", 
                    ["Making math mistakes", "Overestimating personal factors vs situational factors in others' behavior", "Logical fallacies", "Memory problems"], 1, "mature", "logic", 48),
            
            Question(25, "If you're managing a project with diminishing returns, what's the optimal stopping point?", 
                    ["When costs equal benefits", "When marginal cost equals marginal benefit", "Never stop", "After fixed time"], 1, "mature", "logic", 50),
        ]
        return questions
    
    def get_random_questions(self, num_questions: int = 10) -> List[Question]:
        """Get a random selection of questions from different difficulty levels"""
 
        child_q = [q for q in self.questions if q.difficulty == "child"]
        teen_q = [q for q in self.questions if q.difficulty == "teen"]
        young_adult_q = [q for q in self.questions if q.difficulty == "young_adult"]
        adult_q = [q for q in self.questions if q.difficulty == "adult"]
        mature_q = [q for q in self.questions if q.difficulty == "mature"]
        
        selected = []
        categories = [child_q, teen_q, young_adult_q, adult_q, mature_q]
        
   
        for category in categories:
            if len(category) >= 2:
                selected.extend(random.sample(category, 2))
        
        
        if len(selected) < num_questions:
            remaining = [q for q in self.questions if q not in selected]
            needed = min(num_questions - len(selected), len(remaining))
            selected.extend(random.sample(remaining, needed))
        
        return selected[:num_questions]
    
    def present_question(self, question: Question) -> int:
        """Present a question to the user and get their answer"""
        print(f"\nQuestion {question.id}:")
        print(f"{question.text}")
        print()
        
        for i, option in enumerate(question.options):
            print(f"{i + 1}. {option}")
        
        while True:
            try:
                answer = input("\nYour answer (1-4): ").strip()
                choice = int(answer) - 1
                if 0 <= choice < len(question.options):
                    return choice
                else:
                    print("Please enter a number between 1 and 4.")
            except ValueError:
                print("Please enter a valid number.")
    
    def calculate_intellectual_age(self, responses: List[Tuple[Question, int]]) -> TestResult:
        """Calculate the estimated intellectual age based on responses"""
        total_questions = len(responses)
        correct_answers = 0
        age_sum = 0
        category_scores = {"logic": [], "math": [], "language": [], "pattern": [], "general_knowledge": []}
        
        for question, user_answer in responses:
            is_correct = user_answer == question.correct_answer
            if is_correct:
                correct_answers += 1
                # If correct, add the expected age for this question
                age_sum += question.expected_age
                category_scores[question.category].append(1.0)
            else:
                
                age_sum += max(5, question.expected_age - 15) 
                category_scores[question.category].append(0.0)
        
       
        base_age = age_sum / total_questions if total_questions > 0 else 25
        
  
        accuracy = correct_answers / total_questions if total_questions > 0 else 0
        
      
        if accuracy >= 0.9:
            estimated_age = int(base_age * 1.2)  # Boost for excellent performance
        elif accuracy >= 0.7:
            estimated_age = int(base_age * 1.1)  # Slight boost for good performance
        elif accuracy >= 0.5:
            estimated_age = int(base_age)  # Normal
        elif accuracy >= 0.3:
            estimated_age = int(base_age * 0.9)  # Slight penalty
        else:
            estimated_age = int(base_age * 0.8)  # Larger penalty for poor performance
        
      
        estimated_age = max(5, min(65, estimated_age))
        

        category_averages = {}
        for category, scores in category_scores.items():
            if scores:
                category_averages[category] = sum(scores) / len(scores)
            else:
                category_averages[category] = 0.0
        
        confidence = self._calculate_confidence(responses, estimated_age)
        
        return TestResult(
            total_questions=total_questions,
            correct_answers=correct_answers,
            estimated_age=estimated_age,
            confidence=confidence,
            category_scores=category_averages,
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
    
    def _calculate_confidence(self, responses: List[Tuple[Question, int]], estimated_age: int) -> float:
        """Calculate confidence in the age estimation"""
        performance_by_difficulty = {}
        
        for question, user_answer in responses:
            difficulty = question.difficulty
            is_correct = user_answer == question.correct_answer
            
            if difficulty not in performance_by_difficulty:
                performance_by_difficulty[difficulty] = []
            performance_by_difficulty[difficulty].append(is_correct)
        
       
        difficulty_scores = []
        for difficulty, results in performance_by_difficulty.items():
            if results:
                score = sum(results) / len(results)
                difficulty_scores.append(score)
        
        if len(difficulty_scores) < 2:
            return 0.5  
        

        variance = sum((score - sum(difficulty_scores)/len(difficulty_scores))**2 for score in difficulty_scores) / len(difficulty_scores)
        confidence = max(0.1, min(0.95, 1.0 - variance))
        
        return confidence
    
    def run_test(self, num_questions: int = 10):
        """Run a complete intellectual age assessment"""
        print("=" * 60)
        print("    INTELLECTUAL AGE ASSESSMENT")
        print("=" * 60)
        print("\nThis test will estimate your intellectual age based on your")
        print("ability to answer questions of varying difficulty levels.")
        print(f"\nYou will be asked {num_questions} questions.")
        print("Take your time and answer to the best of your ability.")
        print("\nPress Enter to begin...")
        input()
        
        questions = self.get_random_questions(num_questions)
        responses = []
        
        for i, question in enumerate(questions, 1):
            print(f"\n{'='*20} Question {i} of {num_questions} {'='*20}")
            user_answer = self.present_question(question)
            responses.append((question, user_answer))
            
            # Show if correct/incorrect
            if user_answer == question.correct_answer:
                print("✓ Correct!")
            else:
                correct_text = question.options[question.correct_answer]
                print(f"✗ Incorrect. The correct answer was: {correct_text}")
        
        result = self.calculate_intellectual_age(responses)
        self.test_history.append(result)
        self.display_results(result)
        
        return result
    
    def display_results(self, result: TestResult):
        """Display the test results in a formatted way"""
        print("\n" + "="*60)
        print("                    TEST RESULTS")
        print("="*60)
        
        print(f"\n📊 OVERALL PERFORMANCE:")
        print(f"   Questions answered: {result.total_questions}")
        print(f"   Correct answers: {result.correct_answers}")
        print(f"   Accuracy: {(result.correct_answers/result.total_questions)*100:.1f}%")
        
        print(f"\n🧠 INTELLECTUAL AGE ESTIMATE:")
        print(f"   Your intellectual age: {result.estimated_age} years old")
        print(f"   Confidence level: {result.confidence*100:.1f}%")
        
        if result.estimated_age < 12:
            interpretation = "Elementary school level thinking"
        elif result.estimated_age < 18:
            interpretation = "High school level thinking"
        elif result.estimated_age < 25:
            interpretation = "College level thinking"
        elif result.estimated_age < 35:
            interpretation = "Young professional level thinking"
        elif result.estimated_age < 45:
            interpretation = "Experienced professional level thinking"
        else:
            interpretation = "Highly experienced/expert level thinking"
        
        print(f"   Interpretation: {interpretation}")
        
        print(f"\n📈 CATEGORY BREAKDOWN:")
        for category, score in result.category_scores.items():
            if score > 0:  # Only show categories that were tested
                category_name = category.replace('_', ' ').title()
                print(f"   {category_name}: {score*100:.0f}%")
        
        print(f"\n⏰ Test completed: {result.timestamp}")
        
        print(f"\n💡 SUGGESTIONS:")
        weak_areas = [cat for cat, score in result.category_scores.items() if score < 0.6 and score > 0]
        if weak_areas:
            print("   Consider strengthening these areas:")
            for area in weak_areas:
                area_name = area.replace('_', ' ').title()
                if area == "logic":
                    print(f"   - {area_name}: Try puzzles, brain teasers, and logical reasoning exercises")
                elif area == "math":
                    print(f"   - {area_name}: Practice mental math and problem-solving")
                elif area == "language":
                    print(f"   - {area_name}: Read more, expand vocabulary, study etymology")
                elif area == "pattern":
                    print(f"   - {area_name}: Work on sequence puzzles and pattern recognition")
                elif area == "general_knowledge":
                    print(f"   - {area_name}: Read diverse topics, stay curious about the world")
        else:
            print("   Great job! You performed well across all tested areas.")
    
    def show_history(self):
        """Display test history"""
        if not self.test_history:
            print("\nNo test history available. Take a test first!")
            return
        
        print("\n" + "="*50)
        print("              TEST HISTORY")
        print("="*50)
        
        for i, result in enumerate(self.test_history, 1):
            print(f"\nTest {i} ({result.timestamp}):")
            print(f"  Score: {result.correct_answers}/{result.total_questions} ({(result.correct_answers/result.total_questions)*100:.1f}%)")
            print(f"  Intellectual Age: {result.estimated_age} years")
            print(f"  Confidence: {result.confidence*100:.1f}%")
        
        if len(self.test_history) > 1:
            latest = self.test_history[-1]
            previous = self.test_history[-2]
            age_change = latest.estimated_age - previous.estimated_age
            
            print(f"\n📈 PROGRESSION:")
            if age_change > 0:
                print(f"   Your intellectual age increased by {age_change} years! 🎉")
            elif age_change < 0:
                print(f"   Your intellectual age decreased by {abs(age_change)} years.")
            else:
                print(f"   Your intellectual age remained stable.")

def main():
    """Main function to run the intellectual age assessment system"""
    assessment = IntellectualAgeAssessment()
    
    while True:
        print("\n" + "="*50)
        print("         INTELLECTUAL AGE ASSESSMENT")
        print("="*50)
        print("\n1. Take Assessment (10 questions)")
        print("2. Take Quick Assessment (5 questions)")
        print("3. Take Extended Assessment (15 questions)")
        print("4. View Test History")
        print("5. Exit")
        
        choice = input("\nSelect an option (1-5): ").strip()
        
        if choice == "1":
            assessment.run_test(10)
        elif choice == "2":
            assessment.run_test(5)
        elif choice == "3":
            assessment.run_test(15)
        elif choice == "4":
            assessment.show_history()
        elif choice == "5":
            print("\nThank you for using the Intellectual Age Assessment!")
            print("Keep learning and growing! 🧠✨")
            break
        else:
            print("\nInvalid choice. Please try again.")

if __name__ == "__main__":
    main()
