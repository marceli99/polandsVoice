const {showError} = require("./common");
let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('polish_voice.db');

db.run(`
CREATE TABLE IF NOT EXISTS parties (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    logo TEXT NOT NULL
);
`, showError);

db.run(`
CREATE TABLE IF NOT EXISTS polls (
    id INTEGER PRIMARY KEY NOT NULL,
    company_name TEXT NOT NULL,
    sample INTEGER,
    method TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);
`, showError);

db.run(`
CREATE TABLE IF NOT EXISTS parties_polls (
    poll_id INTEGER,
    party_id INTEGER,
    popularity DECIMAL(4, 2),
    PRIMARY KEY (poll_id, party_id),
    FOREIGN KEY (poll_id) REFERENCES polls(id),
    FOREIGN KEY (party_id) REFERENCES parties(id)
);
`, showError);

db.run(`
CREATE VIEW v_polls
AS
SELECT
    polls.id,
    company_name AS company,
    sample,
    COALESCE(NULLIF(method, ''), '-') AS method,
    strftime('%d.%m', start_date) || '-' || strftime('%d.%m', end_date) as date,
    start_date,
    end_date,
    group_concat(short_name || ':' || popularity, ',') as popularity
FROM polls
INNER JOIN parties_polls ON parties_polls.poll_id = polls.id
INNER JOIN parties ON parties_polls.party_id = parties.id
GROUP BY polls.id
ORDER BY polls.end_date DESC
`, showError);

db.close();
