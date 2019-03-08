class UI{
	constructor(championsList,championsOur){
		this.display1(championsList);
		this.display2(championsOur);
	}
	display1(championsList){
		if(document.querySelector('#championsList')){
			this.displayChampions(championsList);
			console.log(championsList);
		}
	}
	display2(championsOur){
		if(document.querySelector('#championsOur')){
			this.displayChampionsOur(championsOur);
			console.log(championsOur);	
		}
	}
	clear(selector){
		while(document.querySelector(`#${selector}`).firstChild){
			document.querySelector(`#${selector}`).firstChild.remove();
		}
	}
	displaySelectTag(name){
		document.querySelector('#championsOur').innerHTML='';
		if(name!==''){
		const champions=db.getDBformStorage();
		champions.filter(champion=>champion.tags.map(tag=>tag).indexOf(name)>=0).forEach(x=>{
			const div=document.createElement('div');
									div.classList.add('col-2')
									div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${x.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${x.image}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${x.id}</p>
										</div>	
									</div>		
						`;
					document.querySelector('#championsOur').appendChild(div);
					})
	}else{
		this.displayChampionsOur('championsOur');
		}
	}
	displayChampionSearch(name){
		this.clear('championsList');
		api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				const championsFilter=champions.filter(champ=>champ.id.toLowerCase().indexOf(name)>=0);
				console.log(championsFilter);
				championsFilter.forEach(champion=>{
								const div=document.createElement('div');
									div.classList.add('col-2')
									div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${champion.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${champion.image.full}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${champion.name}</p>
										</div>	
									</div>		
						`;
					championsList.appendChild(div);
					})	
	})
		}
		displayChampionSearch1(name,selector){
		this.clear(selector);
		api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				const championsFormLocal=db.getDBformStorage();
				const championsFilterOur=champions.filter(champion=>championsFormLocal.map(x=>x.id).indexOf(champion.id)>=0);
				const championsFilter=championsFilterOur.filter(champ=>champ.id.toLowerCase().indexOf(name)>=0);
				championsFilter.forEach(champion=>{
								const div=document.createElement('div');
									div.classList.add('col-2')
									div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${champion.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${champion.image.full}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${champion.name}</p>
										</div>	
									</div>		
						`;
					document.querySelector(`#${selector}`).appendChild(div);
					})
	})
		}
	
	displayChampionTags(tag){
		championsList.innerHTML='';
		 api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				//console.log(champions.filter(x=>(x.id==="Aatrox")))
				const championsFilter=champions.filter(x=>(x.tags.map(z=>z).indexOf(tag)>=0));
				console.log(championsFilter);
					championsFilter.forEach(champion=>{
					const div=document.createElement('div');
									div.classList.add('col-2')
									div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${champion.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${champion.image.full}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${champion.name}</p>
										</div>	
									</div>		
						`;
					championsList.appendChild(div);	
					})
					})	
	}
	displayChampionAll(selector){
		api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				champions.forEach(champion=>{
								const div=document.createElement('div');
									div.classList.add('col-2')
									div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${champion.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${champion.image.full}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${champion.name}</p>
										</div>	
									</div>		
						`;
					document.querySelector(`#${selector}`).appendChild(div);
						})
					})	
	}
	displayChampionsOur(selector){
		const db=new DB();
		const champions=db.getDBformStorage();	
		champions.forEach(champion=>{
			const div=document.createElement('div');
					div.classList.add('col-2')
					div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${champion.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${champion.image}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${champion.id}</p>
										</div>	
									</div>		
						`;

			document.querySelector(`#${selector}`).appendChild(div);
		})
	}
	displayChampions(selector){
		api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				const championsFormLocal=db.getDBformStorage();
				const championsFilter=champions.filter(championAPI=>
					championsFormLocal.map(championDB=>
						championDB.id
					).indexOf(championAPI.id)<0
				);
				championsFilter.forEach(champion=>{
								const div=document.createElement('div');
									div.classList.add('col-2')
									div.innerHTML=`
									<div class="my-2">
										<div class="dark-overlay get-champion" data-id="${champion.id}" data-toggle="modal" data-target="#modalChampion">
											<img src="../img/champion/${champion.image.full}" class="img-thubnail img-fluid"/>
											<p class="text-center font-weight-bold">${champion.name}</p>
										</div>	
									</div>		
						`;
					document.querySelector(`#${selector}`).appendChild(div);				
						})
					})		
			}
	displayChampionId(id){
		api.getAPIChampion()
			.then(data=>{
				const champions=Object.values(data.champion.data);
				champions.forEach(champion=>{
				if(champion.id===id){
					document.querySelector('#modalChampion div div div div div div div img').src=`../img/champion/${champion.image.full}`;
					document.querySelector('#modalChampion h1').innerHTML=`${champion.name},${champion.title}`;
					document.querySelector('#modalChampion button').innerHTML=`<i class="fa fa-minus"></i> 6300`;
					document.querySelector('#modalChampion button').setAttribute('data-id',id);
				}
				
			})
		})
	}
		displayChampionInfo(id){
		api.getAPIChampionInfo(id)
			.then(data=>{
				const champion=Object.values(data.championInfo.data);
				console.log(champion);
				document.querySelector('#id').innerHTML=champion[0].id;
				document.querySelector('#title').innerHTML=champion[0].title;
				document.querySelector('#attack').innerHTML=champion[0].info.attack;
				document.querySelector('#defense').innerHTML=champion[0].info.defense;
				document.querySelector('#difficulty').innerHTML=champion[0].info.difficulty;
				document.querySelector('#skillP').src=`../img/passive/${champion[0].passive.image.full}`;
				document.querySelector('#skillP').classList.add('spellInfo','P');
				document.querySelector('#skillQ').src=`../img/spell/${champion[0].spells[0].image.full}`;
				document.querySelector('#skillQ').classList.add('spellInfo','Q');
				document.querySelector('#skillW').src=`../img/spell/${champion[0].spells[1].image.full}`;
				document.querySelector('#skillW').classList.add('spellInfo','W');
				document.querySelector('#skillE').src=`../img/spell/${champion[0].spells[2].image.full}`;
				document.querySelector('#skillE').classList.add('spellInfo','E');
				document.querySelector('#skillR').src=`../img/spell/${champion[0].spells[3].image.full}`;
				document.querySelector('#skillR').classList.add('spellInfo','R');
				document.querySelector('#def').innerHTML=champion[0].passive.name;
				document.querySelector('#explain').innerHTML=champion[0].passive.description;
				document.querySelector('#videoSkill').src='https://youtube.com/embed/Vuz9rrArIJs';
				document.querySelector('#kynang').addEventListener('click',function(e){
					if(e.target.classList.contains('spellInfo')){
						switch(e.target.classList[1]){
							case 'Q':
								document.querySelector('#def').innerHTML=champion[0].spells[0].name;
								document.querySelector('#explain').innerHTML=champion[0].spells[0].description;
								document.querySelector('#videoSkill').src='https://youtube.com/embed/Vuz9rrArIJs';
								break;
							case 'W':
								document.querySelector('#def').innerHTML=champion[0].spells[1].name;
								document.querySelector('#explain').innerHTML=champion[0].spells[1].description;
								document.querySelector('#videoSkill').src='https://youtube.com/embed/CrgktRpwUJs';
								break;
							case 'E':
								document.querySelector('#def').innerHTML=champion[0].spells[2].name;
								document.querySelector('#explain').innerHTML=champion[0].spells[2].description;
								document.querySelector('#videoSkill').src='https://youtube.com/embed/dqapXcpihzo';
								break;
							case 'R':
								document.querySelector('#def').innerHTML=champion[0].spells[3].name;
								document.querySelector('#explain').innerHTML=champion[0].spells[3].description;
								document.querySelector('#videoSkill').src='https://youtube.com/embed/Ja8YuvLOBUc';
								break;	
							default:
								document.querySelector('#def').innerHTML=champion[0].passive.name;
								document.querySelector('#explain').innerHTML=champion[0].passive.description;
								document.querySelector('#videoSkill').src='https://youtube.com/embed/Vuz9rrArIJs';
						}						
					}
				})
				document.querySelector('#img-background').src=`./img/splash/${id}_0.jpg`;
				console.log(champion[0].skins.length);
				const skins=champion[0].skins;
				for(let i=0;i<skins.length;i++){
					const li=document.createElement('li');
					li.setAttribute('data-target','#demo');
					li.setAttribute('data-slide-to',i);
					document.querySelector('#skins-slide').appendChild(li);
					const div=document.createElement('div');
					div.classList.add('carousel-item');
					const img=document.createElement('img');
					img.src=`./img/splash/${id}_${i}.jpg`;
					div.appendChild(img);
					document.querySelector('#skins-img').appendChild(div);
				}
				document.querySelector('#skins-slide li').classList.add('active');
				document.querySelector('#skins-img div').classList.add('active');

			})
		}
}