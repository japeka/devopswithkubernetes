import { v4 as uuidv4 } from 'uuid';

/*
Exercise 1.01

Exercises can be done with any language and framework you want.
Create an application that generates a random string on startup, 
stores this string into memory, 
and outputs it every 5 seconds with a timestamp. e.g.

2020-03-30T12:15:17.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43
2020-03-30T12:15:22.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43

Deploy it into your Kubernetes cluster and confirm that it's running with kubectl logs ...
You will keep building this application in the future exercises. This application will be called "Log output".

-jannek100/devopskubex101
-docker tag ex1.01 jannek100/devopskubex101
-docker push jannek100/devopskubex101

$ kubectl create deployment randomstring-dep --image=jannek100/devopskubex101
deployment.apps/randomstring-dep created

-kubectl get pods
- kubectl logs -f randomstring-dep-6458f49cb7-ghq8h

$ kubectl logs -f randomstring-dep-6458f49cb7-ghq8h
...

2024-10-14T10:49:52.108Z: 123a032e-cf35-4ccb-8f28-1ee82505ca2c
2024-10-14T10:49:57.118Z: 38c737c5-149b-4c5b-8d85-088b29802756
...

*/

const arr = [];
const generateRandomString = () => {
    var data = `${new Date().toISOString()}: ${uuidv4()}`;
    arr.push(data)
    console.log(data);
    setTimeout(generateRandomString, 5000)
}
  
generateRandomString();