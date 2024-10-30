/*
Exercise 1.07: 

"Log output" application currently outputs a timestamp and a random string to the logs.
Let's practice & create new koa app and set it to respond to /status endpoint
Add an endpoint to request the current status (timestamp and string) 
and an ingress so that you can access it with a browser.
You can just store the string and timestamp to the memory.

---
#Dockerfile, tag & push img to dockerhub
  created => jannek100/devopskbex107
  devopskbex107
- docker build . -t ex1.07
- docker tag ex1.07 jannek100/devopskbex107
- docker push jannek100/devopskbex107

deployment.yaml  > done
service.yaml   > done
ingress.yaml   > done

kubectl apply -f manifests/deployment.yaml
  deployment.apps/koa-server-html-dep created
kubectl apply -f manifests/service.yaml
  service/koa-server-html-svc created
kubectl apply -f manifests/ingress.yaml
  ingress.networking.k8s.io/jpk-material-ingress created

kubectl get svc,ing

(
kubectl delete -f manifests/deployment.yaml
tai kubectl delete -f ex1.07/manifests/
) 

kubectl get svc,ing
NAME                                 TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
service/express-server-html-v2-svc   NodePort    10.43.130.86   <none>        1234:30080/TCP   24h
service/koa-server-html-svc          ClusterIP   10.43.62.179   <none>        2345/TCP         2m11s
service/kubernetes                   ClusterIP   10.43.0.1      <none>        443/TCP          24h

NAME                                             CLASS     HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/jpk-material-ingress   traefik   *       172.18.0.2,172.18.0.3,172.18.0.5   80      114s

We can see that the ingress is listening on port 80. 
As we already opened port there we can access the 

http://localhost:8081/status

=>
{
"timestamp": "2024-10-30T13:02:49.193Z",
"randomString": "w7sad"
}

*/

const Koa = require('koa');
const Router = require('@koa/router');
const dotenv = require('dotenv');

// Initialize Koa app and router
const app = new Koa();
const router = new Router();

// Initialize variables to store timestamp and random string
let currentTimestamp = new Date().toISOString();
let randomString = Math.random().toString(36).substring(7); // Random string generator

// Log output function to update timestamp and string
function logOutput() {
  currentTimestamp = new Date().toISOString();
  randomString = Math.random().toString(36).substring(7);
  console.log(`Timestamp: ${currentTimestamp}, Random String: ${randomString}`);
}

// Set an interval to update the log output every X seconds (e.g., 5 seconds)
setInterval(logOutput, 5000);

// Endpoint to get the current status
router.get('/status', (ctx) => {
  ctx.body = {
    timestamp: currentTimestamp,
    randomString: randomString,
  };
});

// Use the router middleware
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 8080;;

app.listen(port, () => {
  console.log(`Koa server running on http://localhost:${port}`);
});
