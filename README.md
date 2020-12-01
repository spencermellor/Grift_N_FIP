# Nathan Grift FIP
### Personal Portfolio Website

*Oct 15, 2020*

Portfolio website of my personal brand and all the amazing work I have created. 

### Reason for Application
This project was designed for **Interactive Media Design** at **Fanshawe College**

Purpose is to create a full live-hosted website to demonstate the ability to host a website.  Data needs to be fetched from a database.

### Data for Portfolio
The file `PortfolioContent.json` within the `data/` folder is a template of what a portfolio item will look like once retrieved from a database.  
*DO NOT USE THIS AS PORFOLIO DATA IN FINISHED PRODUCT*

### API info

 The api current endpoints are as follows: 

**GET**  `includes/data.php` retreives list of all portfolio items


**GET**  `includes/data.php?id=1` retreives portfolio item where its *id = 1* 
*id can be replaced with any number that is valid*
*doing a id query also gets access to the long description otherwise not available*


**GET**  `includes/data.php?category=website` retreives list of all portfolio items with the category of *website*.

List of Available categories:
- `featured` *my best work*
- `website` *web development projects I made*
- `3d` *3D and Motion design work*
- `design` *graphic design work*

### Authors

- Developer - Nate Grift

### Tools Used

-   HTML
-   CSS3
-   Javascript
-   NPM
-   SASS
-   Markdown


### License

MIT
