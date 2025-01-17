# Opted

Opted is an intelligent calendar optimization tool that leverages AI to help you make the most of your schedule. It automatically analyzes and optimizes your calendar to improve productivity and time management.

## Features

- 🤖 AI-powered calendar optimization
- 📅 Smart scheduling recommendations
- ⚡ Real-time calendar synchronization
- 🎯 Intelligent time blocking
- 🔄 Automated schedule adjustments
- 📊 Schedule analytics and insights

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Frontend**: [React 19](https://react.dev/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

Implemented:

- [X] Supabase Auth
- [X] Supabase DB
- [X] Landing page, FAQ, pricing
- [X] Task CRUD
- [X] Task DnD
- [X] Placeholder UI for calendar, dashboard, stats
- [X] Settings, dark mode
- [ ] calendar visualization
- [ ] calendar sync
- [ ] auto scheduling tasks around existing events
- [ ] AI chat interface
- [ ] using agent to optimize schedule
- [ ] using agent to create tasks
- [ ] using agent to create long-term goals, breaking them into tasks



## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 8.x or later
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/olifog/opted.git
cd opted
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your environment variables in `.env.local`

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## License

MIT License - see [LICENSE](LICENSE) for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
