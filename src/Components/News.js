import React, { Component } from 'react'
import NewsItem from './NewsItem'
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 7,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capatalizeFunc = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${this.capatalizeFunc(this.props.category)} - NewsTime`;
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false,
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevPage = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles,
            loading: false,
        })
    }

    handleNextPage = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > (Math.ceil(this.state.totalResults / this.props.pageSize)))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({
                loading: true
            })
            let data = await fetch(url);
            let parseddata = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parseddata.articles,
                loading: false,
            })
        }
    }

    // fetchMoreData = async ()=>{
    //     this.setState({
    //         page: this.state.page + 1,
    //     })
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parseddata = await data.json();
    //     this.setState({
    //         articles: this.state.articles.concat(parseddata.articles),
    //         totalResults: parseddata.totalResults,
    //     })
    // };

    render() {

        return (
            <div className='container my-3'>
                <h1 style={{ fontSize: '3rem', margin: '3rem 0rem' }}>NewsTime - Top {this.capatalizeFunc(this.props.category)} Headlines</h1>
                {this.state.loading && <LoadingSpinner/>}
                {/* <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<LoadingSpinner/>}
                > */}
                    <div className='row my-2 mx-2'>
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} />
                            </div>
                        })}
                    </div>
                {/* </InfiniteScroll> */}
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > (Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News