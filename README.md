<p align="center">
  <img src="https://raw.githubusercontent.com/Radio-active-Boys/FrameX/ML/Frontend/src/assets/mainLogo.svg" alt="FrameX Logo" width="400" />
</p>

# **FrameX v2.0.0** – Interactive 2D Structural Analysis Platform

FrameX is a browser-based application for modeling, visualizing, and analyzing 2D structural frames and trusses. Built on React (Vite), Flask, and OpenSeesPy, FrameX offers real-time finite element analysis, animated deformations, and detailed force diagrams—all within an intuitive, JSON-driven interface.

🔗 **Live**  [https://framex.onrender.com](https://framex.onrender.com)

---

📋 **Table of Contents**

1. [Key Highlights](#key-highlights)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Project Structure](#project-structure)
4. [Local Development](#local-development)

   * [Prerequisites](#prerequisites)
   * [Backend Setup](#backend-setup)
   * [Frontend Setup](#frontend-setup)
5. [Usage & Examples](#usage--examples)
6. [Roadmap](#roadmap)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## 🔑 Key Highlights

* **Interactive Modeling**: Draw and manipulate nodes, elements, supports, and loads directly in the browser.
* **Real-Time Analysis**: Leverages OpenSeesPy to perform FEA simulations instantly upon model changes.
* **Animated Deformations**: Uses D3.js to visualize deflected shapes under applied loads.
* **Force Diagrams**: Generate bending moment, shear, and axial force diagrams with accurate interpolation.
* **JSON-Driven**: Model definitions (nodes, elements, materials, loads) are stored in JSON templates for easy extensibility.
* **Hinge Support**: Create rotational hinges at nodes or element ends for advanced connection behavior.
* **Extensible Templates**: Add new section types, materials, and load cases by updating JSON templates in the `api/templates` folder.

---

## 🏗️ Architecture & Tech Stack

| Layer         | Technology            | Role                                                |
| ------------- | --------------------- | --------------------------------------------------- |
| Frontend      | React (Vite), Zustand | Interactive UI, state management, JSON form builder |
| Visualization | D3.js                 | Deflected shape interpolation & SVG force diagrams  |
| API           | Flask                 | RESTful endpoints for model submission & analysis   |
| Analysis      | OpenSeesPy            | Finite element solver and data exporter             |

---

## 📁 Project Structure

```
FrameX/
├── Backend/        # Flask API + OpenSeesPy analysis
│   ├── app.py      # Main server & endpoints
│   ├── analysis/   # OpenSeesPy runner & recorder logic
│   └── requirements.txt
├── Frontend/       # React + Vite + Zustand + D3.js
│   ├── src/
│   │   ├── components/      # UI components (ModelEditor, Diagram, Canvas)
│   │   ├── api/             # JSON templates & API wrappers
│   │   └── store/           # Zustand state modules
│   └── package.json
├── nginx/          # Reverse proxy config for deployment
│   └── default.conf
├── Dockerfile      # Multi-stage build for production
├── render.yaml     # Render.com deployment settings
├── README.md
├── .gitignore
└── .dockerignore
```

---

## 🚀 Development

### Prerequisites

* **Node.js** (v18+)
* **Python** (3.10+)
* **OpenSeesPy** (see [installation guide](https://openseespydoc.readthedocs.io/en/latest/))
* **Git**

### Backend Setup (Flask + OpenSeesPy)

```bash
# 1. Clone repository
git clone https://github.com/your-org/framex.git
cd framex/Backend

# 2. Setup Python environment
python -m venv ../myenv
source ../myenv/bin/activate    # macOS/Linux
# OR ../myenv/Scripts/activate   # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run Flask server
export FLASK_APP=app.py         # macOS/Linux
# OR set FLASK_APP=app.py        # Windows
export FLASK_ENV=development
flask run
```

Access the API at `http://localhost:5000/api`.

### Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. Ensure the backend is running to enable model analysis.

---

## 🎬 Usage & Examples

1. **Create Nodes & Elements**: Click on the canvas to add nodes. Connect nodes to form elements.
2. **Assign Supports & Loads**: Select nodes/elements and define boundary conditions or load cases.
3. **Run Analysis**: Click **Analyze** to perform FEA. Watch deflected shapes animate in real time.
4. **View Diagrams**: Toggle between moment, shear, and axial force diagrams.
5. **Hinges**: Apply rotational hinges by toggling the hinge icon on eligible nodes/elements.

> Screenshots and example Framex models are available in the `docs/images` folder.

---

## 📅 Roadmap

* **v2.2.0:** Pushover & response spectrum analysis modules
* **v3.0.0:** 3D modeling support
* **v3.1.0:** Advanced material nonlinearities & dynamic loads

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/XYZ`)
3. Commit changes (`git commit -m "feat: add XYZ"`)
4. Push to your branch (`git push origin feature/XYZ`)
5. Open a Pull Request

---

Happy modeling and analysis!
