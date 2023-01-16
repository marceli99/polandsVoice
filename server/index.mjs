import PollsController from "./controllers/polls_controller.mjs";
import express, {urlencoded} from 'express';
import cors from 'cors';
import PartiesController from "./controllers/parties_controller.mjs";

const PORT = process.env.PORT || 3001;

const app = express();

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))
app.use(urlencoded({extended : true}));
app.use(express.json());

app.post('/create_poll', (req, res, next) => new PollsController(req, res, next).create());
app.get('/parties', (req, res, next) => new PartiesController(req, res, next).index());
app.get('/last_three_months_polls', (req, res, next) => new PollsController(req, res, next).lastThreeMonths());
app.get('/last_month_polls', (req, res, next) => new PollsController(req, res, next).lastMonth());
app.get('/polls', (req, res, next) => new PollsController(req, res, next).index());
app.patch('/poll/:id', (req, res, next) => new PollsController(req, res, next).update())
app.get('/poll/:id', (req, res, next) => new PollsController(req, res, next).get())
app.delete('/poll/:id', (req, res, next) => new PollsController(req, res, next).delete())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
