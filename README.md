<p align="center">
  <img src="https://raw.githubusercontent.com/Baoho113/Auralis-Image-Tagging-App/main/AuralisLogo.png
" alt="Auralis Logo" width="320"/>
</p>

<h1 align="center">Auralis</h1>
<p align="center"><i>Accessible Image Tagging for the Visually Impaired</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-green" />
  <img src="https://img.shields.io/badge/license-MIT-blue" />
  <img src="https://img.shields.io/badge/build-passing-brightgreen" />
  <img src="https://img.shields.io/badge/status-active-success" />
  <img src="https://img.shields.io/badge/contributions-welcome-orange" />
</p>

---

##  About the Project

Auralis is an accessibility-focused web application that generates meaningful image descriptions and tags using AI.  
It is built for visually impaired users who rely on screen readers and assistive technologies for digital navigation.

Inspired by the mission-driven openness of projects like **ActivityWatch**, Auralis is:

- **Open-source**
- **Transparent**
- **Privacy-respecting**
- **Community-driven**

Auralis aims to improve access to visual information across the web by transforming images into rich, descriptive text that can be used in screen readers, alt-text fields, accessibility audits, and more.

---

##  Features

- **AI-Powered Image Tagging** – Generates descriptive labels and captions.
- **Screen Reader Optimized** – Structured output for maximum clarity.
- **Simple Drag-and-Drop Interface** – Fast and easy to use.
- **Mobile-Friendly** – Fully responsive layout.
- **Privacy-Friendly** – Designed to avoid storing user images.

---

##  Technical Overview

### **Architecture**

Auralis uses a modern decoupled architecture:

### **Frontend**

- Framework: **React**
- Styling: **TailwindCSS**
- Accessibility standards: **WCAG 2.1 AA**
- Screen-reader support via:
  - ARIA roles
  - Semantic HTML
  - Keyboard navigation

### **Backend**

- Type: **Serverless API** or **Node.js backend**
- Endpoints:
  - `/api/tag` – accepts an image and returns tags + description
- Handles:
  - Image preprocessing
  - Model request/response
  - Safety/quality filtering

### **AI Component**

- Model: OpenAI Vision API 
- Outputs:
  - Caption (1–2 sentences)
  - Object tags
  - Scene/context enrichment
- Accessibility formatting rules:
  - Avoids overly technical language
  - Prioritizes clarity and conciseness

### **Deployment**

- Hosting: **Vercel**
- CI/CD: GitHub Actions (build + test)
- Asset optimization via:
  - React.js Image component 
  - Image CDN

---

##  Getting Started

### **Clone the Repository**

\`\`\`
# Clone the repository
git clone https://github.com/<your-username>/Auralis.git

# Navigate into the project
cd Auralis

# Install dependencies
npm install

# Run the dev server
npm run dev
\`\`\`

##  Roadmap

- User accounts & history  
- Audio descriptions (text → speech)  
- Batch image tagging  
- Multi-language captions  
- Browser extension (auto tag images)

---

##  Contributing

We welcome contributions from anyone!

1. Fork the repo  
2. Create your feature branch  
3. Commit and push your code  
4. Open a pull request  

---

##  License

This project is licensed under the **MIT License**.

---

##  Contact

Have suggestions or want to collaborate?  
Feel free to open an issue or reach out anytime!
