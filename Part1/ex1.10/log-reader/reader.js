/*
Exercise 1.10: Even more services
Split the "Log output" application into two different containers within a single pod:
Split the "Log output" application into two different containers within a single pod:
One generates a new timestamp every 5 seconds and saves it into a file.
The other reads that file and outputs it with a hash for the user to see.
Either application can generate the hash. The reader or the writer.
You may find this helpful now since there are more than one container running inside a pod.
---

#Dockerfile, tag & push img to dockerhub
ex1.10.reader
- docker build . -t ex1.10.reader
- docker tag ex1.10.reader jannek100/devopskubex110reader
- docker push jannek100/devopskubex110reader

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
kubectl delete -f deployment.yaml
*/

const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv');
const path = require('path');

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const logFilePath = path.join(directory, 'log.txt')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
let num = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const readTimestampHash = () => {
  if (!fs.existsSync(logFilePath)) {
    console.log('Log file does not exist yet. Waiting...');
    return;
  }
  fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading log file:', err);
          return;
      }
      const entries = data.trim().split('\n');
      entries.forEach(entry => {
          const hash = crypto.createHash('sha256').update(entry).digest('hex');
          console.log(`Timestamp: ${entry}, Hash: ${hash}`);
      });
  });
};

setInterval(readTimestampHash, 5000);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});