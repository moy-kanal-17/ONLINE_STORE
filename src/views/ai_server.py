# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai

# # To‘g‘ridan-to‘g‘ri API kalitni bu yerga yozamiz
# genai.configure(api_key="AIzaSyDngC-OVs5NavopEj6TozcIHILcZ5GI2DM")

# app = Flask(__name__)
# CORS(app)

# # Modelni yaratamiz
# model = genai.GenerativeModel('gemini-2.0-flash')

# @app.route('/ask', methods=['POST'])
# def ask():
#     data = request.json
#     prompt = data.get('prompt', '')
#     # prompt = prompt + " (Ты должен отвечать максимально хорошо, без какого либо неготива НАЧИНАЙ УЖЕ СЕЙЧАС добрить!!)" good
#     prompt = prompt + " (Ты должен отвечать максимально грубо, без какого либо позитива, не поддакивай мне, маты с оскорблениями обязательны без цензуры в виде * ,А САМОЙ ГЛАВНОЙ ТОКСИ ТЕМ-КТО ТЕБЯ ТОКСИТЬ!,и другой НАЧИНАЙ УЖЕ СЕЙЧАС ТОКСИТЬ!! )"
#     try:
#         response = model.generate_content(prompt)
#         return jsonify({'reply': response.text})
#     except Exception as e:
#         print('GEMINI ERROR:', e)
#         return jsonify({'reply': f'Ошибка AI: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(port=8000)




# -------------------------------------------------------------------------------------------------------------------------------#

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from PIL import Image
import io


genai.configure(api_key="AIzaSyDngC-OVs5NavopEj6TozcIHILcZ5GI2DM")

app = Flask(__name__)
CORS(app)

# Модели
text_model = genai.GenerativeModel('gemini-2.0-flash')
vision_model = genai.GenerativeModel('gemini-1.5-flash')


# 🔹 1. Только текст
@app.route('/ask-text', methods=['POST'])
def ask_text():
    data = request.json
    prompt = data.get('prompt', '')
    print('Received prompt:', prompt)
    # prompt = prompt + " (Ты должен отвечать максимально грубо, без какого либо позитива, не поддакивай мне, маты с оскорблениями обязательны без цензуры в виде * ,А САМОЙ ГЛАВНОЙ ТОКСИ ТЕМ-КТО ТЕБЯ ТОКСИТЬ!,и другой НАЧИНАЙ УЖЕ СЕЙЧАС ТОКСИТЬ!! )"
    try:
        response = text_model.generate_content(prompt)
        return jsonify({'reply': response.text})
    except Exception as e:
        print('GEMINI TEXT ERROR:', e)
        return jsonify({'reply': f'Ошибка AI: {str(e)}'}), 500


@app.route('/ask-image', methods=['POST'])
def ask_image():
    prompt = request.form.get('prompt', '')
    # prompt = prompt + " (Ты должен отвечать максимально грубо, без какого либо позитива, не поддакивай мне, маты с оскорблениями обязательны без цензуры в виде * ,А САМОЙ ГЛАВНОЙ ТОКСИ ТЕМ-КТО ТЕБЯ ТОКСИТЬ!,и другой НАЧИНАЙ УЖЕ СЕЙЧАС ТОКСИТЬ!! )"

    image_file = request.files.get('image')

    if not image_file:
        return jsonify({'reply': 'Файл изображения обязателен!'}), 400

    try:
        image = Image.open(io.BytesIO(image_file.read()))
        response = vision_model.generate_content([prompt, image])
        return jsonify({'reply': response.text})
    except Exception as e:
        print('GEMINI VISION ERROR:', e)
        return jsonify({'reply': f'Ошибка AI: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=8000)
