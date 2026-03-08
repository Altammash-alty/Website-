# The Ultimate Guide: Editing Content, Images, and Effects in Team Hermetica Website

This guide will explain exactly **where** and **how** to change the images, text, and hover animations across your entire website.

---

## 📸 1. How to Handle Images
You can use images in your website in two main ways:
1. **External URLs (Recommended):** Upload your images to an external service like Firebase, Imgur, Cloudinary, or Google Drive, and simply paste the `https://...` link directly into the code.
2. **Local Uploads:** Drop your image files (e.g., `my-image.jpg`) into the `public/` folder of this project. In the code, you will refer to them simply with a forward slash: `"/my-image.jpg"`.

---

## 🏠 2. Editing the Home Page (Landing Page)
The homepage content is located in the **`components/`** folder. Most sections use a "data array" at the top of the file to make editing easy.

### A. The Hero Section (Top area with typing text)
- **File to Edit:** `components/home/Hero.tsx`
- **To change the main text:** Scroll down to the `<motion.h1>` tag and change the word `HERMETICA`.
- **To change the typing text:** Look for `<TypeAnimation sequence={[2000, "We react to what matters!"]} />` and modify the text.

### B. About Us Section
- **File to Edit:** `components/about-section.tsx`
- **To change text:** Scroll down to the `<p>` tags and simply replace the paragraph text describing Team Hermetica.

### C. Domains Section (AI/ML, Web Dev, etc.)
- **File to Edit:** `components/domains-section.tsx`
- **To change content:** At the very top of the file, there is an array called `const domains`. Edit the `title`, `description`, and `link` inside it.
- **To change Hover Effects / Glow:** Inside that same array, change the Tailwind CSS colors in the `gradient` and `borderGlow` fields. 
  - *Example:* Change `from-blue-500/20 to-cyan-500/20` to `from-red-500/20 to-orange-500/20` for a fiery red hover effect!

### D. Achievements & "Our Work" Carousel
- **File to Edit:** `components/home/Achievements-carousel.tsx`
- **To change Carousel Images & Text:** At the top, find `const achievements = [...]`. Change the `image` (to your URL or `/filename.jpg`), `title`, and `description`.
- **To change "Our Work" cards:** Look directly below the achievements for `const workItems = [...]`. You can edit titles, and tweak the `gradient` or `glow` fields to change the hover animations.

### E. Club Coordinators
- **File to Edit:** `components/home/ClubCoordinator.tsx`
- **To change content:** At the top, find `const coordinators = [...]`. 
- Edit `name`, `position`, `bio`, and `image` link.
- **To change Social Media Hover Effects:** Scroll down to the `<Instagram>` and `<Linkedin>` tags. You will see `hover:text-pink-500` or `hover:text-blue-400`. You can change these colors, or add `hover:scale-125` to make the icon grow even larger when hovered.

---

## 📄 3. Editing Secondary Pages (Gallery, Projects, Events, Members)
You do **not** need to touch React code for these! The data for these pages lives inside the **`Website/data/json/`** folder. 

1. **Gallery (`data/json/Gallery.json`)**
   - Add new `https://...` image links directly into the arrays like `"workshops": [ "link1.jpg", "link2.jpg" ]`.

2. **Projects (`data/json/Projects_2024.json`, etc.)**
   - You can edit the `name`, `year`, and `image` link for every project.

3. **Members (`data/json/Members_1stYear.json`, etc.)**
   - Edit the specific JSON files to add a member's name, their `image` URL, and their social links.

4. **Events & Guest Lectures (`Events.json`, `GuestLectures.json`)**
   - Add new entries with the `title`, `description`, `date`, and `image`.

Whenever you save these JSON files, the backend automatically reads them and updates the website!

---

## ✨ 4. General Rule for Editing Hover Effects anywhere
This project uses **Tailwind CSS**. If you want to add or modify a hover effect on *any* element (image, text box, button), look for the `className="..."` attribute and add words prefixed with `hover:`.

- `hover:scale-110` -> Makes the element grow by 10% when hovered.
- `hover:text-red-500` -> Changes text color to red.
- `hover:bg-green-400` -> Changes background to green.
- `hover:-translate-y-2` -> Makes the element float upwards by a few pixels.
- `hover:opacity-50` -> Makes the element fade out by 50%.
- `duration-300` -> Makes the hover animation smooth (lasts 300 milliseconds). Add this to any element that has a hover effect so it doesn't snap abruptly!

### "Group" Hover Tricks 
Sometimes you hover over a massive Card, and want an Image *inside* the card to grow. 
1. Add the word `group` to the outer `<div className="group ...">`
2. Add `group-hover:scale-110` to the inner `<Image className="group-hover:scale-110 ...">`
