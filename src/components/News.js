import React, {useEffect , useState} from 'react'  
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {  
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=> {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        
        setLoading(true);

        let data = await fetch(url);
        let parsedData = await data.json()

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - MyNews`;
        updateNews();
    }, [])

    const fetchMoreData = async ()=> {  

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        
        setPage(page + 1);

        let data = await fetch(url);
        let parsedData = await data.json()

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);

    };

    
    return (
        <>
            <h1 className="text-center" style={{ margin: '35px' , marginTop: '90px'}}>MyNews - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength = {articles.length}
                next = {fetchMoreData}
                hasMore = {articles.length !== totalResults}
                loader = {<Spinner/>}
            > 
                <div className="container">
                         
                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </div> 
            </InfiniteScroll>

        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News



// if we don't write super() then it will show error
// we use useState in function component but use this.state in class component
// initially set the articles as blank array

// we use this.setState to change in the this.state

// if we don't add key then it will show error in console
// element.description.slice(0,60) --> we use slice(0,60)  so that we only see first 60 characters of description on screen

// componentDidMount  --> it is a lifecycle method and it will run after render method

// &larr; and &rarr --> to add the left and right arrow
// d-flex justify-content-between  -> to put the one button on left side of page and other on right side
// disabled={this.state.page <= 1} --> disabled the page when we are on first page

// map is used to iterate through articles 

// {this.state.loading && <Spinner/>}  ---> means when loading is true then spinner will run 
// !(this.state.loading) && this.state.articles.map((element) --> only show when loading is false

/* To add prev and next button  ---->

<div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
</div>

*/


/* Class based component -->

export class News extends Component {  // rce
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(props.category)} - MyNews`;
    }

    async updateNews() {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
        
        this.setState({ 
            loading: true 
        });

        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false 
        })

    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews()
    }

    fetchMoreData = async () => {  

        this.setState({page: this.state.page + 1})

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>MyNews - Top {this.capitalizeFirstLetter(props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength = {this.state.articles.length}
                    next = {this.fetchMoreData}
                    hasMore = {this.state.articles.length !== this.state.totalResults}
                    loader = {<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    }
}

export default News


*/