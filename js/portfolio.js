import { fetchData } from "./modules/fetchData.js";

(() => {

    // Portfolio
        const portfolio = new Vue({
            data: {
                activeCategory: 'featured',
                portfolioItems: [],
                listOfCategories: [{
                    id: "1",
                    name: "featured",
                    displayName: "Best Work",
                    active: true
                }, {
                    id: "2",
                    name: "website",
                    displayName: "Web Development",
                    active: false
                }, {
                    id: "3",
                    name: "3d",
                    displayName: "3D & Motion Design",
                    active: false
                }, {
                    id: "4",
                    name: "design",
                    displayName: "Graphic Design",
                    active: false
                },]
            },
            mounted: function() {
                fetchData("./includes/data.php").then(data => this.updatePortfolioList(data)).catch(err => { console.log(err);});
            },
            methods: {
                updatePortfolioList(items) {
                    this.portfolioItems = items;
                },
                changeSection(sectionId) {
                    const itemIndex = this.listOfCategories.findIndex(item => item.name == sectionId);
                    const activeIndex = this.listOfCategories.findIndex(item => item.active == true)
                    this.listOfCategories[itemIndex].active = true;
                    this.listOfCategories[activeIndex].active = false;

                    console.log(sectionId)
                   // fetchData(`./includes/data.php?catergory=${sectionId}`).then(data => this.updatePortfolioList(data)).catch(err => { console.log(err);});  
                }
            }
        }).$mount('#portfolio-section')
        
})();
