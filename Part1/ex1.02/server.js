/*
Exercise 1.02: Project v0.1
 
#Dockerhub
jannek100/devopskubex102
created

#Dockerfile, tag & push img to dockerhub
- docker build . -t ex1.02
- docker tag ex1.02 jannek100/devopskubex102
- docker push jannek100/devopskubex102

#Deploy it to kbs
$ kubectl create deployment express-server-dep --image=jannek100/devopskubex102
deployment.apps/express-server-dep created

#Get depl infos
- kubectl get deployments 
- kubectl get pods

#depl.name for server
express-server-dep-6655b7c499-lj6gn

Create a web server that outputs "Server started in port NNNN" 
when it is started and deploy it into your Kubernetes cluster. 
Please make it so that an environment variable PORT can be used to choose that port. 
You will not have access to the port when it is running in Kubernetes yet. We will 
configure the access when we get to networking.

#check out the logs
$ kubectl logs -f express-server-dep-6655b7c499-lj6gn
Server started in port 3000
*/

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
