FROM node:4.6.2

RUN apt-get update && apt-get install -y graphicsmagick
RUN mkdir /app
COPY *.tar.gz /app/.
RUN cd /app \
	&& tar zxf *.tar.gz \
	&& cd /app/bundle/programs/server \
	&& npm install \
	&& mkdir -p /app/bundle/programs/server/tmp/uploads
ENV PORT 3000
ENV ROOT_URL http://localhost:$PORT
ENV UPLOAD_TMP /tmp/uploads
WORKDIR /app/bundle
CMD ["node", "main.js"]
