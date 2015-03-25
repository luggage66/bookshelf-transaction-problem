# Bookshelf Transaction Problem

Some statments in a transaction execute after a transaction rolls back, thus getting saved to the database.
This is a working sample of the problem.

```
npm install
node index.js
sqlite3 database.sqlite "SELECT * FROM MyTable;"
```

When you run it you'll see the insert happen AFTER the rollback.
