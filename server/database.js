const mysql = require("mysql2");

/*Benutzer:
    ID INT AutoIncrement PRIMARY KEY
    Name VARCHAR 50
    Nachname VARCHAR 50
    Bestätigt ENUM Y,N
*/

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      port: 3306,
      password: "tbhhsy78",
      database: "wtcapp",
      insecureAuth: true,
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Database;
