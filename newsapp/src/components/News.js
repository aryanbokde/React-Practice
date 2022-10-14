import React, { useEffect, useState } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNew = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading({ loading: true });
    let data = await fetch(url);
    props.setProgress(20);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);   
    props.setProgress(100);
  };

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNew();
  }, []);
 

  const fetchMoreData = async () => {    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };  

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center" style={{marginTop:"100px"}}>
          Top Headlines - {capitalizeFirstLetter(props.category)}
        </h2>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4" data={element.url}>
                  <NewItem                    
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://i.insider.com/632b4a2048c188001815b1f1?width=1200&format=jpeg"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    published={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  pageSize: 8,
  category: "sports",
  country: "in",
};

News.propType = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
};

export default News;
