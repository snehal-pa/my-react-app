const sqlite3 = require("better-sqlite3");

module.exports = class DbHandler {
  constructor(pathToDb) {
    this.db = sqlite3(pathToDb);
  }

  select(sql, parameters) {
    let statements = this.db.prepare(sql);
    return parameters ? statements.all(parameters) : statements.all();
  }

  run(sql, parameters) {
    let statement = this.db.prepare(sql);
    // here we use the statement with the method 
    // run (the correct method if it does not return data)
    return parameters ? statement.run(parameters) : statement.run();
  }
};
