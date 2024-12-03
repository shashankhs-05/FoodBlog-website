from flask import Flask, request, jsonify,render_template
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

app = Flask(__name__, template_folder='public',static_folder='public',static_url_path='/public',)

def summarize_text(text, sentence_count=5):

    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, sentence_count)
    summary_text = " ".join(str(sentence) for sentence in summary)
    return summary_text

@app.route('/summarize', methods=['POST'])
def summarize_endpoint():
    text = request.form.get('text', '')
    print(text)

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    summary = summarize_text(text)
    return render_template('quickbut2.html', summary=summary)

if __name__ == '__main__':
    app.run(debug=True)
