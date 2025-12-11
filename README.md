# AI Fake News (WIP)

Work-in-progress backend intended to power a Chrome Extension that evaluates claims by searching for evidence and synthesizing a verification report.

## Status
- 🚧 Early development; interfaces and responses may change without notice.
- 🔒 No production deployment yet; expect breaking changes.

## Overview
- Receives a claim from the extension, generates search queries, gathers evidence, and evaluates credibility.
- Uses agent-like services for search, LLM reasoning, and verification workflow coordination.
- Designed to return a concise report back to the extension for display.

## Quick Start
1) Ensure Python 3.11+ is available.
2) Create a virtual environment and install dependencies:
   - `python -m venv .venv`
   - `source .venv/bin/activate`
   - `pip install -r requirements.txt`
3) Set environment variables (see `.env` example) for any API keys required by search or LLM providers.
4) Run the backend (example): `python -m app.main`

## Project Structure
- `backend/app/agents/` – query generation, search execution, evidence evaluation, report generation.
- `backend/app/services/` – integrations like search, LLM, and verification orchestration.
- `backend/app/workflows/` – end-to-end verification flows.
- `backend/app/api/routes/` – HTTP interface (e.g., verification endpoint).

## File Roles (key modules)
- `backend/app/agents/query_generator.py` – crafts search queries from the incoming claim.
- `backend/app/agents/search_executor.py` – runs search requests via the search service and collects raw hits.
- `backend/app/agents/evidence_evaluator.py` – scores/filters retrieved evidence and assesses credibility.
- `backend/app/agents/report_generator.py` – assembles the final verification report payload.
- `backend/app/services/search_service.py` – wraps the search provider API.
- `backend/app/services/llm_service.py` – handles LLM calls for reasoning/summarization.
- `backend/app/services/verification_service.py` – orchestrates verification steps between agents and services.
- `backend/app/workflows/verification_workflow.py` – coordinates the full verification flow entry point.
- `backend/app/api/routes/verification.py` – HTTP endpoint for verification requests.

## Chrome Extension Integration (concept)
- Extension sends the highlighted claim to the backend API.
- Backend returns a verification summary and supporting evidence.
- Extension renders the report in-page for the user.

## Contributing
- Please open issues or proposals before large changes.
- Keep configs and secrets out of version control; rely on `.env`.

## Roadmap
- Harden APIs for extension use.
- Improve evidence scoring and reporting UX.
- Add tests and observability for workflows.
