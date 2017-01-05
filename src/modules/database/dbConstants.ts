export const Connection = {
	test : {
		Host : 'localhost',
		User : 'root',
		Password : 'root',
		DbName : 'catalogo_ricette_test'
	},
	development : {
		Host : 'localhost',
		User : 'root',
		Password : 'root',
		DbName : 'catalogo_ricette_dev'
	},
	production : {
		Host : 'localhost',
		User : 'root',
		Password : 'root',
		DbName : 'catalogo_ricette'
	}
};

export const Tables = {
	DishType : {
		TblName: 'CATEGORIA',
		Columns : {
			Id: 'ID',
			Name : 'NOME'
		}
	},
	Book : {
		TblName: 'LIBRO',
		Columns : {
			Id: 'ID',
			Title : 'TITOLO'
		}
	},
	Ingredient : {
		TblName: 'INGREDIENTE',
		Columns : {
			Id: 'ID',
			Name : 'NOME'
		}
	}
};
