import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()


class LLMService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError(
                "OPENAI_API_KEY environment variable is not set. Please set it in your .env file or environment."
            )

       
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1, api_key=api_key)

    def invoke(self, prompt: str) -> str:
        response = self.llm.invoke(prompt)
        return response.content


llm_service = LLMService()