// dish type module (read-write operations on db)
import {DishType} from '../../models/dishType';

import DbModule from './dbModule';
import {Tables} from './dbConstants';



// export module DishTypeDB {

    export function readDishTypes() {
        return new DbModule().db.select().from(Tables.DishType.TblName);
    }

// }