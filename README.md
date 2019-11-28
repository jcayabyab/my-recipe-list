# 471 Final Project

## First time installation instructions

Ensure node.js and MySQL Workbench + Server are installed on your computer.

To install, try running `npm run ins` in the folder. If that doesn't work, then try:

```
npm i
cd client
npm i
```

To initialize the database, open `utils/db-model.mwb`. You should see the following page:

![](docs/images/init1.png)

Navigate to Database -> Forward Engineer...

![](docs/images/init2.png)

Keep clicking Next. When you get to this page, ensure the settings are the same:

![](docs/images/init3.png)

Now run `npm run dev`.