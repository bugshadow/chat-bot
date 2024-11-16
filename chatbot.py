import json
from fastapi import FastAPI, Request
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

#write your gemini api key in config.json
with open("config.json", "r") as config_file:
    config = json.load(config_file)

api_key = config["api_key"]
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)
# Write your data in data.json to personalize your chatbot
with open("data.json", "r") as data_file:
    data = json.load(data_file)

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_response_from_data(question):
    for key, value in data.items():
        if key.lower() in question.lower():
            return value
    return None

@app.post("/ask")
async def ask_chatbot(request: Request):
    body = await request.json()
    question = body.get("question", "")
    
    if question.lower() in ["q", "quit", "exit", "bye"]:
        return {"response": "Goodbye!"}

    response_from_data = get_response_from_data(question)
    if response_from_data:
        return {"response": response_from_data}
    
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(question)
    
    return {"response": response.text}
