# VerifiAI - AI-Powered Fact-Checking Platform

VerifiAI is an intelligent fact-checking system that uses advanced machine learning and agent-based workflows to verify claims by searching for evidence, evaluating credibility, and generating comprehensive verification reports. The platform consists of a FastAPI backend and a Next.js frontend, providing a seamless experience for detecting misinformation.

## 🎯 Features

- **Intelligent Query Generation**: Automatically generates diverse, optimized search queries to find relevant evidence
- **Multi-Source Evidence Gathering**: Aggregates information from official sources, fact-checking organizations, and reputable news outlets
- **Rigorous Evidence Evaluation**: Uses extreme skepticism and rigorous analysis to distinguish between verified facts and misinformation
- **Comprehensive Verification Reports**: Provides detailed analysis with supporting sources and clear verdicts (FAKE or LEGIT)
- **Modern Web Interface**: Clean, responsive UI built with Next.js and Tailwind CSS
- **RESTful API**: Well-structured API endpoints for integration with extensions or other applications

## 🏗️ Architecture

VerifiAI uses an agent-based workflow architecture:

1. **Query Generator**: Analyzes the claim and generates optimized search queries targeting official sources and fact-checking sites
2. **Search Executor**: Executes searches across multiple sources and collects relevant evidence
3. **Evidence Evaluator**: Applies rigorous skepticism to evaluate evidence credibility and determine verdict
4. **Report Generator**: Synthesizes findings into a comprehensive verification report

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.11+**: Core programming language
- **LangGraph**: Agent workflow orchestration
- **LLM Integration**: AI-powered reasoning and analysis
- **Search Service**: Integration with search providers for evidence gathering

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

## 📋 Prerequisites

- Python 3.11 or higher
- Node.js 18+ and npm/yarn/pnpm
- API keys for:
  - LLM provider (e.g., OpenAI, Anthropic)
  - Search service provider

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   LLM_API_KEY=your_llm_api_key
   SEARCH_API_KEY=your_search_api_key
   # Add other required environment variables
   ```

5. **Run the backend server:**
   ```bash
   python -m app.main
   # Or using uvicorn directly:
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
ai-fake-news/
├── backend/
│   ├── app/
│   │   ├── agents/              # Agent nodes for workflow
│   │   │   ├── query_generator.py      # Generates search queries
│   │   │   ├── search_executor.py      # Executes searches
│   │   │   ├── evidence_evaluator.py   # Evaluates evidence credibility
│   │   │   └── report_generator.py     # Generates final report
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── verification.py     # API endpoints
│   │   ├── models/
│   │   │   ├── schema.py               # Pydantic models
│   │   │   └── state.py                # Workflow state definitions
│   │   ├── services/
│   │   │   ├── llm_service.py          # LLM integration
│   │   │   ├── search_service.py       # Search provider integration
│   │   │   └── verification_service.py # Verification orchestration
│   │   ├── utils/
│   │   │   └── json_parser.py          # JSON parsing utilities
│   │   ├── workflows/
│   │   │   └── verification_workflow.py # Main workflow definition
│   │   └── main.py                     # FastAPI application entry point
│   └── requirements.txt
├── frontend/
│   ├── app/                      # Next.js App Router
│   │   ├── console/              # Verification console page
│   │   ├── page.tsx              # Home page
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   ├── sections/             # Page sections
│   │   └── ui/                   # Reusable UI components
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   └── verify.ts             # API client
│   └── package.json
└── README.md
```

## 🔌 API Documentation

### Verify Claim

**Endpoint:** `POST /api/v1/verification/verify`

**Request Body:**
```json
{
  "claim": "The claim to verify"
}
```

**Response:**
```json
{
  "claim": "The original claim",
  "verdict": "FAKE" | "LEGIT",
  "analysis": "Detailed analysis with evidence and reasoning",
  "sources": ["url1", "url2", "url3"]
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/verification/verify" \
  -H "Content-Type: application/json" \
  -d '{"claim": "Your claim here"}'
```

## 🎯 How It Works

1. **Claim Submission**: User submits a claim through the web interface or API
2. **Query Generation**: The system generates optimized search queries targeting:
   - Official government and institutional sources
   - Fact-checking organizations
   - Reputable news outlets
   - Debunking articles
3. **Evidence Gathering**: Searches are executed and relevant sources are collected
4. **Evidence Evaluation**: The system applies rigorous skepticism:
   - Distinguishes between mentions and verification
   - Checks for contradictions with official sources
   - Validates against known facts
   - Prioritizes authoritative sources
5. **Report Generation**: A comprehensive report is generated with:
   - Clear verdict (FAKE or LEGIT)
   - Detailed analysis
   - Supporting source URLs

## 🔍 Verification Criteria

The system uses the following criteria to evaluate claims:

- **Default Skepticism**: Unclear or insufficient evidence defaults to FAKE
- **Positive Proof Required**: LEGIT verdict requires clear, authoritative confirmation
- **Contradiction Detection**: Claims contradicting official sources are marked FAKE
- **Fact Validation**: Claims contradicting established facts are flagged
- **Source Hierarchy**: Official sources > Fact-checkers > Reputable news > Social media

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Open an issue** or discussion before making large changes
2. **Keep secrets secure**: Never commit API keys or sensitive configuration
3. **Use environment variables** for all configuration
4. **Follow code style**: Maintain consistency with existing codebase
5. **Add tests** for new features when possible

## 📝 License

[Add your license here]

## 🗺️ Roadmap

- [ ] Enhanced evidence scoring algorithms
- [ ] Support for multiple languages
- [ ] Chrome extension integration
- [ ] Comprehensive test coverage
- [ ] Performance optimizations
- [ ] Advanced analytics and reporting
- [ ] User feedback and learning mechanisms

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Built with ❤️ to fight misinformation**
