#노드 이미지 사용
FROM node:16.20 

#/usr/src로 이동

WORKDIR /usr/src

# package 복사
COPY package*.json ./

#npm install
RUN npm install

#파일전체복사
COPY . .

# 컨테이너 내부포트
#EXPOSE 30001
EXPOSE 3000

#커맨드 실행
CMD ["npm", "run", "mynode"]