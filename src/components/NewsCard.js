import React, { Component } from "react";

import alt_img from '../img/news_alt.jpg'
export class NewsCard extends Component {
  render() {
    let {title, description, img_url, news_url, author, date, source}=this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: '18rem',backgroundColor:'rgb(252, 254, 255,0.2)'}}>
          <img src={(img_url)?img_url:alt_img} className="card-img-top" alt="cant load" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"><span className="badge badge-pill bg-success">{source}</span></p>
            <p className="card-text">
              {description}
            </p>
            <a href={news_url} rel="noreferrer" target="_blank" className="btn btn-primary btn-sm">
              Read
            </a>
            <p className="card-text"><small className="text-muted">{(author===null)?"Published":"By "+author} on {new Date(date).toLocaleString()}</small></p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsCard;
