# VerifiAI - AI-Powered Fact-Checking Platform

> **System Description:** VerifiAI is a **multi-agent agentic AI system** with intelligent evidence gathering and multi-signal credibility scoring for automated fact-checking and fake news detection.

This directory houses the documentation for **VerifiAI**, a **hierarchical multi-agent agentic AI system** with intelligent search orchestration and ensemble credibility scoring for context-aware fact verification.

## System Classification

| Aspect | Classification |
|--------|----------------|
| **Architecture** | Hierarchical Multi-Agent System with Conditional Scoring |
| **AI Pattern** | Agentic AI (ReAct reasoning, tool use, autonomous planning) |
| **Orchestration** | Directed Acyclic Graph (DAG) - LangGraph 5-node pipeline |
| **Learning** | Vector Database Caching (Qdrant for semantic search) |
| **Credibility** | 4-Signal Weighted Ensemble (Domain Trust + Semantic Cross-Reference + Google Fact Check + Fake News Model) |
| **Verdict System** | Three-Tier (FAKE, LEGIT, UNCERTAIN) with Conditional Risk Scoring |

> **Context Engineering**: The entire 5-node architecture is a form of context engineering - we design the pipeline structure, agent specializations, search query generation, and credibility signals to inject domain-specific knowledge into the system. Rather than relying on a single LLM prompt, we engineer the context at every node to ensure rigorous fact-checking with extreme skepticism.

## Agent Summary (5 Core Nodes + 4 Scoring Agents)

| Category | Count | Agents/Nodes |
|----------|-------|--------------|
| **Core Pipeline Nodes** | 5 | QueryGenerator, SearchExecutor, EvidenceEvaluator, ScoringNode, ReportGenerator |
| **Scoring Agents** | 4 | DomainTrustAgent, SemanticCrossrefAgent, GoogleFactCheckAgent, FakeNewsModelAgent |

> **Note**: Scoring agents run in parallel only when verdict is UNCERTAIN. If EvidenceEvaluator determines FAKE or LEGIT, scoring is skipped.

## Novel Contributions

1. **Context-Engineered Multi-Agent Architecture** – The 5-node pipeline is itself context engineering: each node, agent specialization, search query strategy, and credibility signal injects domain knowledge into the system.
2. **Conditional Multi-Signal Risk Scoring** – 4 independent scoring agents run in parallel only when evidence is insufficient (UNCERTAIN verdict), providing nuanced risk assessment (0-100 score).
3. **Three-Tier Verdict System with Extreme Skepticism** – FAKE (positive evidence of falsehood), LEGIT (clear authoritative confirmation), UNCERTAIN (default when evidence is insufficient).
4. **4-Signal Credibility Framework** – Domain Trust (30%) + Semantic Cross-Reference (25%) + Google Fact Check (20%) + Fake News Model (25%).
5. **Intelligent Query Generation** – LLM-powered query generation that preserves claim specifics while adding fact-checking context.
6. **Parallel Evidence Gathering** – Batch search execution with parallel query processing for faster evidence collection.

## Contents
- `README.md` (this file) – System overview, architecture, and quick start guide
- `backend/app/agents/` – All agent implementations
- `backend/app/workflows/` – LangGraph workflow definition
- `backend/app/services/` – Core services (LLM, Search, Verification)

## Application Overview

### Frontend (Next.js 16 + React 19)
- **Verification Console** – Dashboard for submitting claims and viewing verification results
- **Real-time Verification** – Stream verification process with detailed analysis
- **Score Breakdown Visualization** – Display risk scores and credibility breakdowns
- **User Authentication** – Better Auth integration with Google OAuth support

### Chrome Extension
- **One-click Fact-Checking** – Verify Facebook posts directly from your feed
- **Automatic Text Extraction** – Extracts claim text from Facebook posts
- **Real-time Verification** – Shows verdict and analysis in a modal overlay
- **Configurable API URL** – Easy backend configuration via extension popup

### Backend (FastAPI + LangGraph)
5-Node Multi-Agent Pipeline:

| Node | Agent/Node | Function |
|------|------------|----------|
| 1 | **QueryGenerator** | LLM-powered query generation (2 queries per claim) |
| 2 | **SearchExecutor** | Parallel batch search via Tavily API |
| 3 | **EvidenceEvaluator** | LLM-powered evidence analysis with extreme skepticism → verdict (FAKE/LEGIT/UNCERTAIN) |
| 4 | **ScoringNode** (Conditional) | Parallel execution of 4 scoring agents (only if UNCERTAIN) |
| 5 | **ReportGenerator** | Final report synthesis |

## Architecture Highlights

