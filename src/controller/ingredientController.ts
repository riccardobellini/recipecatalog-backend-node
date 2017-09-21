import IngredientWorker from '../workers/ingredient';


export default class IngredientsController {
	public getAllIngredients(parms) {
        return new IngredientWorker().readIngredients(parms);
    }

    public getSingleIngredient(id) {
		return new IngredientWorker().readSingleIngredient(id);
	}

    public createIngredient(dt) {
        return new IngredientWorker().createIngredient(dt);
    }

    public removeIngredient(id) {
        return new IngredientWorker().removeIngredient(id);
    }

    public removeIngredients(ids) {
        return new IngredientWorker().removeIngredients(ids);
    }

    public changeIngredient(id: number, obj: any) {
        return new IngredientWorker().changeIngredient(id, obj);
    }

    public searchIngredients(key, parms) {
        return new IngredientWorker().searchIngredients(key, parms);
    }
};