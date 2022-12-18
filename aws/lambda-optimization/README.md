# Optimize AWS Lambda in NodeJS

How to improve your AWS Lambda performance. 
This section, I will explain basic concept of AWS Lambda and get deeper into behind the scenes of Lambda compute. You will understand apparently about Lambda works.

## About AWS Lambda

AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. This concept models is called `function as a service` (FaSS).

There are utilitys inside single  follow as below

- Load balancer
- Auto scaling
- Handling Failures
- Security Isolation
- Managing Utilization.

### Overview serverless application

![serverless-application-png]

Lamba is used in many propose such as logic webserver, batch job etc.

**Learn more**
_[Introduction to AWS Lambda & Serverless Applications]_

### Lambda Invacation

### Pricing Model

AWS Lamda cost per time is depend on 2 parameters

1. Memory allocated

2. Execution Time (ms) _(if execution time less than 1 ms, it equal to 1 ms)_

Cost calcuation formular

```txt
cost (GB-seconds) = memery_usage * execution_time 
```

## Optimization

The most optimization propose is cost reduction, otherwise reduce code time in timeout limitation. I just classify optimization into 3 step 

1. Best Practice Serverless Architecting

2. Optimize code

3. AWS Lambda Power Tuning

### 1. Best Practice Serverless Architecting

There's limitation of Lamda such as `timeout` `code size` etc. So you need to use Lambda to right propose. There are 2 models of Lambda architecting.

1. 

2. 

### 2. Optimize code

### 3. AWS Lambda Power Tuning



---

## Resources

- [AWS re:Invent 2018 - A Serverless Journey: AWS Lambda Under the Hood (SRV409-R1)]

- [AWS re:Invent 2022 - A closer look at AWS Lambda (SVS404-R)]

<!-- Link Reference -->

[serverless-application-png]: ./assets/serverless-application.png

[Introduction to AWS Lambda & Serverless Applications]: https://www.youtube.com/watch?v=EBSdyoO3goc
[AWS re:Invent 2018 - A Serverless Journey: AWS Lambda Under the Hood (SRV409-R1)]: https://www.youtube.com/watch?v=QdzV04T_kec
[AWS re:Invent 2022 - A closer look at AWS Lambda (SVS404-R)]: https://www.youtube.com/watch?v=0_jfH6qijVY