### 1. QueryGenerator Node
Located in `backend/app/agents/query_generator.py`:
- **LLM-Powered**: Uses GPT-4o-mini for intelligent query generation
- **Claim Preservation**: Maintains exact claim details while adding fact-checking context
- **Dual Query Strategy**: Generates 2 queries - one with "fact check/verify" terms, one with "debunk/official statement" terms
- **Context-Aware**: Preserves names, dates, numbers, and specific facts from the claim

### 2. SearchExecutor Node
Located in `backend/app/agents/search_executor.py`:
- **Tavily Integration**: Web search with semantic reranking
- **Parallel Execution**: Batch search with `asyncio.gather` for concurrent queries
- **Result Aggregation**: Flattens and merges results from multiple queries

### 3. EvidenceEvaluator Node
Located in `backend/app/agents/evidence_evaluator.py`:
- **Extreme Skepticism**: Rigorous evaluation rules with source hierarchy
- **LLM Reasoning**: GPT-4o-mini with carefully engineered prompts
- **Three-Tier Verdict**: FAKE (positive evidence of falsehood), LEGIT (clear confirmation), UNCERTAIN (default)
- **Source Validation**: Distinguishes between mentions and actual verification
- **Critical Rule**: Absence of evidence ≠ evidence of falsehood

### 4. ScoringNode (Conditional Execution)
Located in `backend/app/agents/scoring_node.py`:
- **Conditional Logic**: Runs ONLY when verdict == "UNCERTAIN"
- **Parallel Execution**: All 4 scoring agents run concurrently via `asyncio.gather`
- **Error Handling**: Comprehensive try-except with default fallback values
- **Score Aggregation**: Combines 4 signals into 0-100 risk score

#### 4.1 DomainTrustAgent
Located in `backend/app/agents/domain_trust_agent.py`:
- **Tiered Scoring**: Government (0.95) > Fact-checkers (0.90) > News (0.75-0.82) > Social Media (0.40-0.50)
- **Risk Calculation**: (1 - confidence) × 30
- **Domain Matching**: Exact match + suffix matching for subdomains
- **Max Contribution**: 30 points

#### 4.2 SemanticCrossrefAgent
Located in `backend/app/agents/semantic_crossref_agent.py`:
- **Embedding Model**: BAAI/bge-m3 (SentenceTransformer)
- **Cosine Similarity**: Measures semantic agreement between claim and evidence
- **Risk Thresholds**: 
  - ≥0.85 similarity → 2 points (strong agreement)
  - ≥0.72 → 6 points (good agreement)
  - ≥0.60 → 12 points (weak agreement)
  - <0.60 → 18 points (no agreement)
- **Max Contribution**: 25 points

#### 4.3 GoogleFactCheckAgent
Located in `backend/app/agents/google_factcheck_agent.py`:
- **Google Fact Check API**: Human fact-checker verdicts
- **Rating Mapping**: Maps textual ratings (true, mostly true, false, etc.) to confidence scores
- **Risk Calculation**: (1 - confidence) × 20
- **Default Handling**: Returns 10 (50% confidence) if no API key or no results
- **Max Contribution**: 20 points

#### 4.4 FakeNewsModelAgent
Located in `backend/app/agents/fake_news_model_agent.py`:
- **BERT Model**: `jy46604790/Fake-News-Bert-Detect` (HuggingFace)
- **Sequence Classification**: Binary classification (FAKE vs REAL)
- **Risk Calculation**: fake_probability × 25
- **Max Contribution**: 25 points

### 5. ReportGenerator Node
Located in `backend/app/agents/report_generator.py`:
- **Final Synthesis**: Prepares verification report (currently pass-through)
- **Future Enhancement**: Will generate comprehensive narrative reports

## Workflow Flow

```
Claim Input
    ↓
[1] QueryGenerator → Generates 2 search queries
    ↓
[2] SearchExecutor → Parallel batch search (Tavily)
    ↓
[3] EvidenceEvaluator → LLM analysis → Verdict (FAKE/LEGIT/UNCERTAIN)
    ↓
    ├─→ If UNCERTAIN → [4] ScoringNode (4 agents in parallel) → [5] ReportGenerator
    └─→ If FAKE/LEGIT → [5] ReportGenerator
    ↓
Final Response (with optional risk scores)
```

## Latest Updates

### Multi-Agent Risk Scoring System
- **4 Independent Scorers**: Domain Trust, Semantic Cross-Reference, Google Fact Check, Fake News Model
- **Parallel Execution**: All scorers run concurrently for optimal performance
- **Error Resilience**: Comprehensive error handling with fallback defaults
- **Score Validation**: Input validation and range clamping (0-100)

