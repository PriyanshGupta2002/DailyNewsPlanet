import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }




    const updateNews = async () => {
        props.setProgress(10)
        setLoading(true)
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=42fa0ce91ea145b7b62fe7131e288ce1&page=${page}&pageSize=${props.pageSize}`)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - DailyNewsPlanet`;
        updateNews();
        // eslint-disable-next-line
    }, [])
    const fetchMoreData = async () => {
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=42fa0ce91ea145b7b62fe7131e288ce1&page=${page+1}&pageSize=${props.pageSize}`)
        setPage(page + 1)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h1 className="text-center" style={{marginTop:'65px'}}>{capitalizeFirstLetter(props.category)} - <strong>Top Headlines</strong> </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} urlToImage={!element.urlToImage ? "https://cdn.24.co.za/files/Cms/General/d/11511/5c25767d36d642169ba143cfbb0bd64a.jpg" : element.urlToImage} newsUrl={element.url} author={!element.author ? "Annonymous" : element.author} date={element.publishedAt} source={element.source.name} />
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
    page: 5,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    page: PropTypes.number,
    category: PropTypes.string,
}
export default News
