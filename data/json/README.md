# Hermetica Data and Asset Management

This directory contains the core data for the Hermetica website separated into JSON files for easier management.

## JSON Files
### Members
- `Members_1stYear.json`: Data for Volunteer Members.
- `Members_2ndYear.json`: Data for Executive Members.
- `Members_3rdYear.json`: Data for Coordinators.
- `Members_FinalYear.json`: Data for Final Year Members.

### Projects
- `Projects_2026.json`: Project list for the year 2026.
- `Projects_2025.json`: Project list for the year 2025.
- `Projects_2024.json`: Project list for the year 2024.

### Gallery
- `Gallery.json`: Organized by categories (Nimbus 2k24, Awareness, DWSIM, etc.).

---

## Image Management Guide

When adding new cards (Members, Projects, Gallery), you have two options for handling images:

### 1. Using Remote Links (Recommended)
Use URLs from services like **Firebase Storage**, **Cloudinary**, or **GitHub raw links**.
- **Example in JSON**:
```json
"image": "https://firebasestorage.googleapis.com/v0/b/your-app.appspot.com/o/image.jpg"
```

### 2. Using Local Assets
1. Save images in `/public/` (e.g., `/public/projects/my-project.jpg`).
2. Use the path in JSON starting from `/`:
```json
"image": "/projects/my-project.jpg"
```

### 3. Deployment
- **Vercel/Netlify**: `/public` assets are served automatically.
- **Remote Links**: Ensure sharing permissions are "Public".

## Tips
- **Consistency**: Keep JSON fields identical across entries.
- **Optimization**: Use compressed images (<500KB) for performance.
