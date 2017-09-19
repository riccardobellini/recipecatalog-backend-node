import BookWorker from '../workers/book';


export default class BooksController {
	public getAllBooks(parms) {
        return new BookWorker().readBooks(parms);
    }

    public getSingleBook(id) {
		return new BookWorker().readSingleBook(id);
	}

    public createBook(book) {
        return new BookWorker().createBook(book);
    }

    public removeBook(id) {
        return new BookWorker().removeBook(id);
    }

    public removeBooks(ids) {
        return new BookWorker().removeBooks(ids);
    }

    public changeBook(id: number, obj: any) {
        return new BookWorker().changeBook(id, obj);
    }

    public searchBooks(key, parms) {
        return new BookWorker().searchBooks(key, parms);
    }
};