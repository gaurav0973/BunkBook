# 🎓 BunkBook Frontend Design

> **Bunk lectures. Don't bunk learning.**

---

# Goal

Build a clean, modern AI workspace inspired by ChatGPT and NotebookLM.

The application should feel like an AI-powered study companion where users can upload learning resources and chat with them.

---

# Authentication

Authentication is handled completely by **Clerk**.

Therefore, we do **not** need dedicated:

- Sign In Page
- Sign Up Page
- Sign Out Page
- Profile Page

These are already provided through Clerk's components.

The user avatar (UserButton) will contain:

- Profile
- Manage Account
- Sign Out

---

# Pages

The application only needs a few pages.

```
/
│
├── Landing Page
│
├── Features
│
└── Dashboard
      │
      ├── Chat
      ├── Resources
      └── Settings
```

---

# 1. Landing Page

Route

```
/
```

Purpose

Introduce BunkBook and encourage users to sign in.

---

## Sections

### Hero

```
BunkBook

Bunk lectures.
Don't bunk learning.

Chat with your PDFs,
YouTube videos,
websites,
and notes.

[ Get Started ]
```

---

### Demo

Short GIF or animation

```
Upload PDF

↓

Ask Question

↓

AI Answers
```

---

### Supported Resources

Cards

- PDF
- YouTube
- Website
- DOCX
- Markdown
- Text

---

### Features

Cards

- AI Chat
- RAG
- Semantic Search
- Tool Calling
- LangGraph Agent

---

### Footer

GitHub

LinkedIn

Documentation

---

# 2. Features Page

Route

```
/features
```

Purpose

Explain everything the application can currently do.

---

Sections

## AI Agent

- LangGraph
- Tool Calling
- Multi-step Reasoning

---

## Knowledge Sources

- PDF
- YouTube
- Websites
- Markdown
- DOCX
- TXT

---

## AI Features

- Chat with Documents
- Semantic Search
- Grounded Answers
- Context Awareness

---

## Tech Stack

- Next.js
- LangGraph
- LangChain
- OpenAI
- Qdrant
- Clerk

---

# 3. Dashboard

Route

```
/dashboard
```

This is the main application.

Everything happens here.

Layout

```
-----------------------------------------

Sidebar

-----------------------------------------

Main Content

-----------------------------------------
```

---

# Sidebar

- Chat
- Resources
- Features
- Settings

Bottom

- UserButton (Clerk)

---

# Chat Page

Route

```
/dashboard/chat
```

Main page of the application.

Layout

```
---------------------------------

Conversation History

---------------------------------

Chat Messages

---------------------------------

Input Box

---------------------------------
```

Features

- Markdown
- Code Highlighting
- Streaming
- Tool Calling
- Source Citations

---

# Resources Page

Route

```
/dashboard/resources
```

Purpose

Manage uploaded knowledge.

For MVP

Resources are stored in

```
localStorage
```

Each resource contains

```ts
{
    id: string;
    title: string;
    type: "pdf" | "youtube" | "website";
    uploadedAt: Date;
}
```

Cards

```
React.pdf

Indexed

Delete

-------------------

React Course

YouTube

Delete
```

Future

Replace localStorage with PostgreSQL.

---

# Settings

Route

```
/dashboard/settings
```

Contains

- Theme
- Model
- Temperature (optional)

Authentication

Handled entirely by Clerk.

Show

```
<UserButton />
```

No custom profile page required.

---

# Local Storage

Until PostgreSQL is added.

Store

```
resources
```

```ts
[
    {
        id,
        title,
        type,
        uploadedAt
    }
]
```

Store

```
conversations
```

```ts
[
    {
        id,
        title,
        createdAt
    }
]
```

Store

```
messages
```

```ts
{
    conversationId: [
        ...
    ]
}
```

This makes migration to a database straightforward because the object structure mirrors future tables.

---

# Components

```
Navbar

Hero

Sidebar

Chat

ChatInput

Message

MarkdownRenderer

UploadDialog

ResourceCard

FeatureCard

UserMenu (Clerk)

ThemeToggle

LoadingSpinner

EmptyState
```

---

# Theme

Minimal

Modern

NotebookLM inspired

Colors

- Beige / Neutral backgrounds
- White cards
- Indigo accent
- Rounded corners
- Soft shadows

---

# MVP Flow

```
Landing Page

↓

Sign In (Clerk)

↓

Dashboard

↓

Upload Resource

↓

Index Resource

↓

Saved to localStorage

↓

Ask Question

↓

LangGraph Agent

↓

RAG Tool

↓

Answer
```

---

# Future Roadmap

Replace localStorage with PostgreSQL

Add

- Multiple Chats
- Multiple Knowledge Bases
- Voice Chat
- Image Understanding
- Team Workspaces
- Source Citations
- Streaming Responses
- Research Mode