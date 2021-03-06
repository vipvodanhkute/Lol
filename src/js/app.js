const api = new API(),
	  ui = new UI('championsList','championsOur'),
	  db = new DB(),
	  championsList=document.querySelector('#championsList'),
	  //championinfo=document.querySelector('.championInfo'),
	  championsOur=document.querySelector('#championsOur'),
	  add=document.querySelector('#add'),
	  closeChamp=document.querySelector('#closeChampInfo');
	  checkbox=document.querySelector('#championOwned');
	  choose=document.querySelector('#choose');	
	  search=document.getElementById('search');
	  search1=document.getElementById('search1');
	  selectTags=document.getElementById('selectTags');
	  selectChamps=document.querySelector('#selectChamps');
eventListener();
function eventListener(){
	if(selectTags){
		selectTags.addEventListener('change',filterChampions)
	}
	if(selectChamps){
		selectChamps.addEventListener('change',filterChampions)
	}
	if(search){
		search.addEventListener('keydown',searchChamp);
	}
	if(search1){
		search1.addEventListener('keydown',filterChampions);
	}
	if(championsList){
		championsList.addEventListener('click',getInfo);
	}
	if(add){
		add.addEventListener('click',buyChampion);
	}
	if(championsOur){
		championsOur.addEventListener('click',championInfo)
	}
	if(closeChamp){
		closeChamp.addEventListener('click',closeChampInfo)
	}
	if(checkbox){
		checkbox.addEventListener('click',displayChampionsOur)
	}
	if(choose){
		choose.addEventListener('click',searchChamp)
	}
	
}
function getInfo(e){
	if(e.target.parentElement.classList.contains('get-champion')){
		const id=e.target.parentElement.getAttribute('data-id');
		ui.displayChampionId(id);
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
						image:{
							full:champion.image.full},
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
function displayChampionsOur(e){
	championsList.innerHTML='';
	if(this.checked){
		add.disabled=true;
		ui.displayChampionsOur('championsList');
		const ch = document.getElementsByName('ch');
		search.disabled=true;
		for(let i = 0;i<ch.length;i++){
			ch[i].disabled=true;
		}
	}else{
		add.disabled=false;
		ui.displayChampions('championsList');
		const ch = document.getElementsByName('ch');
		search.disabled=false;
		for(let i = 0;i<ch.length;i++){
			ch[i].disabled=false;
		}

	}
}
function filterChamp(e){
	if(e.target.classList.contains('form-check-input')){
		ui.displayChampionTags(this.querySelector('input[name="ch"]:checked').value);
	}
}
function searchChamp(){
	const name=search.value;
	ui.displayChampionSearch(name);
	console.log(name);
}
function selectTag(){
	ui.displaySelectTag(this.value);
}
function selectChamp(){
	switch(this.value){
		case "1":
			ui.clear('championsOur');
			ui.displayChampions('championsOur');
			break;
		case "2":
			ui.clear('championsOur');
			ui.displayChampionsOur('championsOur');
			break;
		default:
			ui.clear('championsOur');
			ui.displayChampionAll('championsOur');
			break;
	}
}
function filterChampions(){
	if(selectTags.value!==''){
	switch(selectChamps.value){
		case "1":
			ui.clear('championsOur');
			api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				const championsFormLocal=db.getDBformStorage();
				const championsFilter=champions.filter(championAPI=>
					championsFormLocal.map(championDB=>
						championDB.id
					).indexOf(championAPI.id)<0
				);
				ui.displayChampionsFilter((championsFilter.filter(x=>x.tags.map(tag=>tag).indexOf(selectTags.value)>=0)).filter(y=>y.id.toLowerCase().indexOf(search1.value)>=0),'championsOur');
			})
			break;
		case "2":
			ui.clear('championsOur');
			const champions=db.getDBformStorage();
			ui.displayChampionsFilter((champions.filter(x=>x.tags.map(tag=>tag).indexOf(selectTags.value)>=0)).filter(y=>y.id.toLowerCase().indexOf(search1.value)>=0),'championsOur');
			break;
		default:
			ui.clear('championsOur');
			api.getAPIChampion()
				.then(data=>{
					let champions=Object.values(data.champion.data);
					ui.displayChampionsFilter((champions.filter(x=>x.tags.map(tag=>tag).indexOf(selectTags.value)>=0)).filter(y=>y.id.toLowerCase().indexOf(search1.value)>=0),'championsOur')
				})
			break;
		}
	}else{
		switch(selectChamps.value){
		case "1":
			ui.clear('championsOur');
			api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				const championsFormLocal=db.getDBformStorage();
				const championsFilter=champions.filter(championAPI=>
					championsFormLocal.map(championDB=>
						championDB.id
					).indexOf(championAPI.id)<0
				);
				ui.displayChampionsFilter(championsFilter.filter(x=>x.id.toLowerCase().indexOf(search1.value)>=0),'championsOur');
			})
			break;
		case "2":
			ui.clear('championsOur');
			const champions=db.getDBformStorage();
			ui.displayChampionsFilter(champions.filter(x=>x.id.toLowerCase().indexOf(search1.value)>=0),'championsOur');
			break;
		default:
			ui.clear('championsOur');
			api.getAPIChampion()
				.then(data=>{
					let champions=Object.values(data.champion.data);
					ui.displayChampionsFilter(champions.filter(x=>x.id.toLowerCase().indexOf(search1.value)>=0),'championsOur')
				})
			break;
		}
	}
}