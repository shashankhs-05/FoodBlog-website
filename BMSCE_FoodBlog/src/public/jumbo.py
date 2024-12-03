from flask import Flask, request
import traceback

app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        message = request.json.get('message')
        print('Received message:', message)
        return {'summary': message}
    except Exception as e:
        print('Error:', e)
        traceback.print_exc()
        return {'error': str(e)}

if __name__ == '__main__':
    app.run(port=5000)
