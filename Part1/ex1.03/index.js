/*
Exercise 1.03

In your "Log output" application create a folder for manifests and 
move your deployment into a declarative file.
Make sure everything still works by restarting and following logs.

cd .. to ex1.03
kubectl apply -f manifests/deployment.yaml
    =>deployment.apps/randomstring-dep created

kubectl get deployments 

kubectl get pods
    =>randomstring-dep-c758bb746-2mdkv

kubectl logs -f randomstring-dep-c758bb746-2mdkv

2024-10-21T13:56:32.984Z: 0c4ed4f7-7953-4920-86a7-dc614e5e5fcd
2024-10-21T13:56:38.063Z: 9ce2a3c0-f223-4202-a4bb-b6da8ab7f960


kubectl delete deployment randomstring-dep
  =>...deleted
  
*/

import { v4 as uuidv4 } from 'uuid';

const arr = [];
const generateRandomString = () => {
    var data = `${new Date().toISOString()}: ${uuidv4()}`;
    arr.push(data)
    console.log(data);
    setTimeout(generateRandomString, 5000)
}
  
generateRandomString();