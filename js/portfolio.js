import { fetchData } from "./modules/fetchData.js";

(() => {

    // Portfolio
        const portfolio = new Vue({
            data: {
                activeCategory: 'featured',
                portfolioItems: [],
                listOfCategories: []
            },
            mounted: function() {
                fetchData("./includes/data.php?category=featured").then(data => this.updatePortfolioList(data)).catch(err => { console.log(err);});
                fetchData("./includes/data.php?list=tbl_categories").then(data => this.updateCategoriesList(data)).catch(err => { console.log(err);});
            },
            methods: {
                updatePortfolioList(items) {
                    this.portfolioItems = items;
                },
                updateCategoriesList(items) {
                    
                    items.forEach((item) => {
                        item.active = false;
                    })
                    items[0].active = true;
                    this.listOfCategories = items;
                },
                changeSection(sectionId) {
                    const itemIndex = this.listOfCategories.findIndex(item => item.category == sectionId);
                    const activeIndex = this.listOfCategories.findIndex(item => item.active == true)
                    this.listOfCategories[itemIndex].active = true;
                    this.listOfCategories[activeIndex].active = false;

                    console.log(sectionId)
                   fetchData(`./includes/data.php?category=${sectionId}`).then(data => this.updatePortfolioList(data)).catch(err => { console.log(err);});  
                }
            }
        }).$mount('#portfolio-section')
        
})();
