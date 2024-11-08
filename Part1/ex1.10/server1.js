/*
Exercise 1.10: Even more services
Split the "Log output" application into two different containers within a single pod:

One generates a new timestamp every 5 seconds and saves it into a file.
The other reads that file and outputs it with a hash for the user to see.
Either application can generate the hash. The reader or the writer.
You may find this helpful now since there are more than one container running inside a pod.

---



#Dockerfile, tag & push img to dockerhub
created => jannek100/devopskubex110reader & jannek100/devopskubex110writer

these are done in reader and writer folder
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

kubectl delete -f manifests/

kubectl get po
=>images-dep-5d8dc877d9-r5f5m
kubectl logs -f file-log-dep-7c79f96768-h79l9
logs printed

Timestamp: 2024-11-08T08:58:46.236Z, Hash: 38820f3afdcb73e9f63c908a03039d0a6c7d4e143812caa45ebe95454f285f7e
Timestamp: 2024-11-08T08:58:50.739Z, Hash: 9bd760de9a8487d10239923a1d191a55bde70084a78ad3d0b6f4f73bab05853a
..
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