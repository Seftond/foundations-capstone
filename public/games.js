
const API_KEY = "c1fb9817442525b45b967faefea88400";


let bettingOptions = document.querySelector(".betOptions");

function getActiveLeagues(){
    axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=c1fb9817442525b45b967faefea88400&regions=us&markets=h2h,spreads,totals&oddsFormat=american`)
    .then(res => {
        const leagueSection = document.createElement('section');
        leagueSection.classList.add("league");
        bettingOptions.appendChild(leagueSection);
        const leagueHeader = document.createElement('h3');
        leagueHeader.innerHTML = 'NBA';
        leagueSection.appendChild(leagueHeader);
        let gamesArr = res.data;
        for(let x = 0; x < gamesArr.length; x++){
            const gameSection = document.createElement('section')
            gameSection.classList.add('game');
            const thisMatchup= document.createElement('div');
            thisMatchup.classList.add('matchup');
            const awayTeam = document.createElement('p');
            awayTeam.innerHTML = `${gamesArr[x].away_team}`;
            const divideLine = document.createElement('p');
            divideLine.innerHTML = "@-------------------------";
            const homeTeam = document.createElement('p');
            homeTeam.innerHTML = `${gamesArr[x].home_team}`;
            thisMatchup.appendChild(awayTeam);
            thisMatchup.appendChild(divideLine);
            thisMatchup.appendChild(homeTeam);
            gameSection.appendChild(thisMatchup);
            leagueSection.appendChild(gameSection);
            let books = res.data[x].bookmakers
            for(let i = 0; i < books.length; i++){
                if (books[i].key === 'fanduel'){
                    let fanduelMarkets = books[i].markets;
                    let moneyLine;
                    let spreads;
                    let totals;
                    for(let z = 0; z < fanduelMarkets.length; z++){
                        if(fanduelMarkets[z].key === 'h2h'){
                            moneyLine = fanduelMarkets[z];
                        } else if(fanduelMarkets[z].key === 'spreads'){
                            spreads = fanduelMarkets[z];
                        } else if(fanduelMarkets[z].key === 'totals'){
                            totals = fanduelMarkets[z];
                        }
                    }
                    const spreadDiv = document.createElement('div');
                    spreadDiv.classList.add('spread');
                    gameSection.appendChild(spreadDiv);
                    const spreadHeader = document.createElement('h5');
                    spreadHeader.innerHTML = "Spread";
                    spreadDiv.appendChild(spreadHeader);
                    const awaySpreadButton = document.createElement('button');
                    awaySpreadButton.classList.add('awaySpread');
                    awaySpreadButton.innerHTML = (`${spreads.outcomes[0].point} <br> ${spreads.outcomes[0].price}`);
                    spreadDiv.appendChild(awaySpreadButton);
                    const homeSpreadButton = document.createElement('button');
                    homeSpreadButton.classList.add('homeSpread');
                    homeSpreadButton.innerHTML = (`${spreads.outcomes[1].point} <br> ${spreads.outcomes[1].price}`);
                    spreadDiv.appendChild(homeSpreadButton);
                    const moneyDiv = document.createElement('div');
                    moneyDiv.classList.add('moneyline');
                    gameSection.appendChild(moneyDiv);
                    const moneyHeader = document.createElement('h5');
                    moneyHeader.innerHTML = "Money";
                    moneyDiv.appendChild(moneyHeader);
                    const awayMoneyButton = document.createElement('button');
                    awayMoneyButton.classList.add('awayMoneyline');
                    awayMoneyButton.innerHTML = (`${moneyLine.outcomes[0].price}`);
                    moneyDiv.appendChild(awayMoneyButton);
                    const homeMoneyButton = document.createElement('button');
                    homeMoneyButton.classList.add('homeMoneyLine');
                    homeMoneyButton.innerHTML = (`${moneyLine.outcomes[1].price}`);
                    moneyDiv.appendChild(homeMoneyButton);  
                    const totalsDiv = document.createElement('div');
                    totalsDiv.classList.add('totals');
                    gameSection.appendChild(totalsDiv);
                    const totalsHeader = document.createElement('h5');
                    totalsHeader.innerHTML = "Totals";
                    totalsDiv.appendChild(totalsHeader);
                    const overButton = document.createElement('button');
                    overButton.classList.add('over');
                    overButton.innerHTML = (`O ${totals.outcomes[0].point} <br> ${totals.outcomes[0].price}`);
                    totalsDiv.appendChild(overButton);
                    const underButton = document.createElement('button');
                    underButton.classList.add('under');
                    underButton.innerHTML = (`U ${totals.outcomes[1].point} <br> ${totals.outcomes[1].price}`);
                    totalsDiv.appendChild(underButton);
                    awaySpreadButton.onclick = function(){
                        let obj = {
                            league: "NBA",
                            type: "Spread",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${awayTeam.innerHTML} ${awaySpreadButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                        
                    }
                    homeSpreadButton.onclick = function(){
                        let obj = {
                            league: "NBA",
                            type: "Spread",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${homeTeam.innerHTML} ${homeSpreadButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    awayMoneyButton.onclick = function(){
                        let obj = {
                            league: "NBA",
                            type: "Money",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${awayTeam.innerHTML} ${awayMoneyButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    homeMoneyButton.onclick = function(){
                        let obj = {
                            league: "NBA",
                            type: "Money",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${homeTeam.innerHTML} ${homeMoneyButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    overButton.onclick = function(){
                        let obj = {
                            league: "NBA",
                            type: "Totals",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `Total ${overButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    underButton.onclick = function(){
                        let obj = {
                            league: "NBA",
                            type: "Totals",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `Total ${underButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                }
                
            }             

        }
    })
    axios.get(`https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds/?apiKey=c1fb9817442525b45b967faefea88400&regions=us&markets=h2h,spreads,totals&oddsFormat=american`)
    .then(res => {
        const leagueSection = document.createElement('section');
        leagueSection.classList.add("league");
        bettingOptions.appendChild(leagueSection);
        const leagueHeader = document.createElement('h3');
        leagueHeader.innerHTML = "NCAA Men's Basketball";
        leagueSection.appendChild(leagueHeader);
        let gamesArr = res.data;
        for(let x = 0; x < gamesArr.length/2; x++){
            const gameSection = document.createElement('section')
            gameSection.classList.add('game');
            const thisMatchup= document.createElement('div');
            thisMatchup.classList.add('matchup');
            const awayTeam = document.createElement('p');
            awayTeam.innerHTML = `${gamesArr[x].away_team}`;
            const divideLine = document.createElement('p');
            divideLine.innerHTML = "@-------------------------";
            const homeTeam = document.createElement('p');
            homeTeam.innerHTML = `${gamesArr[x].home_team}`;
            thisMatchup.appendChild(awayTeam);
            thisMatchup.appendChild(divideLine);
            thisMatchup.appendChild(homeTeam);
            gameSection.appendChild(thisMatchup);
            leagueSection.appendChild(gameSection);
            let books = res.data[x].bookmakers
            for(let i = 0; i < books.length; i++){
                if (books[i].key === 'draftkings'){
                    let fanduelMarkets = books[i].markets;
                    let moneyLine;
                    let spreads;
                    let totals;
                    for(let z = 0; z < fanduelMarkets.length; z++){
                        if(fanduelMarkets[z].key === 'h2h'){
                            moneyLine = fanduelMarkets[z];
                        } else if(fanduelMarkets[z].key === 'spreads'){
                            spreads = fanduelMarkets[z];
                        } else if(fanduelMarkets[z].key === 'totals'){
                            totals = fanduelMarkets[z];
                        }
                    }
                    const spreadDiv = document.createElement('div');
                    spreadDiv.classList.add('spread');
                    gameSection.appendChild(spreadDiv);
                    const spreadHeader = document.createElement('h5');
                    spreadHeader.innerHTML = "Spread";
                    spreadDiv.appendChild(spreadHeader);
                    const awaySpreadButton = document.createElement('button');
                    awaySpreadButton.classList.add('awaySpread');
                    awaySpreadButton.innerHTML = (`${spreads.outcomes[0].point} <br> ${spreads.outcomes[0].price}`);
                    spreadDiv.appendChild(awaySpreadButton);
                    const homeSpreadButton = document.createElement('button');
                    homeSpreadButton.classList.add('homeSpread');
                    homeSpreadButton.innerHTML = (`${spreads.outcomes[1].point} <br> ${spreads.outcomes[1].price}`);
                    spreadDiv.appendChild(homeSpreadButton);
                    const moneyDiv = document.createElement('div');
                    moneyDiv.classList.add('moneyline');
                    gameSection.appendChild(moneyDiv);
                    const moneyHeader = document.createElement('h5');
                    moneyHeader.innerHTML = "Money";
                    moneyDiv.appendChild(moneyHeader);
                    const awayMoneyButton = document.createElement('button');
                    awayMoneyButton.classList.add('awayMoneyline');
                    awayMoneyButton.innerHTML = (`${moneyLine.outcomes[0].price}`);
                    moneyDiv.appendChild(awayMoneyButton);
                    const homeMoneyButton = document.createElement('button');
                    homeMoneyButton.classList.add('homeMoneyLine');
                    homeMoneyButton.innerHTML = (`${moneyLine.outcomes[1].price}`);
                    moneyDiv.appendChild(homeMoneyButton);  
                    const totalsDiv = document.createElement('div');
                    totalsDiv.classList.add('totals');
                    gameSection.appendChild(totalsDiv);
                    const totalsHeader = document.createElement('h5');
                    totalsHeader.innerHTML = "Totals";
                    totalsDiv.appendChild(totalsHeader);
                    const overButton = document.createElement('button');
                    overButton.classList.add('over');
                    overButton.innerHTML = (`O ${totals.outcomes[0].point} <br> ${totals.outcomes[0].price}`);
                    totalsDiv.appendChild(overButton);
                    const underButton = document.createElement('button');
                    underButton.classList.add('under');
                    underButton.innerHTML = (`U ${totals.outcomes[1].point} <br> ${totals.outcomes[1].price}`);
                    totalsDiv.appendChild(underButton);
                    awaySpreadButton.onclick = function(){
                        let obj = {
                            league: "NCAA Men's Basketball",
                            type: "Spread",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${awayTeam.innerHTML} ${awaySpreadButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    homeSpreadButton.onclick = function(){
                        let obj = {
                            league: "NCAA Men's Basketball",
                            type: "Spread",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${homeTeam.innerHTML} ${homeSpreadButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    awayMoneyButton.onclick = function(){
                        let obj = {
                            league: "NCAA Men's Basketball",
                            type: "Money",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${awayTeam.innerHTML} ${awayMoneyButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    homeMoneyButton.onclick = function(){
                        let obj = {
                            league: "NCAA Men's Basketball",
                            type: "Money",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `${homeTeam.innerHTML} ${homeMoneyButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    overButton.onclick = function(){
                        let obj = {
                            league: "NCAA Men's Basketball",
                            type: "Totals",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `Total ${overButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                    underButton.onclick = function(){
                        let obj = {
                            league: "NCAA Men's Basketball",
                            type: "Totals",
                            team1: awayTeam.innerHTML,
                            team2: homeTeam.innerHTML,
                            bet: `Total ${underButton.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                }
                
            }             

        }
    })
    axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba_championship_winner/odds/?apiKey=c1fb9817442525b45b967faefea88400&regions=us&markets=outrights&Format=american`)
    .then(res => {
        const leagueSection = document.createElement('section');
        leagueSection.classList.add("league");
        bettingOptions.appendChild(leagueSection);
        const leagueHeader = document.createElement('h3');
        leagueHeader.innerHTML = "Futures";
        leagueSection.appendChild(leagueHeader);
        const futuresBet = document.createElement('section');
        futuresBet.classList.add('futureBet');
        leagueSection.appendChild(futuresBet);
        const futuresHeader = document.createElement('h3');
        futuresHeader.innerHTML = "2022 NBA Champion";
        futuresBet.appendChild(futuresHeader);
        let books = res.data[0].bookmakers;
        for(let i = 0; i < books.length; i++){
            if (books[i].key === 'fanduel'){
                let fanduelMarkets = books[i].markets;
                let outcomes = fanduelMarkets[0].outcomes;
                for(let z = 0; z < outcomes.length; z++){
                    const options = document.createElement('div');
                    futuresBet.appendChild(options);
                    const team = document.createElement('button');
                    team.classList.add('team')
                    team.innerHTML = `${outcomes[z].name} ${outcomes[z].price}`;
                    options.appendChild(team);
                    team.onclick = function(){
                        let obj = {
                            league: "Futures",
                            type: "2022 NBA Champion",
                            team1: "",
                            team2: "",
                            bet: `${team.innerHTML}`
                        };
                        alert(`Bet added to profile: ${obj.bet}`);
                        axios.post("http://localhost:4004/wager", obj)
                        .then(res => console.log(res.data))
                    }
                }             
            }                    
        }
    })
}




getActiveLeagues();

