/*

Develop a second application that simply responds with "pong 0" to a GET 
request and increases a counter (the 0) so that you can see how many requests have been sent. 
The counter should be in memory so it may reset at some point. Create a new deployment for it
and have it share ingress with "Log output" application. Route requests directed '/pingpong' to it.

In future exercises, this second application will be referred to as "ping-pong application". 
It will be used with "Log output" application.

The ping-pong application will need to listen requests on '/pingpong', so you may have to make changes to its code. 
This can be avoided by configuring the ingress to rewrite the path, but we will leave that as an optional exercise. 
You can check out https://kubernetes.io/docs/concepts/services-networking/ingress/#the-ingress-resource

---

#Dockerfile, tag & push img to dockerhub
created => jannek100/devopskubex109

- docker build . -t ex1.09
- docker tag ex1.09 jannek100/devopskubex109
- docker push jannek100/devopskubex109

deployment.yaml  > done
service.yaml   > done
ingress.yaml   > done

kubectl apply -f manifests/deployment.yaml
  deployment.apps/express-server-html-pong-dep created
kubectl apply -f manifests/service.yaml
  service/express-server-html-pong-svc created
kubectl apply -f manifests/ingress.yaml
  ingress.networking.k8s.io/express-server-html-pong-ingress created

kubectl get svc,ing

localhost:8081/pingpong

=>pong 0

kubectl delete -f manifests/

kubectl delete -f deployment.yaml

*/

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
let num = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pingpong', (req, res) => {
  res.send(`pong ${num++}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});