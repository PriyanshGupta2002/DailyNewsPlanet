import React from 'react'
    const NewsItem=(props)=>{
        return (
            <div>
                <div className="card my-4 " >
                    <div className="d-flex justify-content-flex-end position-absolute left-0">
                <span className="badge rounded-pill bg-danger" >
                            {props.source}
                        </span>
                        </div>
                    <img src={props.urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}   </h5>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.date).toGMTString()}</small></p>
                        <a href={props.newsUrl} rel="noreferrer" className="btn btn-sm btn-success" target="_blank">Read More</a>
                    </div>
                </div>

            </div>
        )
    
        }

export default NewsItem
