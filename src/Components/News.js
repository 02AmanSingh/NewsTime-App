import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capatalizeFunc(props.category)} - NewsTime`;    

    const capatalizeFunc = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pagesize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parseddata = await data.json();
        setArticles(parseddata.articles);
        setLoading(false);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const handlePrevPage = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pagesize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parseddata = await data.json();
        setPage(page - 1);
        setArticles(parseddata.articles);
        setLoading(false);
    }

    const handleNextPage = async () => {
        console.log("Next");
        if (!(page + 1 > (Math.ceil(totalResults / props.pageSize)))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            let parseddata = await data.json();
            setPage(page + 1);
            setArticles(parseddata.articles);
            setLoading(false);
        }
    }

    // fetchMoreData = async ()=>{
    //     setState({
    //         page: page + 1,
    //     })
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pagesize=${props.pageSize}`;
    //     let data = await fetch(url);
    //     let parseddata = await data.json();
    //     setArticles(articles.concat(parseddata.articles));
    //     setTotalResults(parseddata.totalResults);
    // };


    return (
        <div className='container my-3'>
            <h1 style={{ fontSize: '3rem', margin: '3rem 0rem' }}>NewsTime - Top {capatalizeFunc(props.category)} Headlines</h1>
            {loading && <LoadingSpinner />}
            {/* <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<LoadingSpinner/>}
                > */}
            <div className='row my-2 mx-2'>
                {!loading && articles.map((element) => {
                    return <div className='col-md-4' key={element.url}>
                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} />
                    </div>
                })}
            </div>
            {/* </InfiniteScroll> */}
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevPage}>&larr; Previous</button>
                <button disabled={page + 1 > (Math.ceil(totalResults / props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextPage}>Next &rarr;</button>
            </div>
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 7,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News