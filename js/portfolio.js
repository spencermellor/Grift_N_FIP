import { fetchData, postData } from "./modules/fetchData.js";

(() => {

    // Portfolio

    function handlePortfolioDataSet(projects) {
        console.log("received")
        
        // let portfolioContent = document.querySelector('#portfolio-content');
        // let portfolioTemplate = document.querySelector('#portfolio-template').content;

        // for (let project in projects) {
        //     let projectElem = portfolioTemplate.cloneNode(true);
        //     console.log(projectElem);

            // currentUserText[1].src = `images/${data[user].avatar}`;
            // currentUserText[2].textContent = data[user].name;
            // currentUserText[3].textContent = data[user].role;
            // currentUserText[4].textContent = data[user].nickname;

            // // add this new user to the view
            // userSection.appendChild(currentUser);
        //}
    }



    function popErrorBox(message) {
        alert("Something has gone horribly, horribly wrong");
    }

    fetchData("./includes/functions.php").then(data => handlePortfolioDataSet()).catch(err => { console.log(err); popErrorBox(err); });
})();
