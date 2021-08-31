# JobHunt (React)

JobHunt is a job search posting tracking system where a user can track jobs that they've saved across multiple platforms. This was originally a branch from my other project (FITS), written entirely in Flask. However, when I started learning React, I realized a lot of the functionality that I wanted to add to the site that I found difficult to add in Flask was relatively simple in React, so I migrated the site, first as a learning exercise, but eventually as a full migration.

### What is this site used for?

I got the idea for the site while looking at software engineering jobs. I've come across jobs I was interested in all over the place, from traditional job sites like Indeed, LinkedIn, and Glassdoor, to smaller sites like BuiltInAustin (where I'm located). I've even seen some jobs posted by other developers on Twitter. Before creating this site, I was doing what many other people in my position do: saving all of the information from the job, like requirements, company descriptions, projected salary, etc, to a spreadsheet.

### What if I want to use this code?

The base of this React app was made with create-react-app, meaning that you should be able to pull the code from github, and as long as you have npm installed, you should be able to just run the following to get a dev build up and going:

```
npm install
npm run start
```

That will get the front end up and going. For the backend, you'll need Python and MySQL installed, at a minimum. Follow the instructions on the [backend repo](https://github.com/ColtanF/jobhunt-backend) to set that up.

A few other notes: authentication doesn't entirely work yet, so register/login is mostly for show. You can register new users to the backend as well as "login" (really just verifying a user exists in the backend), but those don't really do anything.
