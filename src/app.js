const api = new API(),
	  ui = new UI(),
	  db = new DB(),
	  championList=document.querySelector('#championList'),
	  //championinfo=document.querySelector('.championInfo'),
	  championOur=document.querySelector('#championOur'),
	  add=document.querySelector('#add'),
	  closeChamp=document.querySelector('#closeChampInfo');
	  checkbox=document.querySelector('#championOwned');
	  choose=document.querySelector('#choose');	
eventListener();
function eventListener(){
	if(championList){
		championList.addEventListener('click',getInfo);
	}
	if(add){
		add.addEventListener('click',buyChampion);
	}
	if(championOur){
		championOur.addEventListener('click',championInfo)
	}
	if(closeChamp){
		closeChamp.addEventListener('click',closeChampInfo)
	}
	if(checkbox){
		checkbox.addEventListener('click',displayChampionAll)
	}
	if(choose){
		choose.addEventListener('click',filterChamp)
	}
	
}
function getInfo(e){
	if(e.target.parentElement.classList.contains('get-champion')){
		const id=e.target.parentElement.getAttribute('data-id');
		ui.displayChampionId(id);
	}else{
		console.log('no');
	}
}
function buyChampion(e){
	const id=document.querySelector('#add').getAttribute('data-id');
	api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				champions.forEach(champion=>{
				if(champion.id===id){
					const championInfo={
						id:champion.id,
						blurb:champion.blurb,
						image:champion.image.full,
						title:champion.title,
						tags:[champion.tags[0],champion.tags[1]],
						info:{
							attack: champion.info.attack,
							defense: champion.info.defense,
							difficulty: champion.info.difficulty
						}
					}
					db.saveDBIntoStorage(championInfo);
				}
			})
			})
	document.querySelector(`[data-id="${id}"]`).parentElement.parentElement.remove();	
}
function closeChampInfo(){
	document.querySelector('#displayChampionInfo').classList.add('collapse');
	document.querySelector('#displayChampionOur').classList.remove('collapse');
	while(document.querySelector('#skins-slide').firstChild){
		document.querySelector('#skins-slide').removeChild(document.querySelector('#skins-slide').firstChild);
	};
	while(document.querySelector('#skins-img').firstChild){
		document.querySelector('#skins-img').removeChild(document.querySelector('#skins-img').firstChild);
	};
	
}
function championInfo(e){
	if(e.target.parentElement.classList.contains('get-champion')){
		document.querySelector('#displayChampionInfo').classList.remove('collapse');
		document.querySelector('#displayChampionOur').classList.add('collapse');
		const id=e.target.parentElement.getAttribute('data-id');
		ui.displayChampionInfo(id);
	}

	
}
function displayChampionAll(e){
	championList.innerHTML='';
	if(this.checked){
		ui.displayChampionOurShop();
	}else{
		ui.displayChampion();
	}
}
function filterChamp(e){
	if(e.target.classList.contains('form-check-input')){
		if(!checkbox.checked){
		ui.displayChampionTags(this.querySelector('input[name="ch"]:checked').value);
	}else{
		 championList.innerHTML='';
	}
	}
}