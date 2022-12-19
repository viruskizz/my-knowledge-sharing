# Optimize AWS Lambda in NodeJS

How to improve your AWS Lambda performance. 
This section, I will explain basic concept of AWS Lambda and get deeper into behind the scenes of Lambda compute. You will understand apparently about Lambda works.

## Table of Content

- **[About AWS Lambda](#about-awslambda)**
  - [Overview serverless application](#overview-serverless-application)
  - [Lambda Invacation](#lambda-invacation)
  - [Pricing Model](#pricing-model)
- **[Optimization](#optimization)**
  - [Best Practice Serverless Architecting](#1-best-practice-serverless-architecting)
  - [Optimize code](#2-optimize-code)
  - [AWS Lambda Power Tuning](#3-aws-lambda-power-tuning)
- **[Conclusion](#conclusion)**

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

Lambda is sleeping in generally so you need to invoke them for execution. Or in other word, Lambda is vacationing so Lamba invaition mean to Lambda is executioning.

To invoke Lambda.

![lambda-execution-lifecycle-png]


### Pricing Model

AWS Lamda cost per time is depend on 2 parameters

1. Memory allocated

2. Execution Time (ms) _(if execution time less than 1 ms, it equal to 1 ms)_

**Cost calcuation formular**

```txt
Cost (GB-seconds) = Memery_usage * Execution_time 
```

**Lamba profile pricing graph**

This graph shows execute time and memor allocated

![lambda-pricing-graph-png]

## Optimization

The most optimization propose is cost reduction, otherwise reduce code time in timeout limitation. I just classify optimization into 3 step 

1. Best Practice Serverless Architecting

2. Optimize code

3. AWS Lambda Power Tuning

### 1. Best Practice Serverless Architecting

There's limitation of Lamda such as `timeout` `code size` etc. So you need to use Lambda to right propose. There are 2 type of Lambda architecting that categorize by invation model.

#### 1.1 Synchronous

It's usage for API model, request and response instantly. The reponse time is not over 29s. It mean to Lambda execution time is less than 29s too.

#### 1.2 Asynchronous for event

It's used for event model. Lamda need much time to process event. execution time could be used in maximum, 5 minute.

![lambda-invacation-model-png]

### 2. Optimize code

For code optimization, You need to focus 2 things. The one is `speed` and the other one is `size`. There are many way to increase code speed and reduce code. So I would like to suggest you to focus only 2 section in your code

![lambda-lifecycle-png]

#### 2.1 Asychonous Function

Run your asychonous code in parralle as you can. I use `Promiss.all()` instead of `async/await` in some code section

```js
// faster
function getAll(id) {
    return Promise.all([
        this.getUserProfile(id),
        this.getUserHistories(id)
    ]).then(res => { profile: res[1], histories: res[2] });
}

// slower
async function getAll(id) {
    const profile = await this.getUserProfile(id);
    const histories = await this.getUserHistories(id);
    return { profile, histories };
}
```

#### 2.2 Import Function Cost

Specify your imported function to reduce time and code pack size.

```js
// const AWS = require('aws-sdk)
const DynamoDB = require('aws-sdk/clients/dynamodb');

```

#### 2.3 Code Pack

Finally for javascript langauge, to use bundle library to minify your code pack in small piece.
Webpack library example

- [webpack]

- [esbuild]

### 3. AWS Lambda Power Tuning

To set the best ram allocated for lowest cost. In this case, We wil use `AWS Step Function` to run Lambda in every ram allocated configuration and find the lowest cost.

![aws-lambda-power-tuning-png]

You can use [aws-lambda-power-tuning] project to run this machine test.

Thank to _[alexcasalboni]_


## Conclusion

To optimize serverless application, It will be done with entire of team.

|   | Section       | Description | Responsibity |
|---|---------------|----------|--|
| 1 | Architecting  | Serverless architect follow best practice |  Solution Architect |
| 2 | Code          | Code has writen in the good performance   |  Developer          |
| 3 | Configuration | Ram allocate in optimize time and cost    |  Operater           |



_~~ Don't do only done, Just do the best ~~_

---

## Resources

- [AWS re:Invent 2018 - A Serverless Journey: AWS Lambda Under the Hood (SRV409-R1)]

- [AWS re:Invent 2022 - A closer look at AWS Lambda (SVS404-R)]

- [AWS Online Tech Talks - Optimizing Lambda Performance for Your Serverless Applications]

- [Profiling functions with AWS Lambda Power Tuning]


<!-- Link Reference -->
[lambda-execution-lifecycle-png]: ./assets/lambda-execution-lifecycle.png
[lambda-lifecycle-png]: ./assets/lambda-lifecycle.png
[serverless-application-png]: ./assets/serverless-application.png
[lambda-pricing-graph-png]: ./assets/lambda-pricing-graph.png
[lambda-invacation-model-png]: ./assets/lambda-invacation-model.png

[alexcasalboni]: https://github.com/alexcasalboni
[aws-lambda-power-tuning-png]: ./assets/aws-lambda-power-tuning.png
[aws-lambda-power-tuning]: https://github.com/alexcasalboni/aws-lambda-power-tuning

[webpack]: https://webpack.js.org/
[esbuild]: https://esbuild.github.io/

<!-- Resource link -->
[Profiling functions with AWS Lambda Power Tuning]: https://docs.aws.amazon.com/lambda/latest/operatorguide/profile-functions.html
[Introduction to AWS Lambda & Serverless Applications]: https://www.youtube.com/watch?v=EBSdyoO3goc
[AWS re:Invent 2018 - A Serverless Journey: AWS Lambda Under the Hood (SRV409-R1)]: https://www.youtube.com/watch?v=QdzV04T_kec
[AWS re:Invent 2022 - A closer look at AWS Lambda (SVS404-R)]: https://www.youtube.com/watch?v=0_jfH6qijVY
[AWS Online Tech Talks - Optimizing Lambda Performance for Your Serverless Applications]: https://www.youtube.com/watch?v=FTCaOQJvG6Y