let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('polish_voice.db');

let data = {
    name: 'giraffes',
    sample: '1231',
    methodology: 'CAPI',
    start_date: '2023-01-12',
    end_date: '2023-01-27'
}

let pollParties = [
    { id: 1, party: 'PIS', support: '32', partyId: 1 },
    { id: 2, party: 'KO', support: '29', partyId: 2 }
]

let query = `INSERT INTO
        polls (company_name, sample, method, start_date, end_date)
        VALUES ('${data['name']}', ${data['sample']}, '${data['methodology']}', '${['start_date']}', '${['end_date']}')`;
db.run(query);

let query1 = `SELECT id FROM polls
WHERE company_name = '${data['name']}'
AND sample = ${data['sample']}
AND method = '${data['methodology']}'
AND start_date = '${['start_date']}'
AND end_date = '${['end_date']}'
ORDER BY id DESC LIMIT 1`;

db.all(query1, [], (err, rows) => {
    let id = rows[0].id;

    let values = [];
    pollParties.forEach((partyData) => {
        values.push(`(${id}, ${partyData.partyId}, ${partyData.support})`);
    });

    let query2 = `INSERT INTO
    parties_polls (poll_id, party_id, popularity)
    VALUES ${values.join(', ')}`;

    db.run(query2);
})

db.close();
