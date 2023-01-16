import sqlite3 from 'sqlite3';

export default class BaseController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;

        this.res.setHeader('Content-Type', 'application/json');
    }

    run_select(query) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database('polish_voice.db');

            db.all(query, [], (err, rows) => {
                if (err !== null) {
                    this.next(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });

            db.close();
        });
    }

    run_query(query) {
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database('polish_voice.db');

            db.run(query, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('OK')
                }
            });

            db.close();
        })
    }

    // sendQueryResults(results) {
    //     this.res.send(results);
    // }
    //
    // sendQueryError(error) {
    //     this.next(error);
    // }
}
