import { fetchData } from "./modules/fetchData.js";

(() => {

    // Portfolio content list
        const portfolio = new Vue({
            data: {
                activeCategory: 'featured',
                portfolioItems: [],
                listOfCategories: []
            },
            mounted: function() {
                // Fetch all featured portfolio items
                fetchData("./includes/data.php?category=featured").then(data => this.updatePortfolioList(data)).catch(err => { console.log(err);});
                // Fetch all available links
                fetchData("./includes/data.php?list=tbl_categories").then(data => this.updateCategoriesList(data)).catch(err => { console.log(err);});
            },
            methods: {
                updatePortfolioList(items) {
                    // sets list to whats retreived
                    this.portfolioItems = items;
                },
                updateCategoriesList(items) {
                    // go through each item and add a false attribute except the last one based on what link is selected
                    items.forEach((item) => {
                        item.active = false;
                    })
                    items[0].active = true;

                    // addes nav items to list
                    this.listOfCategories = items;
                },
                changeSection(sectionId) {
                    // when user clickes the section is searched by this.
                    const itemIndex = this.listOfCategories.findIndex(item => item.category == sectionId);
                    const activeIndex = this.listOfCategories.findIndex(item => item.active == true)
                    this.listOfCategories[itemIndex].active = true;
                    this.listOfCategories[activeIndex].active = false;

                   fetchData(`./includes/data.php?category=${sectionId}`).then(data => this.updatePortfolioList(data)).catch(err => { console.log(err);});  
                }
            }
        }).$mount('#portfolio-section')
        
})();
