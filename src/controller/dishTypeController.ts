import DishTypeWorker from '../workers/dishType';


export default class DishTypesController {
	public getAllDishTypes(parms) {
        return new DishTypeWorker().readDishTypes(parms);
    }

    public getSingleDishType(id) {
		return new DishTypeWorker().readSingleDishType(id);
	}

    public createDishType(dt) {
        return new DishTypeWorker().createDishType(dt);
    }

    public removeDishType(id) {
        return new DishTypeWorker().removeDishType(id);
    }

    public changeDishType(id: number, obj: any) {
        return new DishTypeWorker().changeDishType(id, obj);
    }
};