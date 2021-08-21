# About running our cypress tests.
We have two directories containing tests; `/offline/` and `/online/`.
The tests in `/offline/` should be run without the Node.JS application running,
while the tests in `/online/` should be run with the Node.JS application running.

Reason being; there are certain pages with sensitive data which we cannot interact with 
for the sake of our tests, thus we provide the pages with fake data.

---

To run the `/online/` tests you can run one of the following commands from the `/server/` directory.

```start cmd /k "node server.js" && npx cypress run --spec "./cypress/integration/pad/online/*"```

<br>

To run the `/offline/` tests you can run the following command from the `/server/` directory.

```npx cypress run --browser chrome --spec "./cypress/integration/pad/offline/*"```