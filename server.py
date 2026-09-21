from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os
import json
import re

# =========================================================
# CONFIGURATION
# =========================================================

load_dotenv()

app = Flask(__name__)
@app.route("/")
def home():
    return "SmartLearn AI Backend is Running!"
CORS(app)

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")

if not API_KEY:
    print("WARNING: GEMINI_API_KEY is not configured.")

client = genai.Client(api_key=API_KEY) if API_KEY else None


# =========================================================
# HELPER FUNCTIONS
# =========================================================

def extract_json(text):
    """
    Extract JSON from Gemini response.
    Handles responses wrapped in ```json ... ```
    """

    text = text.strip()

    # Remove markdown code fences
    text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"^```\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    # Try direct JSON parsing
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Find first JSON object
    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end != -1:
        try:
            return json.loads(text[start:end + 1])
        except json.JSONDecodeError:
            pass

    return None


def generate_with_gemini(prompt):
    """
    Send prompt to Gemini and return text response.
    """

    if not client:
        raise Exception("Gemini API key is not configured.")

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    if not response or not response.text:
        raise Exception("Empty response received from Gemini.")

    return response.text.strip()


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/api/health", methods=["GET"])
def health():

    return jsonify({
        "backend": "online",
        "api_key_configured": bool(API_KEY),
        "gemini_model": MODEL
    })


# =========================================================
# SKILL GAP ANALYSIS
# =========================================================

