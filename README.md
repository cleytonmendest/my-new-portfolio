# My Portfolio

Personal portfolio website for a Full Stack Developer with 5+ years of experience specializing in e-commerce development. Built with modern technologies and designed to be bilingual (English/Portuguese) to reach international opportunities and freelance projects.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x with strict mode
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl.dev/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Deployment**: Docker

## Features

- ✅ Bilingual support (English/Portuguese)
- ✅ Dark/Light theme with system preference detection
- ✅ Fully responsive design
- ✅ Type-safe with TypeScript
- ✅ Modern UI components with shadcn/ui
- ✅ Docker-ready for VPS deployment
- ✅ SEO optimized
- ✅ Contact form with Web3Forms integration
- 🚧 Blog system (planned)
- 🚧 Analytics integration (planned)

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Internationalized routes (en, pt)
│   │   │   ├── layout.tsx     # Root layout with theme and i18n providers
│   │   │   └── page.tsx       # Home page
│   │   └── globals.css        # Global styles with custom CSS variables
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── theme-provider.tsx # Theme provider component
│   ├── i18n/
│   │   ├── config.ts          # i18n configuration
│   │   ├── request.ts         # Server-side i18n setup
│   │   └── routing.ts         # i18n routing configuration
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn, etc.)
│   ├── messages/
│   │   ├── en.json            # English translations
│   │   └── pt.json            # Portuguese translations
│   └── middleware.ts          # Next.js middleware for i18n
├── public/                    # Static assets
├── .dockerignore
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Docker Compose configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── components.json            # shadcn/ui configuration
├── CLAUDE.md                  # AI assistant guidelines
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Web3Forms access key:
- Get a free access key at [https://web3forms.com](https://web3forms.com)
- Add your key to `WEB3FORMS_ACCESS_KEY` in `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to the default locale route (`/en`).

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run type-check   # Run TypeScript compiler check
```

## Development Workflow

### Code Quality Standards

This project follows strict code quality standards:

- **No `any` types**: All TypeScript code must be properly typed
- **Zero lint errors**: Code must pass ESLint checks before commit
- **Type safety**: Run `npm run type-check` before committing
- **Atomic commits**: One feature per commit
- **Complete features only**: Never commit half-implemented features

### Before Committing

Always run these commands:

```bash
npm run lint        # Must pass with no errors
npm run type-check  # Must pass with no errors
npm run build       # Must build successfully
```

### Adding New Components

1. For shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

2. Custom components go in `src/components/[category]/`

3. Always use TypeScript interfaces for props

4. Export from index file for clean imports

### Internationalization

To add new translations:

1. Add keys to `src/messages/en.json`
2. Add corresponding translations to `src/messages/pt.json`
3. Use in components:

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('MyComponent');
  return <h1>{t('title')}</h1>;
}
```

### Theme Management

The project uses `next-themes` for dark/light mode:

```tsx
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

## Design Guidelines

### Color Palette

- **Accent Color**: `#E6972E` (warm orange for highlights)
- **No absolute black/white**: Use `oklch(0.04 0 0)` for dark, `oklch(0.98 0 0)` for light
- **Neutral tones**: Prefer neutral grays for backgrounds and text

### Principles

- Simple and functional design
- Mobile-first approach
- Accessible (proper semantic HTML, ARIA labels)
- Consistent spacing and typography
- Smooth transitions between themes

## Docker Deployment

### Build and Run with Docker

```bash
# Build the image
docker build -t my-portfolio .

# Run the container
docker run -p 3000:3000 my-portfolio
```

### Using Docker Compose

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down

# Rebuild without cache
docker-compose build --no-cache
```

### Deploy to VPS

1. Copy files to your VPS
2. Make sure Docker and Docker Compose are installed
3. Run `docker-compose up -d`
4. Configure your reverse proxy (nginx/traefik) to point to port 3000

## Environment Variables

Create a `.env.local` file for local development:

```env
# Web3Forms Access Key (required for contact form)
# Get your free access key at https://web3forms.com
WEB3FORMS_ACCESS_KEY=your_access_key_here

# Optional: Site URL for production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Setting up Web3Forms (Contact Form)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email address (where you want to receive contact form submissions)
3. Verify your email
4. Copy the Access Key provided
5. Add it to your `.env.local` file as `WEB3FORMS_ACCESS_KEY`

**Why Web3Forms?**
- ✅ Completely free (up to 250 submissions/month)
- ✅ No backend required
- ✅ No credit card needed
- ✅ Instant email notifications
- ✅ Spam protection included
- ✅ Perfect for personal portfolios

For production, set these in your hosting environment or Docker container.

## Contributing

This is a personal portfolio project, but suggestions are welcome! Please ensure:

1. Code follows the established patterns
2. All tests pass (lint, type-check, build)
3. Commit messages are clear and descriptive
4. Changes are documented in the PR description

## License

This project is private and not licensed for public use.

## Contact

For opportunities or collaborations, visit the portfolio website or reach out through the contact form.

---

Built with ❤️ using Next.js and TypeScript