### Conditional Scoring Architecture
- **Smart Routing**: Scoring only runs when evidence is insufficient (UNCERTAIN)
- **Performance Optimization**: Skips expensive scoring when verdict is clear
- **Risk Score Breakdown**: Detailed per-agent contribution tracking

### Enhanced Error Handling
- **Robust Validation**: All scores validated and normalized before aggregation
- **Exception Handling**: Individual scorer failures don't crash the system
- **Default Values**: Sensible fallbacks for missing or invalid scores

## Tech Stack

### Backend
- **Python 3.13+** with virtual environment
- **FastAPI** – Async web framework
- **LangGraph** – Multi-agent workflow orchestration
- **OpenAI GPT-4o-mini** – LLM for reasoning and query generation
- **Tavily Search API** – Web search with semantic reranking
- **Google Fact Check API** – Human fact-checker verification
- **HuggingFace Transformers** – ML models
  - BERT-based fake news detection (`jy46604790/Fake-News-Bert-Detect`)
  - Sentence transformers for semantic similarity (`BAAI/bge-m3`)
- **PyTorch** – Deep learning framework
- **Qdrant** – Vector database for semantic search and caching (optional)
- **httpx** – Async HTTP client

### Frontend
- **Next.js 16** with **React 19** and **TypeScript**
- **Tailwind CSS** – Utility-first styling
- **Radix UI** – Accessible component primitives
- **Lucide React** – Icon library
- **Prisma** – Database ORM with Neon adapter

### Chrome Extension
- **Manifest V3** – Modern Chrome extension architecture
- **Content Scripts** – Facebook post detection and UI injection
- **Service Worker** – Background API communication

### DevOps
- **Docker** – Containerization (Backend, Frontend, Qdrant)
- **Docker Compose** – Full-stack local development setup

## Getting Started

### Prerequisites Setup

#### Option 1: Docker Compose (Recommended for Full Stack)

Start all services with Docker Compose:
```bash
docker-compose up -d
```

This will start:
- Qdrant vector database on `http://localhost:6333`
- Backend API on `http://localhost:8000`
- Frontend on `http://localhost:3000`

**Note:** Make sure to set all required environment variables in a `.env` file at the project root:
```env
OPENAI_API_KEY=your_openai_api_key
TAVILY_API_KEY=your_tavily_api_key
GOOGLE_FACT_CHECK_API_KEY=your_google_factcheck_key
DATABASE_URL=your_database_url
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Option 2: Local Development (Manual Setup)

Start only Qdrant for local development:
```bash
docker-compose up -d vector-db
```

Then follow the individual setup instructions below for backend and frontend.

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
   pip install fastapi uvicorn langgraph langchain-openai langchain-tavily qdrant-client transformers torch sentence-transformers httpx python-dotenv
   ```

4. **Configure environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   GOOGLE_FACT_CHECK_API_KEY=your_google_factcheck_api_key_here
   QDRANT_URL=http://localhost:6333
   QDRANT_COLLECTION_NAME=verifiai_claims
   ```

5. **Run the backend server:**
   ```bash
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
   ```

3. **Set up database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   DATABASE_URL=your_database_url_here
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### Chrome Extension Setup

1. **Generate extension icons:**
   - Open `chrome-extension/generate-icons.html` in your browser
   - Click "Generate Icons" and save them to `chrome-extension/icons/`
   - Or create 16x16, 48x48, and 128x128 PNG files manually

2. **Load the extension in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder

3. **Configure API URL:**
   - Click the extension icon in Chrome toolbar
   - Enter your backend API URL (default: `http://localhost:8000`)
   - Click "Save Settings"

4. **Start using:**
   - Navigate to Facebook (facebook.com)
   - Look for "Fact Check" buttons on posts
   - Click to verify any post!

For more details, see [chrome-extension/README.md](chrome-extension/README.md)

## Key Agent Files

| Agent/Node | File |
|------------|------|
| QueryGenerator | `backend/app/agents/query_generator.py` |
| SearchExecutor | `backend/app/agents/search_executor.py` |
| EvidenceEvaluator | `backend/app/agents/evidence_evaluator.py` |
| ScoringNode | `backend/app/agents/scoring_node.py` |
| DomainTrustAgent | `backend/app/agents/domain_trust_agent.py` |
| SemanticCrossrefAgent | `backend/app/agents/semantic_crossref_agent.py` |
| GoogleFactCheckAgent | `backend/app/agents/google_factcheck_agent.py` |
| FakeNewsModelAgent | `backend/app/agents/fake_news_model_agent.py` |
| ReportGenerator | `backend/app/agents/report_generator.py` |
| LangGraph Workflow | `backend/app/workflows/verification_workflow.py` |
| Verification Service | `backend/app/services/verification_service.py` |
| LLM Service | `backend/app/services/llm_service.py` |
| Search Service | `backend/app/services/search_service.py` |

