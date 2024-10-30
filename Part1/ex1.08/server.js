/*

Exercise 1.08: Project v0.5

Switch to using Ingress instead of NodePort to access the project. 
You can delete the ingress of the "Log output" application so they don't interfere with this exercise.
We'll look more into paths and routing in the next exercise and at that point you can configure project 
to run with the "Log output" application side by side.

---

#Dockerfile, tag & push img to dockerhub
created => jannek100/devopskubex106

[optional]
- docker build . -t ex1.06
- docker tag ex1.06 jannek100/devopskbex106
- docker push jannek100/devopskubex106
or just use jannek100/devopskubex106

deployment.yaml  > done
service.yaml   > done
ingress.yaml   > done

kubectl apply -f manifests/deployment.yaml
  deployment.apps/express-server-html-v3 created
kubectl apply -f manifests/service.yaml
  service/express-server-html-v3-svc created
kubectl apply -f manifests/ingress.yaml
  ingress.networking.k8s.io/jpk-express-material-ingress created

kubectl get svc,ing

localhost:8081

=>AKS is cool
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