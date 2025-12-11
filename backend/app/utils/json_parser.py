import ast
import json
import re
from typing import Any, List


def safe_json_parse(response: str, expected_type: type = list) -> Any:
    """
    Safely parse JSON/list from LLM response, handling various formats:
    - Markdown code blocks
    - Extra text before/after
    - Python literal lists
    - JSON strings
    
    Args:
        response: Raw response string from LLM
        expected_type: Expected type (list, dict, etc.). Defaults to list.
    
    Returns:
        Parsed Python object (list, dict, etc.)
    
    Raises:
        ValueError: If parsing fails or result doesn't match expected type
    """
    if not response or not isinstance(response, str):
        raise ValueError(f"Invalid response type: {type(response)}")
    
    cleaned = response.strip()
    
    # Remove markdown code blocks if present
    if "```" in cleaned:
        # Try to extract content from code blocks
        match = re.search(r'```(?:python|json)?\s*\n?(.*?)```', cleaned, re.DOTALL)
        if match:
            cleaned = match.group(1).strip()
    
    # Try to find JSON/list pattern in the response
    # Look for array pattern
    if expected_type == list:
        list_match = re.search(r'\[.*\]', cleaned, re.DOTALL)
        if list_match:
            cleaned = list_match.group(0)
    # Look for object/dict pattern
    elif expected_type == dict:
        dict_match = re.search(r'\{.*\}', cleaned, re.DOTALL)
        if dict_match:
            cleaned = dict_match.group(0)
    
    # Try parsing methods in order of preference
    parse_attempts = [
        ("ast.literal_eval", lambda x: ast.literal_eval(x)),
        ("json.loads", lambda x: json.loads(x)),
    ]
    
    for method_name, parse_func in parse_attempts:
        try:
            result = parse_func(cleaned)
            # Validate type
            if not isinstance(result, expected_type):
                raise ValueError(
                    f"Parsed result is not {expected_type.__name__}, got {type(result).__name__}"
                )
            return result
        except (ValueError, SyntaxError, json.JSONDecodeError) as e:
            continue
    
    # If all parsing attempts failed, raise error with context
    raise ValueError(
        f"Failed to parse response as {expected_type.__name__}. "
        f"Response preview: {response[:200]}..."
    )
