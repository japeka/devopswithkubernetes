/*
Exercise 1.04

Create a deployment.yaml for the project.
You won't have access to the port yet but that'll come soon.

cd .. to ex1.04
kubectl apply -f manifests/deployment.yaml
  =>deployment.apps/express-server-dep created

#Get depl infos
- kubectl get deployments 
- kubectl get pods
  =>express-server-dep-77dfb894fc-jjkj8

#check out the logs
kubectl logs -f express-server-dep-77dfb894fc-jjkj8
  =>Server started in port 3000

kubectl delete deployment express-server-dep
  =>...deleted
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
