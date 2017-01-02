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
		DbName : 'catalogo_ricette'
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
	}
};
