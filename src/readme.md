# DDD-TS snippets

DDD tries to make sure we capture the right Domain knowledge , behaviors , language in context , 
this project is my personal experience with implementing the different artifacts of DDD using Typescript.

I am using classes and objects to implement domain models.

any comments and contributions are welcome.



## How to Run

I am using ESNext Modules and ts-node doesn't yet support ESNext modules so
I am doing tsc -p tsconfig and then running the built files using nodejs.

- to start building in watch more run ```yarn build```

- to run the a file ```yarn start ./dist/....js // the file you want to run```