import * as dishTypeDb from '../modules/database/dishType';

export default class DishTypeWorker {
    readDishTypes() {
        dishTypeDb.readDishTypes()
        .then((rows) => {
            console.log(rows[0]);
        })
    }
}