# Chatbot with FastAPI

This project is a simple chatbot application built with FastAPI. It uses the Google Generative AI model to generate responses. You can personalize the chatbot by adding your own data and configuring the API key.

## Features

- Simple design interface
![Chatbot Interface](/images/chat_interface.png)
- Customizable responses based on your data
- Integration with Google Generative AI

## Setup

### Prerequisites

- Python 3.7+
- FastAPI
- Uvicorn
- Google Generative AI API key

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/bugshadow/chat-bot.git
    cd chat-bot
    ```

2. Install the dependencies:

    ```sh
    pip install -r requirements.txt
    ```

3. Configure your API key:

    - Create a `config.json` file in the root directory of the project and add your Google Generative AI API key:

      ```json
      {
          "api_key": "your_api_key_here"
      }
      ```

4. Personalize your chatbot:

    - Add your personalized data to the `data.json` file in the root directory of the project:

      ```json
      {
          "hello": "Hi there! How can I help you today?",
          "bye": "Goodbye! Have a nice day!"
      }
      ```

### Running the Project

To run the project, use the following command:

```sh
uvicorn chatbot:app --reload

