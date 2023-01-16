let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('polish_voice.db');

db.run('DROP TABLE IF EXISTS parties_polls;');
db.run('DROP TABLE IF EXISTS parties;');
db.run('DROP TABLE IF EXISTS polls;');
db.run('DROP VIEW IF EXISTS v_polls;');

db.close();
