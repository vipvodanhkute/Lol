class API{
	async getAPIChampion(){
		const championResponse = await fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/vn_VN/champion.json');
		const champion = await championResponse.json();
		return {
			champion
		}
	}
	async getAPIChampionInfo(champion){
		const championInfoResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/vn_VN/champion/${champion}.json`);
		const championInfo = await championInfoResponse.json();
		return {
			championInfo
		}
	}
}