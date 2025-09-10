# 📚 Publishing UI - Level-Based Document Management

A beautiful, interactive prototype for level-based document publishing built with Next.js 15, Magic UI, and Tailwind CSS.

## ✨ Features

- **Hierarchical Navigation**: Tree-based navigation through Publisher → Work → Edition → Draft → Chapter → File levels
- **Inline Editing**: Quick edit functionality for all content fields
- **Smooth Animations**: Magic UI powered micro-interactions and transitions
- **Responsive Design**: Works beautifully on desktop and mobile
- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server (with Turbopack)
npm run dev
```

**⚠️ Development Server Management**

The dev server may occasionally crash or hang. Always check server status before troubleshooting:

```bash
# Check if server is running
curl -I http://localhost:3000  # (or 3003 if port changed)

# If server is down, restart with cache clearing
rm -rf .next node_modules/.cache && npm run dev

# Server will auto-switch to port 3003 if 3000 is occupied
```

**Common Server Issues:**
- Motion/animation parsing errors → Clear `.next` cache  
- Build manifest errors → Normal after cache clearing, ignore
- Port conflicts → Server auto-switches to 3003

Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3003](http://localhost:3003) to view the application.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI Library**: Shadcn/UI + Magic UI components
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **TypeScript**: Full type safety
- **Build Tool**: Turbopack (Next.js 15)

### Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── levels/             # Level-specific views
│   └── layout/             # Layout components
├── lib/
│   ├── animations/         # Animation variants
│   ├── store.ts           # Zustand store
│   ├── utils.ts           # Utilities
│   └── mock-data.ts       # Sample data
├── types/                  # TypeScript definitions
└── hooks/                  # Custom React hooks
```

## 🎯 Level-Based Editing

### Navigation Hierarchy
1. **Publisher** - Publishing house information
2. **Work** - Individual books/publications
3. **Edition** - Different versions of works
4. **Draft** - Working versions of editions
5. **Chapter** - Individual chapters
6. **File** - Chapter files and assets

### Key Features by Level

#### Publisher Level
- Company information editing
- Overview statistics
- Recent activity tracking
- Work management

#### Work Level  
- Book metadata (ISBN, authors, price)
- Target audience definition
- Edition management
- Progress tracking

#### Edition Level
- Version information
- Format selection (hardcover, paperback, ebook, audiobook)
- Draft management
- Release planning

#### Draft Level
- Progress tracking with visual indicators
- Reviewer assignments
- Chapter organization
- Word count management

#### Chapter Level
- Content editing interface
- Deadline management
- Editor assignments
- File attachments

#### File Level
- Version control
- File preview
- Download/upload functionality
- Comment system

## 🎨 Design Principles

- **Minimal Interface**: Clean, distraction-free editing environment
- **Contextual Actions**: Right actions at the right time
- **Inline Editing**: No heavy modals, everything editable in place
- **Visual Hierarchy**: Clear level distinctions with icons and colors
- **Smooth Interactions**: Fluid animations enhance usability

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Manual Build

```bash
npm run build
npm start
```

## 🎭 Magic UI Components Used

- **BlurFade**: Smooth content transitions
- **TreeNavigation**: Hierarchical navigation
- **EditableField**: Inline editing interface
- **Button Variants**: Interactive buttons with hover states
- **Card Layouts**: Content organization
- **Animation Variants**: Consistent motion design

## 📱 Responsive Design

- **Desktop First**: Optimized for content creation workflows
- **Mobile Friendly**: Collapsible navigation and touch interactions
- **Tablet Support**: Balanced layout for medium screens

## 🚀 Performance Optimizations

- **Turbopack**: Fast builds and hot reloading
- **Code Splitting**: Level-specific components lazy loaded
- **Bundle Optimization**: Tree-shaking and import optimization
- **Animation Performance**: GPU-accelerated transitions

## 🔮 Future Enhancements

- Real-time collaboration
- Advanced text editor integration
- File versioning system
- Advanced search and filtering
- User permission management
- Export/import functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Magic UI and Next.js 15
