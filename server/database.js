const mysql = require("mysql2");
//set up mariadb on init
//install mariadb version 10.11.1 RC
/*Release date: 2022-11-17

File name: mariadb-10.11.1-winx64.msi

File size: 68.2 MB

Download galera-26.4.13*/

//use HeidiDB or comandline

//database name "wtcapp"

//table name "users"

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
