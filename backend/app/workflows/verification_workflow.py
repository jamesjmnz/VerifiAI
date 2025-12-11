from langgraph.graph import StateGraph, END

from app.agents.evidence_evaluator import evidence_evaluator_node
from app.agents.query_generator import query_generator_node
from app.agents.report_generator import report_generator_node
from app.agents.search_executor import search_executor_node
from app.models.state import VerificationState


def create_verification_workflow():
    workflow = StateGraph(VerificationState)

    workflow.add_node("query_generator", query_generator_node)
    workflow.add_node("search_executor", search_executor_node)
    workflow.add_node("evidence_evaluator", evidence_evaluator_node)
    workflow.add_node("report_generator", report_generator_node)


    workflow.set_entry_point("query_generator")
    workflow.add_edge("query_generator", "search_executor")
    workflow.add_edge("search_executor", "evidence_evaluator")
    workflow.add_edge("evidence_evaluator", "report_generator")
    workflow.add_edge("report_generator", END)

    return workflow.compile()