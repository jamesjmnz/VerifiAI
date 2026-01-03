# VerifiAI - AI-Powered Fact-Checking Platform

VerifiAI is an intelligent fact-checking system that uses advanced machine learning and agent-based workflows to verify claims by searching for evidence, evaluating credibility, and generating comprehensive verification reports. The platform consists of a FastAPI backend and a Next.js frontend, providing a seamless experience for detecting misinformation.

## 🎯 Features

- **Intelligent Query Generation**: Automatically generates diverse, optimized search queries to find relevant evidence
- **Multi-Source Evidence Gathering**: Aggregates information from official sources, fact-checking organizations, and reputable news outlets
- **Multi-Agent Risk Scoring**: Combines multiple ML models and heuristics for comprehensive risk assessment:
  - **Fake News Detection Model**: BERT-based model for detecting fake news patterns (0-25 risk score)
  - **Domain Trust Analysis**: Evaluates source credibility based on domain reputation (0-30 risk score)
  - **Semantic Cross-Reference**: Measures semantic similarity between claim and evidence using sentence transformers (0-25 risk score)
- **Rigorous Evidence Evaluation**: Uses extreme skepticism and rigorous analysis to distinguish between verified facts and misinformation
- **Comprehensive Verification Reports**: Provides detailed analysis with supporting sources and clear verdicts (FAKE, LEGIT, or UNCERTAIN)
- **Vector Database Integration**: Qdrant vector store for caching and semantic search of previous verifications
- **Optimized Performance**: LLM response time for fake news verification improved from averaging 16 seconds to 7 seconds
- **Modern Web Interface**: Clean, responsive UI built with Next.js and Tailwind CSS
- **RESTful API**: Well-structured API endpoints for integration with extensions or other applications

## 🏗️ Architecture

VerifiAI uses an agent-based workflow architecture powered by LangGraph:

1. **Query Generator**: Analyzes the claim and generates optimized search queries targeting official sources and fact-checking sites
2. **Search Executor**: Executes searches across multiple sources and collects relevant evidence
3. **Evidence Evaluator**: Applies rigorous skepticism to evaluate evidence credibility and determine verdict using:
   - LLM-powered reasoning
   - Multi-agent risk scoring system
   - Source credibility analysis
4. **Report Generator**: Synthesizes findings into a comprehensive verification report

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.13+**: Core programming language
- **LangGraph**: Agent workflow orchestration
- **LLM Integration**: AI-powered reasoning and analysis (OpenAI/Anthropic)
- **Transformers**: Hugging Face transformers for ML models
  - BERT-based fake news detection model (`jy46604790/Fake-News-Bert-Detect`)
  - Sentence transformers for semantic similarity (`BAAI/bge-m3`)
- **PyTorch**: Deep learning framework for model inference
- **Qdrant**: Vector database for semantic search and caching
- **Search Service**: Integration with search providers for evidence gathering

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Prisma**: Database ORM with Neon adapter

## 📋 Prerequisites

- Python 3.13 or higher
- Node.js 18+ and npm/yarn/pnpm
- Docker and Docker Compose (for Qdrant vector database)
- API keys for:
  - LLM provider (e.g., OpenAI, Anthropic)
  - Search service provider
  - OpenAI (for embeddings in vector store)

## 🚀 Quick Start

### Prerequisites Setup

1. **Start Qdrant vector database:**
   ```bash
   docker-compose up -d
   ```
   This will start Qdrant on `http://localhost:6333`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn langgraph langchain-openai langchain-qdrant qdrant-client transformers torch sentence-transformers
   ```
   Note: If you don't have a `requirements.txt`, install the packages above. For production, create a `requirements.txt` with all dependencies.

4. **Configure environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   LLM_API_KEY=your_llm_api_key
   OPENAI_API_KEY=your_openai_api_key  # For embeddings
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

### Docker Setup (Qdrant Vector Database)

The project uses Qdrant for vector storage and semantic search. To start the Qdrant service:

```bash
# From the project root
docker-compose up -d
```

This will start Qdrant on `http://localhost:6333`. You can access the Qdrant dashboard at `http://localhost:6333/dashboard`.

To stop the service:
```bash
docker-compose down
```

## 🔧 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# LLM Provider (OpenAI, Anthropic, etc.)
LLM_API_KEY=your_llm_api_key_here

# OpenAI API Key (for embeddings in vector store)
OPENAI_API_KEY=your_openai_api_key_here

# Search Service Provider
SEARCH_API_KEY=your_search_api_key_here

