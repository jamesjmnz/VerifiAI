import time
from app.models.state import VerificationState


def report_generator_node(state: VerificationState) -> VerificationState:
    return state