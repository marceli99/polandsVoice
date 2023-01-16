import BaseController from "./base_controller.mjs";

export default class PollsController extends BaseController {
    lastMonth() {
        let query = `
            SELECT * FROM v_polls
            WHERE end_date > datetime('now','-1 month') 
        `;

        this.run_select(query)
            .then((results) => this.res.json(results))
            .catch((error) => this.next(error));
    }

    lastThreeMonths() {
        let query = `
            SELECT * FROM v_polls
            WHERE end_date > datetime('now','-3 month') 
        `;

        this.run_select(query)
            .then((results) => this.res.json(results))
            .catch((error) => this.next(error));
    }

    index() {
        let query = `SELECT * FROM v_polls ORDER BY end_date ASC`;

        this.run_select(query)
            .then((results) => this.res.json(results))
            .catch((error) => this.next(error));
    }

    get() {
        let query = `SELECT pp.party_id, p.name, pp.popularity
FROM parties_polls pp
INNER JOIN parties p on p.id = pp.party_id
WHERE poll_id = ${this.req.params.id}`;
        this.run_select(`SELECT * FROM polls WHERE id = ${this.req.params.id}`)
            .then((poll) => {
                this.run_select(query)
                    .then((parties) => this.res.json({poll: poll[0], parties: parties}))
                    .catch((error) => this.next(error));
            })
            .catch((error) => this.next(error));
    }

    create() {
        let data = this.req.body.data;
        let pollParties = this.req.body.pollParties;

        this.createPoll(data, pollParties)
            .then((results) => this.res.json(results))
            .catch((error) => this.next(error));
    }

    update() {
        this.destroyPoll(this.req.params.id).then(() => {
            this.createPoll(this.req.body.data, this.req.body.pollParties).then((result) => this.res.json(result))
                .catch((error) => this.next(error));
        }).catch((error) => this.next(error));
    }

    delete() {
        this.destroyPoll(this.req.params.id)
            .then((results) => this.res.json(results))
            .catch((error) => this.next(error))
    }

    createPoll(data, pollParties) {
        return new Promise((resolve, reject) => {
            // Insert poll into db
            let query = `INSERT INTO
        polls (company_name, sample, method, start_date, end_date)
        VALUES ('${data['name']}', ${data['sample']}, '${data['methodology']}', '${data['start_date']}', '${data['end_date']}')`;
            this.run_query(query)
                .then((results) => {
                    // Get the id of newly inserted poll
                    let query1 = `SELECT id FROM polls
                                WHERE company_name = '${data['name']}'
                                AND sample = ${data['sample']}
                                AND method = '${data['methodology']}'
                                AND start_date = '${data['start_date']}'
                                AND end_date = '${data['end_date']}'
                                ORDER BY id DESC LIMIT 1`;
                    this.run_select(query1)
                        .then((results) => {
                            // Insert data into join table
                            if (results.length === 0) {
                                return reject('Could not determine id of the inserted poll.');
                            }

                            const rowId = results[0].id;

                            const values = [];
                            pollParties.forEach((partyData) => {
                                values.push(`(${rowId}, ${partyData.partyId}, ${partyData.support})`);
                            });

                            let query2 = `INSERT INTO
                                        parties_polls (poll_id, party_id, popularity)
                                        VALUES ${values.join(', ')}`;
                            this.run_query(query2)
                                .then((results) => resolve(results))
                                .catch((error) => reject(error));
                        })
                        .catch((error) => reject(error));
                });
        });
    }

    destroyPoll(id) {
        return new Promise((resolve, reject) => {
            let query = `DELETE
                     FROM polls
                     WHERE id = ${id}`;
            let query1 = `DELETE
                     FROM parties_polls
                     WHERE poll_id = ${id}`;

            this.run_query(query)
                .then((result) => {
                    this.run_query(query1)
                        .then((results) => resolve(results))
                        .catch((error) => reject(error))
                })
                .catch((error) => reject(error));
        })
    }
}
