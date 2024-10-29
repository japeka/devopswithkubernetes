/*

Exercise 1.06: Project v0.4
Use a NodePort Service to enable access to the project.

---

#Dockerfile, tag & push img to dockerhub
created => jannek100/devopskubex106

- docker build . -t ex1.06
- docker tag ex1.06 jannek100/devopskbex106
- docker push jannek100/devopskubex106

k3d cluster delete
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2

cd .. /ex1.06
kubectl apply -f manifests/deployment.yaml
  =>deployment.apps/express-server-html-v2-dep created

kubectl get po
express-server-html-v2-dep-85f6646975-8f8jh

$ kubectl apply -f manifests/service.yaml
  service/express-server-html-v2-svc created

access
=> http://localhost:8082

*/

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});