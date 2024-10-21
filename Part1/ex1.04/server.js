/*
Exercise 1.03

In your "Log output" application create a folder for manifests 
and move your deployment into a declarative file.
Make sure everything still works by restarting and following logs.

cd .. to ex1.03
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
