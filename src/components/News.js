import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
const News=(props)=> {
  const [articles, setArticles]=useState([])
  const [loading, setLoading]=useState(true)
  const [page, setPage]=useState(1)
  const [totalResults, setTotalResults]=useState(0)


const updateNews=async()=>{
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.page_size}`;
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(30);                
  let parsedData = await data.json()
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
  
  props.setProgress(100);
}

useEffect(() => {
  updateNews();
  // eslint-disable-next-line
}, [])






const fetchMoreData = async() => {
  
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.page_size}`;
  setPage(page+1)
  // this.setState({loading:true})
  let data=await fetch(url)
  let parsed_data=await data.json()
  // console.log(parsed_data)
  setArticles(articles.concat(parsed_data.articles))
  setTotalResults(parsed_data.totalResults)
};


    return (<>
      
        <h2 className="text-center" style={{ margin: '35px 0px' ,marginTop:'90px'}}>Trending Now - {props.category.charAt(0).toUpperCase()+ props.category.slice(1)}</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          // loader={this.state.articles.length === this.state.totalResults && <Spinner/>}
          loader={(articles.length === totalResults)?<Spinner />:null}
        >
          <div className="container">
        <div className="row">
        

        
        { articles.map((element,index)=>{
          
          return <div key={index} className="col-md-4">
          <NewsCard title={element.title.slice(0,41)+"..."} description={(element.description!==null)?(element.description.length>88)?element.description.slice(0,88)+"...":element.description:""} img_url={element.urlToImage} news_url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
       
        
        </div>
        </div>
        </InfiniteScroll>
      

      
      </>);
  }


News.defaultProps={
  page_size:20,
  country:"in",
  category:"general"
}

News.propTypes={
  page_size:PropTypes.number,
  country:PropTypes.string,
  category:PropTypes.string,
}

export default News;
