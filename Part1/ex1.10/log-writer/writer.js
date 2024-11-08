/*
Exercise 1.10: Even more services
Split the "Log output" application into two different containers within a single pod:
One generates a new timestamp every 5 seconds and saves it into a file.
The other reads that file and outputs it with a hash for the user to see.
Either application can generate the hash. The reader or the writer.
You may find this helpful now since there are more than one container running inside a pod.

---

#Dockerfile, tag & push img to dockerhub
- docker build . -t ex1.10.writer
- docker tag ex1.10.writer jannek100/devopskubex110writer
- docker push jannek100/devopskubex110writer

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
const dotenv = require('dotenv');
const path = require('path');

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const logFilePath = path.join(directory, 'log.txt')

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (!fs.existsSync(logFilePath)) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  const timestamp = new Date().toISOString();
  fs.writeFileSync(logFilePath, `${timestamp}\n`, 'utf8');
  console.log('Log file created at:', logFilePath);
}

const writeTimestamp = () => {
  const timestamp = new Date().toISOString();
  fs.appendFile(logFilePath, `${timestamp}\n`, (err) => {
      if (err) {
          console.error('Error writing timestamp to file:', err);
      } else {
          console.log('Timestamp saved:', timestamp);
      }
  });
};

setInterval(writeTimestamp, 5000);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});