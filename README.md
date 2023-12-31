# 꼬꼬단 : 꼬리에 꼬리를 무는 단어

![logo](/image/logo_greyhoodie.png)


한국인을 위한 영단어 학습용 단어 유사도 추측 게임


## 프로젝트 개요
- 약 3000개의 토익 영단어 중 하나와 사용자가 입력한 단어의 유사도를 이용하여 정답 단어를 추측할 수 있습니다.
- 시도 횟수, 입력한 단어, 뜻, 유사도, 유사도 순위를 제공합니다.
- 본 프로젝트는 UN의 17가지 Sustainable Development Goals 중 4번 목표인 Quality Education 달성을 목표로 합니다. 


## 구현 사이트
### [꼬꼬단](http://shogle.site:10022/)
<img width="1280" alt="꼬꼬단 페이지" src="https://github.com/Daanyong/cocodan/assets/101034775/17bab784-99eb-4f39-84ae-82c321a71499">

## Word 임베딩
![word2vec시각화](https://github.com/Daanyong/cocodan/assets/101037541/5fbf7a4f-80d3-4d4b-ace1-75066103492c)

## 상세 안내
- [Semantle](https://semantle.com)을 참고하였습니다.
- 사용자는 정답 단어를 추측해가는 과정에서 유의어 및 각 단어의 의미를 알게 되며, 이것은 사용자의 영단어 학습에 도움을 줄 수 있습니다.
- 본 프로젝트는 토익을 위한 영단어를 기반으로 제작하였습니다. 정답 단어는 시중 토익 단어장을 참고하였습니다.
- 모델 학습에는 AI-HUB에서 제공하는 '한국어-영어 번역(병렬)말뭉치'를 사용하였습니다. 이 데이터셋은 현지 구어체 및 문어체(뉴스)를 포함하기 때문에, 실제 대화에서 사용하는 단어를 학습할 수 있습니다.
