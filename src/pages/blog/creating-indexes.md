---
title: 'Introducing to Indexes on Databases (MySQL)'
date: '2020-11-07T05:35:07.322Z'
---

## About

Whenever you run a query, you database engine will scan the table and find you results which match the query. Well, it can be drasically slow if there are good number of rows (even 10,000 rows).

It's important to understand "indexing" and it helps if it's part of you daily development, saves you lot of headache.

Creating and Using Index is pretty simple to begin with, and as you see problems, you can learn more.

### Creating an Index

```
CREATE INDEX index_name ON table_name(column_1, column_2, column_3);
```

You can create index on as many number of columns possible. To begin with, if you have a query where you add "where" clauses, it might help to just add index on those.

```
CREATE INDEX index_name ON table_name(column_1, column_2);
```

In the above index, you created an index on two columns which are subset of above columns, but both are different indexes.

### Deleting Index

```
DROP INDEX index_name ON table_name;
```

### Checking if Query is Index

```
explain select * from table_name where column_1 = 'blah';
```

```
explain select * from table_name where column_1 = 'blah' and column_2 = 'yada';
```

**EXPLAIN** keyword will output analysis if an Index is used and that's your starting point.

### Troubleshooting

It's possible your engine might not be using an index you "just" created. `ANALYZE TABLE table_name;` might help you MySQL to find and use those indexes!
