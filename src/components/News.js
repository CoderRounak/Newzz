import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps={
    page_size:20,
    country:"in",
    category:"general"
  }

  static propTypes={
    page_size:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string,
  }
     
constructor(props)
{
  super(props);
  this.state={
    articles:[],
    loading: true,
    page:1,
    totalResults:0

  }
}

async updateNews() {
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.page_size}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  this.props.setProgress(30);                
  let parsedData = await data.json()
  
  this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false, 
  })
  this.props.setProgress(100);
}
async componentDidMount()
{
  this.updateNews();
}

handleNextClick=async()=>{
  this.setState({ page: this.state.page + 1 });
  this.updateNews();
}

handlePrevClick=async()=>{
  this.setState({ page: this.state.page - 1 });
  this.updateNews();
}


fetchMoreData = async() => {
  this.setState({page:this.state.page + 1})
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.page_size}`;
  // this.setState({loading:true})
  let data=await fetch(url)
  let parsed_data=await data.json()
  // console.log(parsed_data)
  this.setState({articles: this.state.articles.concat(parsed_data.articles),
    totalResults:parsed_data.totalResults
  })
};

render()
{
    return (<>
      
        <h2 className="text-center" style={{ margin: '35px 0px' }}>Trending Now - {this.props.category.charAt(0).toUpperCase()+ this.props.category.slice(1)}</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={this.state.articles.length === this.state.totalResults && <Spinner/>}
          loader={(this.state.articles.length === this.state.totalResults)?<Spinner />:null}
        >
          <div className="container">
        <div className="row">
        

        
        { this.state.articles.map((element,index)=>{
          
          return <div key={index} className="col-md-4">
          <NewsCard title={element.title.slice(0,41)+"..."} description={(element.description!==null)?(element.description.length>88)?element.description.slice(0,88)+"...":element.description:""} img_url={element.urlToImage} news_url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
       
        
        </div>
        </div>
        </InfiniteScroll>
      

      
      </>);
  }
}

export default News;
