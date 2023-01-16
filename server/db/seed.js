const {base64Sync} = require("base64-img");
const {showError} = require("./common");
let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('polish_voice.db');

db.run(`
INSERT INTO parties (name, short_name, logo) VALUES
('Prawo i Sprawiedliwość', 'PIS', '${base64Sync('src/assets/images/logo_pis.png')}'),
('Koalicja Obywatelska', 'KO', '${base64Sync('src/assets/images/logo_ko.png')}'),
('Lewica', 'LEW', '${base64Sync('src/assets/images/logo_lew.png')}'),
('Polska 2050', 'P2050', '${base64Sync('src/assets/images/logo_2050.png')}'),
('Polskie Stronnictwo Ludowe', 'PSL', '${base64Sync('src/assets/images/logo_psl.png')}'),
('Konfederacja', 'KONF', '${base64Sync('src/assets/images/logo_konf.png')}'),
('Kukiz 15', 'K15', '${base64Sync('src/assets/images/logo_kukiz.png')}'),
('Agrounia', 'AU', '${base64Sync('src/assets/images/logo_au.png')}'),
('Porozumienie', 'P', '${base64Sync('src/assets/images/logo_p.png')}');
`, showError);

db.run(`
INSERT INTO polls (company_name, sample, method, start_date, end_date) VALUES
('Pollster', '', '', '2022-12-16', '2022-12-19'),
('Estymator', '1039', 'CATI', '2022-12-15', '2022-12-16'),
('Kantar', '1001', 'CATI', '2022-12-09', '2022-12-15'),
('Research Partner', '1047', 'CAWI', '2022-12-09', '2022-12-12'),
('CBOS', '1018', 'Mixed', '2022-11-28', '2022-12-11'),
('IBRiS', '1100', 'CATI', '2022-12-07', '2022-12-08'),
('Kantar Public', '970', 'CAPI', '2022-12-02', '2022-12-07'),
('United Surveys', '1000', 'CAWI & CATI', '2022-12-02', '2022-12-04'),
('IBRiS', '1000', 'CATI', '2022-12-02', '2022-12-03'),
('Pollster', '1057', 'CATI', '2022-11-25', '2022-11-27');
`, showError);

db.run(`
INSERT INTO parties_polls (poll_id, party_id, popularity) VALUES
(1, 1, 31.16),
(1, 2, 29.95),
(1, 3, 12.08),
(1, 4, 12.09),
(1, 5, 5.21),
(1, 6, 7.90),
(1, 7, 1.02),
(1, 9, 0.13),

(2, 1, 35.3),
(2, 2, 29.4),
(2, 3, 11.0),
(2, 4, 9.2),
(2, 5, 6.7),
(2, 6, 6.1),
(2, 7, 1.8),

(3, 1, 32),
(3, 2, 31),
(3, 3, 6),
(3, 4, 11),
(3, 5, 3),
(3, 6, 9),
(3, 7, 1),
(3, 8, 1),
(3, 9, 9),

(4, 1, 29.6),
(4, 2, 29.3),
(4, 3, 6.8),
(4, 4, 9.8),
(4, 5, 4.6),
(4, 6, 7.2),
(4, 7, 1.8),
(4, 9, 0.5),

(5, 1, 30.6),
(5, 2, 20.8),
(5, 3, 3.6),
(5, 4, 10.5),
(5, 5, 3.6),
(5, 6, 4.9),

(6, 1, 32.9),
(6, 2, 26.4),
(6, 3, 9.4),
(6, 4, 9.2),
(6, 5, 6.2),
(6, 6, 5.5),

(7, 1, 32),
(7, 2, 28),
(7, 3, 10),
(7, 4, 9),
(7, 5, 2),
(7, 6, 5),
(7, 7, 1),
(7, 8, 1),
(7, 9, 1),

(8, 1, 33.6),
(8, 2, 26.9),
(8, 3, 9.7),
(8, 4, 10.8),
(8, 5, 5.9),
(8, 6, 5),
(8, 8, 0.7),

(9, 1, 34.2),
(9, 2, 28.3),
(9, 3, 9.7),
(9, 4, 8.8),
(9, 5, 5.2),
(9, 6, 5.2),

(10, 1, 32.51),
(10, 2, 30.45),
(10, 3, 10.84),
(10, 4, 11.56),
(10, 5, 3.87),
(10, 6, 8.65),
(10, 7, 0.92),
(10, 9, 0.75);
`, showError);

db.close();
