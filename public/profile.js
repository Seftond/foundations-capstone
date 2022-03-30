


let usersBets = document.querySelector('.usersBets');
let record = document.querySelector('.record');

function getRecord(){
    axios.get('http://localhost:4004/record')
    .then(res => {
        let {wins, losses, pushes} = res.data;
        const userProfileWins = document.createElement('h3');
        userProfileWins.innerHTML = `Wins: ${wins}`;
        record.appendChild(userProfileWins);
        const userProfileLosses = document.createElement('h3');
        userProfileLosses.innerHTML = `Losses: ${losses}`;
        record.appendChild(userProfileLosses);
        const userProfilePushes = document.createElement('h3');
        userProfilePushes.innerHTML = `Pushes: ${pushes}`;
        record.appendChild(userProfilePushes);
    })
}

function getAllWagers(){
    axios.get('http://localhost:4004/wagers')
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
            const individualWager = document.createElement('section');
            individualWager.classList.add('individualWager');
            usersBets.appendChild(individualWager);
            const individualWagerInfo = document.createElement('div');
            individualWagerInfo.classList.add('individualWagerInfo');
            individualWager.appendChild(individualWagerInfo);
            const leagueAndType = document.createElement('p');
            leagueAndType.innerHTML = `${res.data[i].league} ${res.data[i].type}`;
            individualWagerInfo.appendChild(leagueAndType);
            const teams = document.createElement('p');
            teams.innerHTML = `${res.data[i].team1} @ ${res.data[i].team2}`;
            individualWagerInfo.appendChild(teams);
            const bet = document.createElement('p');
            bet.innerHTML = `${res.data[i].bet}`;
            individualWagerInfo.appendChild(bet);

            const winLossButtons = document.createElement('div');
            winLossButtons.classList.add('winLossButtons');
            individualWager.appendChild(winLossButtons);
            const winButton = document.createElement('button');
            winButton.classList.add('winButton');
            winButton.innerHTML = 'Win';
            winLossButtons.appendChild(winButton);
            const lossButton = document.createElement('button');
            lossButton.classList.add('lossButton');
            lossButton.innerHTML = 'Loss';
            winLossButtons.appendChild(lossButton);
            const pushButton = document.createElement('button');
            pushButton.classList.add('pushButton');
            pushButton.innerHTML = 'Push';
            winLossButtons.appendChild(pushButton);
            winButton.onclick = function(){
                let obj = {
                    result: "win"
                };
                axios.put(`http://localhost:4004/wagers/${res.data[i].bet_id}`, obj)
                .then(res => {
                    console.log(res);
                    individualWager.classList.add('hiddenForm');
                    individualWagerInfo.classList.add('hiddenForm');
                    winLossButtons.classList.add('hiddenForm');
                    winButton.classList.add('hiddenForm');
                    lossButton.classList.add('hiddenForm');
                    pushButton.classList.add('hiddenForm');
                });
            }
            lossButton.onclick = function(){
                let obj = {
                    result: "loss"
                };
                axios.put(`http://localhost:4004/wagers/${res.data[i].bet_id}`, obj)
                .then(res => {
                    console.log(res);
                    individualWager.classList.add('hiddenForm');
                    individualWagerInfo.classList.add('hiddenForm');
                    winLossButtons.classList.add('hiddenForm');
                    winButton.classList.add('hiddenForm');
                    lossButton.classList.add('hiddenForm');
                    pushButton.classList.add('hiddenForm');
                });
            }
            pushButton.onclick = function(){
                let obj = {
                    result: "push"
                };
                axios.put(`http://localhost:4004/wagers/${res.data[i].bet_id}`, obj)
                .then(res => {
                    console.log(res);
                    individualWager.classList.add('hiddenForm');
                    individualWagerInfo.classList.add('hiddenForm');
                    winLossButtons.classList.add('hiddenForm');
                    winButton.classList.add('hiddenForm');
                    lossButton.classList.add('hiddenForm');
                    pushButton.classList.add('hiddenForm');
                });
            }
        }
    })
}

getAllWagers();
getRecord();