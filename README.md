# Smörgåsbord

Smörgåsbord is a place to organize your recipes regardless of origin. Upload a photo, an URL or an unorganized text, then Smörgåsbord will turn it into a searchable collection.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- Yarn (package manager)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smorgasbord.git
cd smorgasbord
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
yarn dev
```

### Features
- Import recipes from URLs
- Upload recipe photos
- Convert unorganized text into structured recipes
- Search through your recipe collection
- Beautiful, responsive interface

### Development
- Built with SvelteKit
- Uses OpenAI's GPT models for recipe extraction
- Modern, responsive design
- TypeScript for type safety
