import React from 'react';
import {localParam} from '@/assets/js/utils';

class NewsDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        // console.log(props.match.params.id);
    }
    componentDidMount(){
        // console.log("id:"+this.props.match.params.id,"title:"+this.props.match.params.title);
        console.log("id:"+localParam(this.props.location.search).search.id,"title:"+decodeURIComponent(localParam(this.props.location.search).search.title));
    }
    render() {
        return (
            <div>
                <button type={"button"} onClick={this.props.history.goBack.bind(this)}>返回</button>
                ID:{localParam(this.props.location.search).search.id},标题：{decodeURIComponent(localParam(this.props.location.search).search.title)}
            </div>
        )
    }
}

export default NewsDetails;