import { fetchData } from "./modules/fetchData.js";
import { notification } from "./modules/notification.js";

(() => {

    // Portfolio content list
        const portfolio = new Vue({
            data: {
                activeCategory: 'featured',
                portfolioItems: [],
                listOfCategories: [],
            },
            mounted: function() {
                // Fetch all featured portfolio items
                fetchData("./includes/data.php?category=featured").then(data => this.updatePortfolioList(data)).catch(err => { this.showError(err);});
                // Fetch all available links
                fetchData("./includes/data.php?list=tbl_categories").then(data => this.updateCategoriesList(data)).catch(err => { this.showError(err);});
            },
            methods: {
                updatePortfolioList(items) {
                    // sets list to whats retreived and add the showmore option to be none
                    items.forEach((portItem => portItem.showMore = false));
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
                updateShowMoreItem(item) {
                    // Updates the item in the array to include long description
                    const portfolioIndex = this.portfolioItems.findIndex((portItem) => portItem.portfolio_id == item.portfolio_id);
                    if (portfolioIndex >= 0) {
                        let portItem = this.portfolioItems[portfolioIndex];
                        portItem.long_description = item.long_description;
                        portItem.showMore = true;
                    }
                },
                changeSection(sectionId) {
                    // when user clickes the section is searched by this.
                    const itemIndex = this.listOfCategories.findIndex(item => item.category == sectionId);
                    const activeIndex = this.listOfCategories.findIndex(item => item.active == true)
                    this.listOfCategories[itemIndex].active = true;
                    this.listOfCategories[activeIndex].active = false;
                    
                    fetchData(`./includes/data.php?category=${sectionId}`).then(data => this.updatePortfolioList(data)).catch(err => { this.showError(err);});  
                },
                showMore(itemID) {
                    // is triggered when user clicks on show more. 
                    const portfolioIndex = this.portfolioItems.findIndex((portItem) => portItem.portfolio_id == itemID);
                    
                    // If it has already retreived the database, do not retreive the data anymore. But instead simply show the previous content.
                    // this was done to reduce the amount of requests sent out
                    if (!this.portfolioItems[0].long_description) {
                        fetchData(`./includes/data.php?id=${itemID}`).then(data => this.updateShowMoreItem(data[0])).catch(err => { this.showError(err);});  
                    } else {
                        this.portfolioItems[0].showMore = true;
                    }
                },
                showLess(itemID) {
                    // is triggered when user clicks on show more. 
                    const portfolioIndex = this.portfolioItems.findIndex((portItem) => portItem.portfolio_id == itemID);
                    this.portfolioItems[portfolioIndex].showMore = false;
                },
                showError(err) {
                        // Create error notification and show it
                        notification.title = 'An Error Occured';
                        notification.info = err;
                        notification.$el.classList.add('notification-error');
                        notification.showNotification();     
                }
            }
        }).$mount('#portfolio-section')
        
})();