@app.route("/api/skill-gap", methods=["POST"])
def skill_gap():

    try:

        data = request.get_json() or {}

        goal = data.get("goal", "").strip()
        current_skills = data.get("currentSkills", [])
        quiz_evidence = data.get("quizEvidence", [])

        if not goal:
            return jsonify({
                "success": False,
                "error": "Career goal is required."
            }), 400

        prompt = f"""
You are SmartLearn AI's Skill Gap Analyzer.

Analyze the student's current skills against their career goal.

CAREER GOAL:
{goal}

CURRENT SKILLS:
{json.dumps(current_skills, indent=2)}

QUIZ EVIDENCE:
{json.dumps(quiz_evidence, indent=2)}

Return ONLY valid JSON in this exact structure:

{{
  "analysis": {{
    "goal": "{goal}",
    "current_level": "Beginner/Intermediate/Advanced",
    "strengths": [],
    "skill_gaps": [],
    "priority_skills": [],
    "recommended_actions": [],
    "next_best_action": "",
    "estimated_learning_path": []
  }}
}}

Rules:
- Do not invent skills the student does not have.
- Use the quiz evidence when available.
- Keep recommendations realistic for a student.
- Put the most important missing skills in priority_skills.
- next_best_action must be one clear actionable step.
- Return JSON only.
"""

        result_text = generate_with_gemini(prompt)

        result = extract_json(result_text)

        if result is None:
            return jsonify({
                "success": False,
                "error": "Gemini returned invalid JSON.",
                "raw_response": result_text
            }), 500

        return jsonify({
            "success": True,
            **result
        })

    except Exception as e:

        print("Skill Gap Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# ADAPTIVE QUIZ
# =========================================================

@app.route("/api/adaptive-quiz", methods=["POST"])
def adaptive_quiz():

    try:

        data = request.get_json() or {}

        subject = data.get("subject", "").strip()
        topic = data.get("topic", "").strip()
        difficulty = data.get("difficulty", "medium")
        question_count = data.get("question_count", 5)

        if not subject:
            return jsonify({
                "success": False,
                "error": "Subject is required."
            }), 400

        if not topic:
            return jsonify({
                "success": False,
                "error": "Topic is required."
            }), 400

        try:
            question_count = int(question_count)
        except:
            question_count = 5

        question_count = max(1, min(question_count, 10))

        prompt = f"""
You are SmartLearn AI's Adaptive Quiz Engine.

Create a multiple-choice quiz for a student.

SUBJECT:
{subject}

TOPIC:
{topic}

DIFFICULTY:
{difficulty}

NUMBER OF QUESTIONS:
{question_count}

Return ONLY valid JSON using this exact structure:

{{
  "subject": "{subject}",
  "topic": "{topic}",
  "difficulty": "{difficulty}",
  "questions": [
    {{
      "question": "",
      "options": [
        "",
        "",
        "",
        ""
      ],
      "correct_answer": "",
      "explanation": ""
    }}
  ]
}}

Rules:
- Create exactly {question_count} questions.
- Every question must have exactly 4 options.
- Only one option must be correct.
- correct_answer must exactly match one of the options.
- Questions must be related to the given subject and topic.
- Avoid duplicate questions.
- Explanations should be short and educational.
- Return JSON only.
"""

        result_text = generate_with_gemini(prompt)

        result = extract_json(result_text)

        if result is None:
            return jsonify({
                "success": False,
                "error": "Gemini returned invalid JSON.",
                "raw_response": result_text
            }), 500

        return jsonify({
            "success": True,
            **result
        })

    except Exception as e:

        print("Adaptive Quiz Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# AI LEARNING ASSISTANT
# =========================================================

@app.route("/api/ai-assistant", methods=["POST"])
def ai_assistant():

    try:

        data = request.get_json() or {}

        question = data.get("question", "").strip()
        education_level = data.get("educationLevel", "")
        class_name = data.get("className", "")
        subject = data.get("subject", "")

        if not question:
            return jsonify({
                "success": False,
                "error": "Question is required."
            }), 400

        prompt = f"""
You are SmartLearn AI, an educational AI assistant.

Student Information:
Education Level: {education_level}
Class/Course: {class_name}
Subject: {subject}

Student Question:
{question}

Give a clear, student-friendly answer.

Requirements:
- Explain step by step when useful.
- Use simple language.
- Give examples when helpful.
- Do not unnecessarily make the answer too long.
- If the question is programming-related, provide correct code when needed.
- Encourage understanding rather than just giving an answer.
"""

        answer = generate_with_gemini(prompt)

        return jsonify({
            "success": True,
            "answer": answer
        })

    except Exception as e:

        print("AI Assistant Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# RESOURCE FINDER
# =========================================================

@app.route("/api/resource-finder", methods=["POST"])
def resource_finder():

    try:

        data = request.get_json() or {}

        subject = data.get("subject", "").strip()
        topic = data.get("topic", "").strip()
        difficulty = data.get("difficulty", "Beginner")
        study_time = data.get("study_time", "30 minutes")
        resource_type = data.get("resource_type", "Any")

        if not subject:
            return jsonify({
                "success": False,
                "error": "Subject is required."
            }), 400

        if not topic:
            return jsonify({
                "success": False,
                "error": "Topic is required."
            }), 400

        prompt = f"""
You are SmartLearn AI's AI Resource Finder.

Recommend useful learning resources for a student.

SUBJECT:
{subject}

TOPIC:
{topic}

DIFFICULTY:
{difficulty}

AVAILABLE STUDY TIME:
{study_time}

PREFERRED RESOURCE TYPE:
{resource_type}

Return ONLY valid JSON in this exact structure:

{{
    "subject": "{subject}",
    "topic": "{topic}",
    "resources": [
        {{
            "title": "",
            "type": "",
            "description": "",
            "reason": "",
            "url": ""
        }}
    ]
}}

Rules:

- Recommend 5 useful resources.
- Resources should match the subject and topic.
- Consider the student's difficulty level.
- Consider the available study time.
- Respect the preferred resource type when possible.
- Resource types can include:
  Video,
  Documentation,
  Practice,
  Course,
  Notes,
  Quiz,
  Project.
- Use well-known educational platforms when appropriate.
- Do not invent URLs.
- If you are not confident about a specific URL, use an empty string.
- Do not fabricate course names or resource titles.
- Keep descriptions short and useful.
- Explain why each resource is suitable.
- Return JSON only.
"""

        result_text = generate_with_gemini(prompt)

        result = extract_json(result_text)

        if result is None:

            return jsonify({
                "success": False,
                "error": "Gemini returned invalid JSON.",
                "raw_response": result_text
            }), 500

        return jsonify({
            "success": True,
            **result
        })

    except Exception as e:

        print("Resource Finder Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
# =========================================================
# STUDY PLANNER
# =========================================================

from datetime import date

@app.route("/api/study-planner", methods=["POST"])
def study_planner():

    try:

        data = request.get_json() or {}

        subjects = data.get("subjects", "").strip()
        goal = data.get("goal", "").strip()
        deadline = data.get("deadline", "").strip()
        available_time = data.get("available_time", "1 hour")
        priority = data.get("priority", "Balanced")

        # -----------------------------
        # BASIC VALIDATION
        # -----------------------------

        if not subjects:
            return jsonify({
                "success": False,
                "error": "Subjects or topics are required."
            }), 400

        if not goal:
            return jsonify({
                "success": False,
                "error": "Study goal is required."
            }), 400

        if not deadline:
            return jsonify({
                "success": False,
                "error": "Target date is required."
            }), 400


        # -----------------------------
        # CALCULATE EXACT NUMBER OF DAYS
        # -----------------------------

        try:
            target_date = date.fromisoformat(deadline)
        except ValueError:

            return jsonify({
                "success": False,
                "error": "Invalid target date."
            }), 400


        today = date.today()

        days_remaining = (target_date - today).days


        # Target date must be today or future
        if days_remaining < 0:

            return jsonify({
                "success": False,
                "error": "Target date cannot be in the past."
            }), 400


        # Include today
        total_days = days_remaining + 1


        # Safety limit
        total_days = min(total_days, 30)


        # -----------------------------
        # GEMINI PROMPT
        # -----------------------------

        prompt = f"""
You are SmartLearn AI's Study Planner.

Create a personalized study plan for a student.

TODAY:
{today.isoformat()}

TARGET DATE:
{deadline}

EXACT NUMBER OF STUDY DAYS:
{total_days}

SUBJECTS / TOPICS:
{subjects}

STUDY GOAL:
{goal}

AVAILABLE STUDY TIME PER DAY:
{available_time}

PRIORITY:
{priority}


VERY IMPORTANT RULE:

Generate EXACTLY {total_days} study-plan entries.

DO NOT generate more than {total_days} days.

DO NOT generate a weekly plan unless the target date actually
contains 7 or more study days.

If the student has only 2 days available,
generate exactly 2 entries.

If the student has only 3 days available,
generate exactly 3 entries.

Each entry must represent one calendar study day.


Return ONLY valid JSON in this exact structure:

{{
    "goal": "{goal}",
    "deadline": "{deadline}",
    "total_days": {total_days},

    "plan": [
        {{
            "day": "",
            "date": "",
            "topic": "",
            "activity": "",
            "duration": "",
            "priority": ""
        }}
    ],

    "tips": []
}}


RULES:

- The plan array MUST contain exactly {total_days} entries.
- Use dates starting from {today.isoformat()}.
- The final entry must use the target date {deadline}.
- Never create dates after the target date.
- Respect the available study time per day.
- Divide the provided subjects/topics realistically.
- Give extra attention to the selected priority.
- Include learning, practice and revision when useful.
- Do not invent subjects.
- Do not overload a single day.
- Keep the plan practical for a student.
- Return JSON only.
"""


        # -----------------------------
        # GEMINI
        # -----------------------------

        result_text = generate_with_gemini(prompt)

        result = extract_json(result_text)


        if result is None:

            return jsonify({
                "success": False,
                "error": "Gemini returned invalid JSON.",
                "raw_response": result_text
            }), 500


        # -----------------------------
        # FORCE EXACT NUMBER OF DAYS
        # -----------------------------

        plan = result.get("plan", [])

        if not isinstance(plan, list):
            plan = []


        # Never allow Gemini to return extra days
        plan = plan[:total_days]


        # If Gemini returned fewer days,
        # create simple fallback entries.
        while len(plan) < total_days:

            day_number = len(plan) + 1

            plan.append({
                "day": f"Day {day_number}",
                "date": "",
                "topic": "Study",
                "activity": "Review the provided topics.",
                "duration": available_time,
                "priority": priority
            })


        result["plan"] = plan
        result["total_days"] = total_days


        return jsonify({
            "success": True,
            **result
        })


    except Exception as e:

        print("Study Planner Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
# =========================================================
# RESUME BUILDER
# =========================================================

@app.route("/api/resume-builder", methods=["POST"])
def resume_builder():

    try:

        data = request.get_json() or {}

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        phone = data.get("phone", "").strip()
        location = data.get("location", "").strip()

        resume_type = data.get("resumeType", "Student")

        education = data.get("education", "").strip()
        skills = data.get("skills", "").strip()
        projects = data.get("projects", "").strip()
        achievements = data.get("achievements", "").strip()

        github = data.get("github", "").strip()
        linkedin = data.get("linkedin", "").strip()
        leetcode = data.get("leetcode", "").strip()
        codechef = data.get("codechef", "").strip()


        if not name:
            return jsonify({
                "success": False,
                "error": "Full name is required."
            }), 400

        if not email:
            return jsonify({
                "success": False,
                "error": "Email is required."
            }), 400

        if not education:
            return jsonify({
                "success": False,
                "error": "Education details are required."
            }), 400

        if not skills:
            return jsonify({
                "success": False,
                "error": "Skills are required."
            }), 400


        prompt = f"""
You are SmartLearn AI's AI Resume Builder.

Create a professional student resume using ONLY the information
provided by the student.

PERSONAL DETAILS:
Name: {name}
Email: {email}
Phone: {phone}
Location: {location}

RESUME TYPE:
{resume_type}

EDUCATION:
{education}

SKILLS:
{skills}

PROJECTS:
{projects}

ACHIEVEMENTS / CERTIFICATIONS:
{achievements}

CODING AND PROFESSIONAL PROFILES:
GitHub: {github}
LinkedIn: {linkedin}
LeetCode: {leetcode}
CodeChef: {codechef}


Return ONLY valid JSON in this exact structure:

{{
    "resume": {{
        "name": "",
        "contact": "",
        "summary": "",
        "education": [],
        "skills": [],
        "projects": [],
        "achievements": [],
        "certifications": [],
        "profiles": {{
            "GitHub": "",
            "LinkedIn": "",
            "LeetCode": "",
            "CodeChef": ""
        }}
    }}
}}


RULES:

- Do NOT invent education.
- Do NOT invent skills.
- Do NOT invent projects.
- Do NOT invent certifications.
- Do NOT invent achievements.
- Do NOT invent work experience.
- Do NOT add fake companies or job titles.
- Improve grammar and professional wording where appropriate.
- Keep the student's actual meaning.
- Organize the information clearly.
- Create a concise student-friendly professional summary.
- Separate certifications from achievements only when the provided
  information clearly supports the distinction.
- Keep profile URLs exactly as provided.
- If a field is empty, keep it empty.
- Return JSON only.
"""


        result_text = generate_with_gemini(prompt)

        result = extract_json(result_text)


        if result is None:

            return jsonify({
                "success": False,
                "error": "Gemini returned invalid JSON.",
                "raw_response": result_text
            }), 500


        return jsonify({
            "success": True,
            **result
        })


    except Exception as e:

        print("Resume Builder Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
# =========================================================
# NEXT BEST LEARNING ACTION
# =========================================================

@app.route("/api/next-action", methods=["POST"])
def next_action():

    try:

        data = request.get_json() or {}

        learning_dna = data.get("learningDNA", {})
        recent_activity = data.get("recentActivity", [])
        weak_topics = data.get("weakTopics", [])

        prompt = f"""
You are SmartLearn AI's Learning Decision Engine.

Determine the student's next best learning action.

LEARNING DNA:
{json.dumps(learning_dna, indent=2)}

RECENT ACTIVITY:
{json.dumps(recent_activity, indent=2)}

WEAK TOPICS:
{json.dumps(weak_topics, indent=2)}

Return ONLY valid JSON:

{{
  "next_best_action": {{
    "title": "",
    "reason": "",
    "action_type": "",
    "topic": "",
    "estimated_time": "",
    "priority": "High/Medium/Low"
  }}
}}

Rules:
- Choose ONE next best action.
- Base it on the available learning evidence.
- Prefer targeted learning over generic study advice.
- Keep the action practical for a student.
- Return JSON only.
"""

        result_text = generate_with_gemini(prompt)

        result = extract_json(result_text)

        if result is None:
            return jsonify({
                "success": False,
                "error": "Gemini returned invalid JSON.",
                "raw_response": result_text
            }), 500

        return jsonify({
            "success": True,
            **result
        })

    except Exception as e:

        print("Next Action Error:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# SERVER START
# =========================================================

if __name__ == "__main__":

    print("=" * 60)
    print("SMARTLEARN AI BACKEND")
    print("=" * 60)
    print(f"Model: {MODEL}")
    print(f"API Key Configured: {bool(API_KEY)}")
    print("Server: http://127.0.0.1:5000")
    print("=" * 60)

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
