# 🌌 dotxiv-website-development

An open-source, highly interactive web platform built to aggregate, curate, and deliver premium learning resources, notes, and foundational concepts for students preparing for the **Astronomy and Astrophysics Olympiads** (like IAO, IOAA, and national selection tests).



---

## 🚀 Features

- **Comprehensive Syllabus Coverage:** Structured notes tracking core Olympiad topics (Celestial Mechanics, Astrophysics, Cosmology, Instrumentation, and Data Analysis).
- **Interactive Concept Visualizations:** Dynamic components designed to help students visualize orbital paths, coordinate systems, and stellar evolutions.
- **Curated Problem Sets:** Past Olympiad papers, mock tests, and deep-dive derivations.
- **Lightning Fast Performance:** Server-side rendering and optimized static generation powered by Next.js.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://typescriptlang.org)
- **Styling & Components:** Tailwind CSS & Shadcn UI (via v0 components configuration)
- **Package Manager:** `pnpm`

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (v18+ recommended) and `pnpm` installed on your machine.
```bash
npm install -g pnpm
```

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd dotxiv-website-development
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the live site.

---

## 🔮 Development with v0

This repository is strictly integrated with a **v0 project**. 

- **Do not manually push massive structural changes** to `main` without syncing, as v0 automatically triggers deployments on merges.
- To suggest or generate new visual layouts or note components, use the linked v0 workspace interface to iterate on UI sections natively.

---

## 📂 Project Structure Overview

```text
├── app/                  # Next.js App Router (Pages, layouts, and API routes)
├── components/           # Reusable UI components (Shadcn UI & custom interactive elements)
├── lib/                  # Utility functions, mathematical constants, and data fetchers
├── public/               # Static assets (Star maps, diagrams, educational illustrations)
├── components.json       # Shadcn UI configuration file
└── next.config.mjs       # Next.js framework configuration
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make to improve the notes, fix physics equations, or enhance the UI layout are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingAstronomyNotes`)
3. Commit your Changes (`git commit -m 'Add notes on Spherical Trigonometry'`)
4. Push to the Branch (`git push origin feature/AmazingAstronomyNotes`)
5. Open a Pull Request
   
