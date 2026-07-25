from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # Mock data for the director portfolio
    director_data = {
        "name": "Alex Rivers",
        "title": "Film & Commercial Director",
        "bio": "Crafting visual narratives that bridge the gap between surrealism and reality. Specialized in high-concept cinematography and emotive storytelling.",
        "showreel_url": "https://www.youtube.com/embed/dQw4w9WgXcQ", # Placeholder
        "works": [
            {"title": "Neon Dreams", "year": "2023", "category": "Commercial", "image": "https://picsum.photos/id/101/600/400", "link": "#"},
            {"title": "The Silent Echo", "year": "2022", "category": "Short Film", "image": "https://picsum.photos/id/102/600/400", "link": "#"},
            {"title": "Urban Jungle", "year": "2021", "category": "Music Video", "image": "https://picsum.photos/id/103/600/400", "link": "#"},
            {"title": "Midnight Pulse", "year": "2023", "category": "Commercial", "image": "https://picsum.photos/id/104/600/400", "link": "#"},
        ],
        "contact": {
            "email": "hello@alexrivers.com",
            "instagram": "https://www.instagram.com/alexrivers_dir",
            "vimeo": "https://www.youtube.com/watch?v=yszS7V6X6S0"
        }
    }
    return render_template('index.html', data=director_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
