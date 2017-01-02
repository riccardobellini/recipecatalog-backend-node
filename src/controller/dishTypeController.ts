import DishTypeWorker from '../workers/dishType';


export default class DishTypesController {
	public getAllDishTypes(parms) {
        return new DishTypeWorker().readDishTypes(parms);
    }

    public getSingleDishType(id) {
		return new DishTypeWorker().readSingleDishType(id);
	}
};