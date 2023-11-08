
"""
GDSC greyhoodie 해딩톤 서버
"""

from flask import Flask, redirect,request, url_for, render_template, jsonify
from flask_cors import CORS
from gensim.models import Word2Vec
from secret.secret import NaverPapago_ClientKey, NaverPapago_secret
import os, json
import sys
import urllib.request

app = Flask(__name__)
CORS(app)

def trans(inputText):
    client_id = NaverPapago_ClientKey # 개발자센터에서 발급받은 Client ID 값
    client_secret = NaverPapago_secret # 개발자센터에서 발급받은 Client Secret 값
    encText = urllib.parse.quote(inputText)
    data = "source=en&target=ko&text=" + encText
    url = "https://openapi.naver.com/v1/papago/n2mt"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        tmp = json.loads(response_body)
        result = tmp["message"]["result"]["translatedText"] 
        return result
    else:
        print("Error Code:" + rescode)

# -------------------------------
# 유사도 측정하는 함수!
# 지금은 정적으로 해뒀지만 나중엔 하루에 하나씩 단어가 자동으로 변경되는 코드로 만들 예정~!
# 정답은 admin 링크에 접속했을 때만 접근 가능하도록~

def Similty(inputText):
    # 모델 파일의 경로
    model_path = '/home/thfl9671/coocoodan/flask_sever/model/word2vec_model.model'
    # 모델을 로드
    loaded_model = Word2Vec.load(model_path)
    # print(loaded_model.wv.similarity('data', inputText))
    result = loaded_model.wv.similarity('data', inputText)
    return result

# -------------------------------
@app.route('/')
def hello_world():
    return "root"



# 정보 제공? 부분; 동적으로 오늘 순위같은 정보 제공을 위한 API? 
# 간단하게 서버에서 제공되어야하는 정보들을 제공하는..
# 아직 머 적어야할지 몰라서 그냥 비워뒀어여
@app.route('/information')
def info():
    return 'hello!'


# 이 부분은 사용자가 입력한 단어에 따라서 유사도를 측정하고 다시 클라이언트로 전송하는 그런 API
# 아마 Jqery사용할듯!(페이지 변환없이 자연스럽게 하고 싶어서)
# 실패하면 그냥 리다이렉트로 추가하는 정도... 
# 1. 단어뜻 -> Naver cloud로 해결
# 2. 유사도
# 순위는 아마 못할듯? 그리고 유사도 체크가 살짝 딜레이 잇는듯 근데 신경은 안쓰이는 정도?
@app.route('/result', methods = ['POST'])
def result():
    if request.method == 'POST':
        inputText = request.form['inputText']
        translated = trans(inputText)
        simlity = Similty(inputText)
        j = { "inputText" : inputText,
          "translated" : translated,
          "simlity" : float(simlity) }
        return jsonify(j)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug = True ,port = 10021)