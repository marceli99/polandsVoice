import BaseController from "./base_controller.mjs";

export default class PartiesController extends BaseController {
    index() {
        let query = `SELECT * FROM parties`;

        this.run_select(query)
            .then((results) => this.res.json(results))
            .catch((error) => this.next(error));
    }
}