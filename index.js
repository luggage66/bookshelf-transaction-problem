var Promise = require('bluebird');

var knex = require('knex')({
	client: 'sqlite3',
	debug: true,
	connection: {
        filename: './database.sqlite'
    }
});

// var knex = require('knex')({
// 	client: 'pg',
// 	debug: true,
// 	connection: 'postgres://user:password@localhost/test-db'
// });

var bookshelf = require('bookshelf')(knex);

// My object setup

var MyObject = bookshelf.Model.extend({
  tableName: 'MyTable'
});

// create table
knex.schema.hasTable('MyTable').then(function(exists) {

    if (!exists) {
        return knex.schema.createTable('MyTable', function (table) {
            table.increments();
            table.string('name').notNullable();
        });
    }
    else {
        return knex('MyTable').delete();
    }

}).then(function() { //create 2, out of order, with TX

    return bookshelf.transaction(function(t) {

        var promise1 = new MyObject({name: 'This object should never get saved'}).save(null, {transacting: t});
        var promise2 = Promise.reject(new Error('SomeError'))

        return Promise.all([ promise1, promise2]);

    });

}).then(function() {

    console.log('done');

}).finally(function() {

    console.log('.finally()');

});
