import DishTypeWorker from '../workers/dishType';


export default class DishTypesController {
	public getAllDishTypes() {
		return new DishTypeWorker().readDishTypes();
	}
};