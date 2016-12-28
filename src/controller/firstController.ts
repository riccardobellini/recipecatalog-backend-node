interface Language {
  id: number;
  name: string;
}

const Languages : Array<Language> = [
  {id : 1, name : 'Java'},
  {id : 2, name : 'C++'},
  {id : 3, name : 'C'}
];

export default class FirstController {
	public getAllLanguages() {
		return Languages;
	}
};