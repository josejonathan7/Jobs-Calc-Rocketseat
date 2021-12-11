"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sqlite3 = require('sqlite3');
var _sqlite = require('sqlite');

  const database = () =>
	_sqlite.open.call(void 0, {
		filename: "./database.sqlite",
		driver: _sqlite3.Database
	}); exports.database = database;

