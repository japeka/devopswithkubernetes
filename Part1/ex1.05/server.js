/*
Exercise 1.05 : Project v0.3

Have the project respond something to a GET request sent to the project. 
A simple html page is good or you can deploy something more complex like a single-page-application.
See here how you can define environment variables for containers.
Use kubectl port-forward to confirm that the project is accessible a
nd works in the cluster by using a browser to access the project.

---

#Dockerfile, tag & push img to dockerhub
created => jannek100/devopskubex105

- docker build . -t ex1.05
- docker tag ex1.05 jannek100/devopskubex105
- docker push jannek100/devopskubex105

=> done
cd .. /ex1.05
kubectl apply -f manifests/deployment.yaml
  =>deployment.apps/express-server-html-dep created

kubectl get po
express-server-html-dep-bb457d6f8-ldwbw


kubectl port-forward hashresponse-dep-755b5b5dd7-ggxxq 3003:3000
=> html page served at port 3003
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