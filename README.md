# Ana Rita Diogo - Personal Portfolio Website

A beautiful, creative personal website built with Next.js 16, TypeScript, and Tailwind CSS. Features a dark mode aesthetic with earthy tones, showcasing photography, projects, postcard collection, and more.

## 🎨 Features

- **Modern Design**: Dark mode with earthy color palette (browns, tans, warm earth tones)
- **Responsive**: Fully responsive design that works on mobile, tablet, and desktop
- **Performance**: Built with Next.js for fast performance and optimal SEO
- **Sections**:
  - **Home/Landing**: Hero section with navigation cards
  - **About**: Biography, interests, and skills
  - **Photography**: Gallery grid for travel photos
  - **Postcards**: Collection display for postcard collection
  - **Projects**: Software projects and creative work

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## 🎯 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navigation & Footer
│   ├── page.tsx            # Home/Landing page
│   ├── about/page.tsx      # About page
│   ├── photography/page.tsx # Photography gallery
│   ├── postcards/page.tsx  # Postcard collection
│   ├── projects/page.tsx   # Projects showcase
│   └── globals.css         # Global styles with color variables
├── components/
│   ├── Navigation.tsx      # Header navigation
│   └── Footer.tsx          # Footer component
```

## 🎨 Color Palette

The site uses a creative, earthy color scheme:

- **Background Dark**: `#1a1814` (Deep brown)
- **Background Secondary**: `#201d19` (Slightly lighter brown)
- **Text Light**: `#e8e4df` (Off-white/cream)
- **Text Muted**: `#b5ada5` (Taupe)
- **Accent Primary**: `#d4a574` (Golden tan)
- **Accent Dark**: `#8b7355` (Brown)
- **Accent Muted**: `#6b5d52` (Grayish brown)

To customize colors, edit the CSS variables in `src/app/globals.css`.

## 📝 Customization Guide

### 1. Update Personal Information

**Layout & Metadata** (`src/app/layout.tsx`):
```typescript
export const metadata: Metadata = {
  title: "Ana Rita Diogo | Creative Portfolio",
  description: "Your description here",
};
```

**Navigation** (`src/components/Navigation.tsx`):
- Update the logo/initials in the navbar
- Modify navigation links and labels

### 2. Customize Home Page

Edit `src/app/page.tsx`:
- Update the hero title and subtitle
- Modify section cards
- Customize CTA buttons and links

### 3. Add Real Content

**Photography**: 
- Replace placeholder images in `src/app/photography/page.tsx`
- Add real photo URLs and metadata

**Postcards**:
- Update postcard data in `src/app/postcards/page.tsx`
- Add images and collection details

**Projects**:
- Modify project data in `src/app/projects/page.tsx`
- Add GitHub links and live demo URLs

**About**:
- Update biography and interests in `src/app/about/page.tsx`
- Add your actual skills and experience

### 4. Update Footer

Edit `src/components/Footer.tsx`:
- Add social media links
- Update contact email
- Modify footer text

### 5. Change Color Theme

Edit the CSS variables in `src/app/globals.css`:
```css
:root {
  --background: #1a1814;
  --foreground: #e8e4df;
  --accent-dark: #8b7355;
  --accent-light: #d4a574;
  --accent-muted: #6b5d52;
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist (system fonts)
- **Deployment Ready**: Vercel, Netlify, GitHub Pages

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js configuration
5. Click Deploy

### Deploy to Netlify

1. Build locally: `npm run build`
2. Connect your Git repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Deploy to GitHub Pages

The site can be deployed to GitHub Pages by exporting as static HTML.

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

Feel free to customize and modify this template for your own portfolio!

## 📄 License

This project is open source and available for personal use.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
