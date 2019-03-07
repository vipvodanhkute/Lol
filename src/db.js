class DB{
	getDBformStorage(){
		let champions;
		if(localStorage.getItem('champions')===null){
			champions=[];
		}else{
			champions=JSON.parse(localStorage.getItem('champions'));
		}
		return champions;
	}
	saveDBIntoStorage(champion){
		let champions=this.getDBformStorage();
		champions.push(champion);
		localStorage.setItem('champions',JSON.stringify(champions));
	}
}