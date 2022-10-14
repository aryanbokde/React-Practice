import React from "react";

const NewItem = (props)=> {
    let {title, description, imageUrl, newsUrl, author, published} = props;
    return (
      <div className="my-2">
        <span className="badge bg-info text-dark" style={{position: "absolute", zIndex:"99"}}>{author}</span>
        <div className="card">
          <a href={newsUrl} target="__blank" className="">
            <img src={imageUrl} className="card-img-top" alt={title} />
          </a>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} On { new Date(published).toGMTString()}</small></p>
            <a href={newsUrl} target="__blank" className="btn sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );  
}

export default NewItem;
