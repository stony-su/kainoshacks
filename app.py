from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Get the JSON data from the request
        data = request.json

        # Prepare the input for the ChatGPT API
        prompt = f"City: {data.get('demo-city')}\n"
        prompt += f"Budget: {data.get('demo-budget')}\n"
        prompt += f"Adults: {data.get('demo-adults')}\n"
        prompt += f"Children: {data.get('demo-children')}\n"
        prompt += f"Priority: {data.get('demo-priority')}\n"
        prompt += f"School: {data.get('demo-school')}\n"
        prompt += f"Crime: {data.get('demo-crime')}\n"
        prompt += f"Good Community: {data.get('demo-good')}\n"
        prompt += f"Multi National Community: {data.get('demo-multi')}\n"
        prompt += f"Additional Notes: {data.get('demo-message')}\n"

        # Call the ChatGPT API
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=150
        )

        # Return the response from ChatGPT
        return jsonify({'response': response.choices[0].text.strip()})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)