# Qdrant Configuration (optional, defaults shown)
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION_NAME=verifiai_claims
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Database connection (if using Prisma)
DATABASE_URL=your_database_url_here
```

## 📁 Project Structure

```
ai-fake-news/
├── backend/
│   ├── app/
│   │   ├── agents/              # Agent nodes for workflow
│   │   │   ├── query_generator.py          # Generates search queries
│   │   │   ├── search_executor.py          # Executes searches
│   │   │   ├── evidence_evaluator.py       # Evaluates evidence credibility
│   │   │   ├── report_generator.py         # Generates final report
│   │   │   ├── fake_news_model_agent.py    # BERT-based fake news detection
│   │   │   ├── domain_trust_agent.py        # Domain credibility scoring
│   │   │   └── semantic_crossref_agent.py  # Semantic similarity analysis
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── verification.py         # API endpoints
│   │   ├── models/
│   │   │   ├── schema.py                    # Pydantic models
│   │   │   └── state.py                     # Workflow state definitions
│   │   ├── services/
│   │   │   ├── llm_service.py               # LLM integration
│   │   │   ├── search_service.py            # Search provider integration
│   │   │   └── verification_service.py      # Verification orchestration
│   │   ├── utils/
│   │   │   └── json_parser.py               # JSON parsing utilities
│   │   ├── vectordb/
│   │   │   ├── qdrant_store.py              # Qdrant vector store integration
│   │   │   └── cache_service.py             # Caching service
│   │   ├── workflows/
│   │   │   └── verification_workflow.py     # Main workflow definition
│   │   └── main.py                          # FastAPI application entry point
│   └── venv/                                 # Python virtual environment
├── frontend/
│   ├── app/                      # Next.js App Router
│   │   ├── console/              # Verification console page
│   │   │   ├── verify/           # Verification page
│   │   │   └── layout.tsx        # Console layout
│   │   ├── login/                # Login page
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   └── types/                # TypeScript type definitions
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   ├── sections/             # Page sections
│   │   └── ui/                   # Reusable UI components
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   ├── verify.ts             # API client
│   │   └── prisma.ts             # Prisma client
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Database migrations
│   └── package.json
├── docker-compose.yml            # Docker Compose for Qdrant
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
  "verdict": "FAKE" | "LEGIT" | "UNCERTAIN",
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
4. **Multi-Agent Risk Assessment**: The system applies multiple scoring mechanisms:
   - **Fake News Model**: BERT-based model analyzes the claim text for fake news patterns (0-25 risk)
   - **Domain Trust Analysis**: Evaluates source credibility based on domain reputation tiers (0-30 risk)
   - **Semantic Cross-Reference**: Measures semantic similarity between claim and evidence using sentence transformers (0-25 risk)
5. **Evidence Evaluation**: The system applies rigorous skepticism:
   - Distinguishes between mentions and verification
   - Checks for contradictions with official sources
   - Validates against known facts
   - Prioritizes authoritative sources
   - Combines risk scores from multiple agents
6. **Report Generation**: A comprehensive report is generated with:
   - Clear verdict (FAKE, LEGIT, or UNCERTAIN)
   - Detailed analysis with reasoning
   - Supporting source URLs
   - Risk score breakdown

## 🔍 Verification Criteria

The system uses the following criteria to evaluate claims:

- **Three-Tier Verdict System**:
  - **FAKE**: Positive evidence the claim is false (contradicted by official sources, debunked by fact-checkers, contains proven factual errors)
  - **LEGIT**: Clear, authoritative evidence directly confirming the claim
  - **UNCERTAIN**: Insufficient evidence, no credible sources found, conflicting information, or ambiguous results (default when evidence is unclear)

- **Multi-Agent Risk Scoring**:
  - **Fake News Model Score (0-25)**: BERT-based detection of fake news patterns in claim text
  - **Domain Trust Score (0-30)**: Source credibility based on domain reputation (government > fact-checkers > news > social media)
  - **Semantic Cross-Reference Score (0-25)**: Semantic similarity between claim and evidence (strong agreement = low risk)

- **Evaluation Principles**:
  - **Absence of Evidence ≠ Evidence of Falsehood**: No credible sources defaults to UNCERTAIN, not FAKE
  - **Positive Proof Required**: LEGIT verdict requires clear, authoritative confirmation
  - **Contradiction Detection**: Claims contradicting official sources are marked FAKE
  - **Source Hierarchy**: Official sources > Fact-checkers > Reputable news > Social media
  - **Mention vs. Verification**: Articles mentioning a claim ≠ proof it's true

## ⚡ Performance

VerifiAI has been optimized for fast response times:

- **LLM Response Time**: Improved from averaging 16 seconds to 7 seconds for fake news verification
- **Optimized Workflow**: Streamlined agent pipeline reduces processing overhead
- **Efficient Model Loading**: ML models are loaded once and reused across requests
- **Vector Database Caching**: Qdrant integration enables fast semantic search and result caching

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

- [x] Multi-agent risk scoring system
- [x] Vector database integration (Qdrant)
- [x] Domain trust analysis
- [x] Semantic cross-reference scoring
- [ ] Enhanced evidence scoring algorithms
- [ ] Support for multiple languages
- [ ] Chrome extension integration
- [ ] Comprehensive test coverage
- [ ] Performance optimizations
- [ ] Advanced analytics and reporting
- [ ] User feedback and learning mechanisms
- [ ] Caching layer for repeated claims

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Built with ❤️ to fight misinformation**