## API Documentation

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
  "sources": ["url1", "url2", "url3"],
  "potential_fake_score": 45,  // Only present if verdict == "UNCERTAIN"
  "score_breakdown": {          // Only present if verdict == "UNCERTAIN"
    "domain_trust": 15,
    "semantic_crossref": 12,
    "google_factcheck": 10,
    "fake_news_model": 8
  }
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/verification/verify" \
  -H "Content-Type: application/json" \
  -d '{"claim": "Your claim here"}'
```

## Verification Criteria

### Three-Tier Verdict System

- **FAKE**: Positive evidence the claim is false
  - Contradicted by official sources
  - Debunked by fact-checkers
  - Contains proven factual errors
  
- **LEGIT**: Clear, authoritative evidence directly confirming the claim
  - Official statements confirming the claim
  - Reputable news with primary sources
  - Fact-checkers verifying the claim
  
- **UNCERTAIN**: Default when evidence is insufficient
  - No credible sources found
  - Conflicting information
  - Ambiguous or insufficient evidence
  - **Critical Rule**: Absence of evidence ≠ evidence of falsehood

### 4-Signal Risk Scoring (UNCERTAIN only)

When verdict is UNCERTAIN, the system applies 4 parallel scoring agents:

1. **Domain Trust (0-30 points)**: Source credibility based on domain reputation
2. **Semantic Cross-Reference (0-25 points)**: Semantic similarity between claim and evidence
3. **Google Fact Check (0-20 points)**: Human fact-checker verdicts
4. **Fake News Model (0-25 points)**: BERT-based pattern detection

**Total Risk Score**: 0-100 (higher = more likely fake)

## Performance

- **Optimized Workflow**: Conditional scoring reduces unnecessary computation
- **Parallel Execution**: All scoring agents run concurrently
- **Efficient Model Loading**: ML models loaded once and reused
- **Error Resilience**: Individual failures don't crash the system
- **Vector Database Caching**: Qdrant integration for semantic search (optional)

## Project Structure

```
ai-fake-news/
├── backend/
│   ├── app/
│   │   ├── agents/              # Agent nodes for workflow
│   │   │   ├── query_generator.py          # Generates search queries
│   │   │   ├── search_executor.py          # Executes searches
│   │   │   ├── evidence_evaluator.py       # Evaluates evidence credibility
│   │   │   ├── scoring_node.py             # Orchestrates 4 scoring agents
│   │   │   ├── report_generator.py         # Generates final report
│   │   │   ├── domain_trust_agent.py       # Domain credibility scoring
│   │   │   ├── semantic_crossref_agent.py  # Semantic similarity analysis
│   │   │   ├── google_factcheck_agent.py   # Google Fact Check API
│   │   │   └── fake_news_model_agent.py    # BERT-based fake news detection
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
│   ├── Dockerfile                            # Backend container definition
│   └── requirements.txt                      # Python dependencies
├── frontend/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   ├── claims/           # Claims management
│   │   │   └── verify/           # Verification endpoints
│   │   ├── console/              # Verification console
│   │   │   ├── verify/           # Verification page
│   │   │   ├── history/          # Verification history
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
│   │   ├── verify.ts               # API client
│   │   ├── auth.ts                # Authentication utilities
│   │   └── prisma.ts              # Prisma client
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Database migrations
│   ├── Dockerfile                 # Frontend container definition
│   └── package.json               # Node.js dependencies
├── chrome-extension/
│   ├── manifest.json             # Extension manifest (Manifest V3)
│   ├── content-script.js         # Facebook post detection and UI injection
│   ├── background.js             # Service worker for API calls
│   ├── popup.html                # Settings page UI
│   ├── popup.js                  # Settings page logic
│   ├── styles.css                # Modal and button styles
│   ├── icons/                    # Extension icons
│   └── README.md                 # Extension documentation
├── docker-compose.yml            # Docker Compose for full stack
└── README.md                     # This file
```

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
- [x] Conditional scoring architecture
- [x] 4-signal credibility framework
- [x] Error handling and validation
- [x] Vector database integration (Qdrant)
- [x] Chrome extension integration
- [x] User authentication (Better Auth)
- [x] Frontend verification console
- [ ] Enhanced report generation
- [ ] Support for multiple languages
- [ ] Comprehensive test coverage
- [ ] Performance optimizations
- [ ] Advanced analytics and reporting
- [ ] User feedback and learning mechanisms
- [ ] Caching layer for repeated claims

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Built with ❤️ to fight misinformation**
