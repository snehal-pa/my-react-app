const DbHandler = require("./DbHandler");

module.exports = class RestApi {
  constructor(app, pathToDb, routePrefix = "/api") {
    this.app = app;
    this.db = new DbHandler(pathToDb);
    this.routePrefix = routePrefix;
    for (let table of this.getAllTables()) {
      this.setUpRoutes(table);
      this.setUpPostRoute(table);
      this.setUpPutRoute(table);
      this.setUpDeleteRoute(table);
    }

    console.log(this.getAllTables());
  }

  getAllTables() {
    return this.db
      .select(
        /*sql*/ `
        SELECT 
            name
        FROM 
            sqlite_master 
        WHERE 
            type ='table' AND 
        name NOT LIKE 'sqlite_%';
        
        `
      )
      .map((table) => table.name);
  }

  setUpRoutes(table) {
    let rp = this.routePrefix;
    // get all posts
    this.app.get(rp + "/" + table, (req, res) => {
      res.json(this.db.select(/*sql*/ `SELECT * FROM ${table}`));
    });

    this.app.get(rp + "/" + table + "/:id", (req, res) => {
      let result = this.db.select(
        /*sql*/ `
      SELECT * FROM ${table}
      WHERE id = $id
      `,
        req.params
        /*"SELECT * FROM " + table + " WHERE id = $id",
        { id: req.params.id }*/
      );
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });
  }

  setUpPostRoute(table) {
    let rp = this.routePrefix;
    // get all posts
    this.app.post(rp + "/" + table, (req, res) => {
      res.json(
        this.db.run(
          /*sql*/ `
      INSERT INTO ${table} (${Object.keys(req.body)})
      VALUES (${Object.keys(req.body).map((x) => "$" + x)})
      `,
          req.body
        )
      );
      //res.json(this.db.select("SELECT * FROM " + table));
    });
  }

  setUpPutRoute(table) {
    //update post
    this.app.put(this.routePrefix + "/" + table + "/:id", (req, res) => {
      console.log(Object.keys);
      res.json(
        this.db.run(
          /*sql*/ `
      UPDATE ${table} 
      SET ${Object.keys(req.body).map((x) => x + "=$" + x)}
      WHERE id =$id
      `,
          { ...req.body, ...req.params }
        )
      );
    });
  }

  setUpDeleteRoute(table) {
    this.app.delete(this.routePrefix + "/" + table + "/:id", (req, res) => {
      res.json(
        this.db.run(
          /*sql*/ `
      DELETE FROM ${table}
      WHERE id = $id
      `,
          req.params
        )
      );
    });
  }
};
