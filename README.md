# FormCraftAI - AI-Powered Form Builder

## Live Website
[FormCraftAI - Create professional forms in seconds with AI](https://form-craft-ai-sooty.vercel.app/)

## Why FormCraftAI: Key Benefits
* ✨ **Instant Form Generation**: Create forms from natural language descriptions using AI
* 🌐 **Multilingual Support**: Full RTL support for English and Hebrew
* 🔍 **Real-time Analytics**: Track form responses and generate insights
* 🚫 **No-Code Required**: User-friendly interface for all skill levels
* 🎨 **Customizable Design**: Multiple themes and styling options

## Tech Stack
### Frontend
* Next.js 14 with TypeScript
* Tailwind CSS for styling
* shadcn/ui components
* next-intl for internationalization

### Backend & Database
* Drizzle ORM
* PostgreSQL
* Clerk Authentication

### AI & Analytics
* OpenAI API integration
* XLSX for data exports

## Features
### AI Form Generation
```typescript
const onCreateForm = async () => {
    if (formList?.length == 10) {
        toast(t('dashboard.errors.upgradeNeeded'));
        return;
    }
    if (!userInput.trim()) {
        toast(t('dashboard.errors.descriptionNeeded'));
        return;
    }
    setLoading(true);
    const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
    if (result.response.text()) {
        const resp = await db.insert(JsonForms)
            .values({
                jsonform: result.response.text(),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD/MM/yyyy')
            }).returning({ id: JsonForms.id });
        if (resp[0].id) {
            route.push('/edit-form/' + resp[0].id)
        }
        setLoading(false);
    }
    setLoading(false);
}
```

### Multilingual Support
* English and Hebrew translations
* RTL layout support
* Localized UI components

### Form Management
* Create, edit, and delete forms
* Share forms with unique URLs
* Response tracking and analytics
* Data export capabilities

## Project Structure
```
formcraftai/
├── app/
│   ├── aiform/            # AI Form generation & preview
│   ├── dashboard/         # User dashboard & management
│   ├── edit-form/         # Form editor interface
│   └── _components/       # Shared components
├── configs/               # App configuration
├── locales/              # Translation files
│   ├── en/               # English translations
│   └── he/               # Hebrew translations
└── public/               # Static assets
```

## Quick Start Guide
* **Clone the repository**
```bash
git clone https://github.com/Yanivv77/formcraftai.git
cd formcraftai
```
* **Install dependencies**
```bash
npm install
```
* **Set up environment variables**
```bash
cp .env.example .env.local
```
* **Configure your environment**
```
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Auth Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database
NEXT_PUBLIC_DATABASE_URL_CONFIG=your_postgres_connection_string

# AI Services
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Application
NEXT_PUBLIC_BASE_URL=
```
* **Run development server**
```bash
npm run db:push
npm run db:studio
npm run dev
```
Visit http://localhost:3000 to see your application.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you’d like to change.

## **License**
PodNiv is licensed under the MIT License—feel free to use, modify, and distribute the project as needed.

---

## **Get in Touch**
Have questions or feedback? Feel free to reach out or open an issue on GitHub. We’d love to hear how PodNiv is helping you transform your content!