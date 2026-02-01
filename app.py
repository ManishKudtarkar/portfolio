from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "change_this_secret_key"  # needed for flash messages

# Enhanced project data with more details
PROJECTS = [
    {
        "title": "Hadoop Log Analysis",
        "tech": ["Python", "Hadoop", "Big Data", "MapReduce"],
        "description": "Big Data project focusing on analyzing large scale system logs using Hadoop framework and Python scripting for efficient data processing.",
        "link": "https://github.com/ManishKudtarkar/hadoop-log-analysis",
        "featured": True,
        "status": "Completed",
        "year": "2025"
    },
    {
        "title": "EcoPredict",
        "tech": ["Python", "Machine Learning", "Data Analysis", "Predictive Modeling"],
        "description": "An ecological prediction tool leveraging machine learning algorithms to forecast environmental trends and patterns.",
        "link": "https://github.com/ManishKudtarkar/ecopredict",
        "featured": True,
        "status": "Completed",
        "year": "2026"
    },
    {
        "title": "Eco-for-Insects",
        "tech": ["Python", "Ecology", "Data Visualization"],
        "description": "A specialized application for tracking and analyzing insect populations and their ecological impact.",
        "link": "https://github.com/ManishKudtarkar/Eco-for-insects",
        "featured": False,
        "status": "In Progress",
        "year": "2026"
    },
    {
        "title": "Sprout",
        "tech": ["Python", "Development"],
        "description": "A personal project focused on software development practices and new technology exploration.",
        "link": "https://github.com/ManishKudtarkar/sprout",
        "featured": False,
        "status": "Active",
        "year": "2026"
    }
]

# Skills data
SKILLS = {
    "Programming Languages": ["Python", "Java", "JavaScript", "SQL", "R"],
    "Web Technologies": ["Flask", "FastAPI", "HTML5", "CSS3", "Bootstrap", "jQuery"],
    "Data Science": ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
    "Databases": ["PostgreSQL", "MySQL", "SQLite", "MongoDB"],
    "Tools & Technologies": ["Git", "Docker", "Linux", "VS Code", "Postman", "Tableau"],
    "Cloud & DevOps": ["AWS (basics)", "Docker", "CI/CD", "Apache Airflow"]
}


@app.route("/")
def home():
    # Show featured projects on homepage
    featured_projects = [p for p in PROJECTS if p.get('featured', False)]
    return render_template("index.html", projects=featured_projects[:3])


@app.route("/projects")
def projects():
    # Group projects by status for better organization
    completed_projects = [p for p in PROJECTS if p.get('status') == 'Completed']
    in_progress_projects = [p for p in PROJECTS if p.get('status') == 'In Progress']
    
    return render_template("project.html", 
                         projects=PROJECTS,
                         completed_projects=completed_projects,
                         in_progress_projects=in_progress_projects,
                         skills=SKILLS)


@app.route("/about")
def about():
    return render_template("about.html", skills=SKILLS)


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        # Here you can add logic to save to DB, send email, etc.
        print(f"New contact message from {name} <{email}>: {message}")

        flash("Thanks for reaching out! I’ll get back to you soon.")
        return redirect(url_for("contact"))

    return render_template("contact.html")


if __name__ == "__main__":
    app.run(debug=True)
