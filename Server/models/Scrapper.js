const puppeteer = require('puppeteer')
class Scrapper{
    static _uri = "https://www.maannews.net"; //وكالة معا
    constructor(pageData) {
        this.pageData = pageData;
    }


    static async scrap(pageData) {
        //new browser
        const browser = await puppeteer.launch({
            headless: "new"
        });
        //new page
        const page = await browser.newPage();
        await page.goto(`${Scrapper._uri}/${pageData.type}?page=${pageData.page}`); //give the uri

        const news = await page.evaluate(() => {
            //container of the news blocks
            return Array.from(document.querySelectorAll("div.list-6.list-6-3.mt-20m > div > div > a")).map(paper => {
                const link = paper.getAttribute('href'); //block of each article
                return {
                    link,
                    title: paper.querySelector('.list-6__title').innerText,
                    date: paper.querySelector('.list-6__date').innerText,
                    image: paper.querySelector('.list-6__image > img').getAttribute('data-src'),
                    article: link.slice( link.indexOf('/news/')+6 , link.indexOf('.html'))
                };
            });
        });

        await browser.close(); //close the browser
        return news;
    }

    // get the last page number of pagination
    async lastPage(){
        const browser = await puppeteer.launch({headless: 'new'});
        const page = await browser.newPage();
        await page.goto(`${Scrapper._uri}/${this.pageData.type}`);
        await page.waitForSelector('.pagination-container > ul > li:last-child > a');
        await page.click(".pagination-container > ul > li:last-child > a"); //click on "last page" in pagination
        await page.waitForSelector(".pagination-container > ul > li:nth-child(5) > a");
        const lastPageNumber = await page.$eval("div.pagination-container > ul > li:nth-child(5) > a", el => el.text) //get last page number
        // console.log(lastPageNumber)
        await browser.close();
        return lastPageNumber;
    }

    //get the news page
    static async scrapArticle(article){
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage()
        await page.goto(`${this._uri}/news/${article}.html`)
        const artic = await page.$eval("body > div > div > div.column.is-9 > div > div.default__item--body", el => {
            return {
                title: el.querySelector("div.default__item--head.mt-15 > h1").innerText,
                img : el.querySelector("div.default__item--img > img").getAttribute('src'),
                date: el.querySelector("div.default__item--body-info > div.default__item--date").innerText,
                content: Array.from(el.querySelector("div.default__item--content.default__item--default-content").querySelectorAll("p")).map(p => p.innerText)
                //div.default__item--content.default__item--default-content
            }
        })

        await browser.close();
        return artic;
    }

}

module.exports = Scrapper;
// console.log(parse("https://www.maannews.net/news/2093458.html").name)
// Scrapper.scrapArticle("/news/2093458.html").then(a => {
//     console.log(a)
// })
// .catch(err => {
//     console.log("Error")
//     console.log(err)
// })

// const pageData = {type:'news/sport', page: 1};
// const scrapper = new Scrapper(pageData);
// scrapper.lastPage().then(pageNumber => {
//     console.log(pageNumber)
// });

// const data = scrapper.scrap();
// data.then(news => {
//     console.log(news)
// })

// const htp = "https://www.maannews.net/news/2093458.html";









