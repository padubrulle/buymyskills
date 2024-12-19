<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# BuyMySkills | E-commerce nestJS app

This site is a simple ecommerce nestJS typescript app. It purpose is to connect recruiters and their futures team mates based on skills and average daily rate (ADR).

❗ Disclaimer : This site does not intent to fix prices, it just serves as a "base" for negotiations if a match append ❗

This project is splitted in two repositories:

* The current project for the back-end with ![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?logo=nestjs&logoColor=white)
* <a href="https://github.com/padubrulle/bmskills-front/">This project</a> for the front-end with ![ReactJS](https://img.shields.io/badge/-ReactJS-35495E?logo=react) 

This part is about creating the RESTAPI and manage business logic.

## Requirements

* Docker : https://www.docker.com/products/docker-desktop/
* NodeJS : https://nodejs.org/en
* IDE like VSCode : https://code.visualstudio.com/

## Project setup

First you need to setup postgres docker container. 

Please run the following commands : 
```bash
$ docker pull postgres

$ docker run -d --name postgresCont -p 5431:5432 -h localhost -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=my_secret_password -e POSTGRES_DB=buymyskills postgres
```

You can replace my_secret_password by any password you like.

Using pgadmin you can now connect to localhost:5431 using user postgres and password "my_secret_password" 

Clone the project on your computer.

Open it with vscode. You can open a terminal inside by using ctrl + shift + ù.

In the terminal, execute following command : 

```bash
$ npm install
```

At the root of the project create a file named .env and insert this : 
```bash
DB_USERNAME="postgres"
DB_PASSWORD="my_secret_password"
SCHEMA="public"
DATABASE="buymyskills"
```

Congrats! Setup is now complete! 

You can now...

## Compile and run the project

The short hand : execute 

```bash
# watch mode
$ npm run start:dev
```

Else, here are the possibilities.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
