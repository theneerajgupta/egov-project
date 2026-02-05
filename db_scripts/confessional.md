# Confessional

---

well we all need to have that one place where you can just talk with yourself,
you know. For kids out there, gen-zs, i am talking about chat-gpting yourself.
its good for your health, you ought to do it more often. i am not willing to
give up on the lost art of writing so easily. so lets get this project rolling.

---

# February 05, 2026 [ Riyaz ]

ok let me give you a run down of what we learned yesterday. 4th Feb 2026, was
the momentus occasion when i finally understood how an API endpoint is properly
created. you need to understand that i am writing the backend using typescript
in node and express environment.

listen up close. you have the following files.

**server.ts** the 'main.c' file of your project this includes logic to safely
start and stop the application.

**app.ts** where the actually server is created we attach routers & middlewares
to the server in this file.

technically speaking you can write the entire server in the one 'server.ts' file
itself, if you are psychopathic enough to do it. (which i am not gonna lie).
maybe i will develop an application just to do everything in one file. muahaha,

jokes aside. let me tell you about the application lifecycle.

you see every server, that you will ever create and run in your life will
require you to know 2 things

- why you are running the server?
- and how does it work?

the first will help you understand the scope and rationale of the project.
define it well, cuz that will impact the second question. 'how it works?' right
now we are building a 'http server' who is tasked with working with a
database(mysql), to run an egovernance platform.

so we have a client -> frontend (written in react) we have a datastore -> mysql8

and we sit in the middle

- [ client ] decides to submit an application
- [ client ] presses send
- [ client ] information packed into a HTTP Request
- [ HTTP Request ] Headers + Information (Body) + Trailers
  - Headers : meta data about the request, format of information, security
    codes, etc
  - Body: Information you are sending through this request
  - Trailers: (optional) only sent if and when you are streaming data

- [ server ] receives HTTP Request
- [ server ] runs global middlewares
- [ server ] based on router & method -> assign router
- [ router : middleware ] checks headers
- [ router : middleware ] validates informtion based on schema
- [ router ] passes on valid request to controller
- [ controller ] deligates work to appropriate services
  - holds try-catch logic for security
  - manages http response
- [ server : services ] holds business logic
  - has access to database
    - create database connection
    - run database queries
    - create & orchestrate database transcations
    - makes use of [ repositories ]
    - makes use of [ schemas ]
    - makes use of [ databasePool ]
- [ server ] when query processed -> create HTTP Response
- [ server ] when error detected -> yeet -> create HTTP Response
- [ server ] return HTTP Response back to client.

so to recap

- [ server ] : entry point / safe start-stop logic
- [ app ] : actual server logic + routers + global middlewares
- [ router ] : define routes (organizes requests)
- [ middlewares ] : process http request before processing
- [ controller ] : orchestrate flow of information / no logic
- [ services ] : business logic / what needs to happen
- [ repositories ] : how data is accessed
- [ schemas ] : logical representation of the database

This describes the minimum mental model required to reason about backend
systems; everything else is an extension of these ideas.
