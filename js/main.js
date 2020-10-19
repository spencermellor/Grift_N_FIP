(() => {

    // Fetch request for portfolio data
    fetch('./data/PortfolioContent.json')
    .then((res) => res.json())
    .then((data) => {

        // Deal with Data here
        console.log(data);
    }
    ).catch((err) => {

        // Do somethinng with error here

        console.log(err)
    });
})();
