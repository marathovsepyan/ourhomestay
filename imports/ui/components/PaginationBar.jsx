import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

export default class PaginationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage   : (FlowRouter.getQueryParam('page'))? Number(FlowRouter.getQueryParam('page')) : this.props.currentPage,
      totalPages    : Math.ceil(this.props.totalCount/10),
      previousPage  : "",
      nextPage      : ""
    };
  }

  componentDidMount() {
    console.log("type of this.state.totalPages")
    console.log(typeof this.state.totalPages);
    console.log("total pages : "+ this.state.totalPages);
    console.log("current page : "+ this.state.currentPage);
    if (this.state.totalPages == 1) {
      this.setState({'nextPage':'disabled'})
      this.setState({'previousPage':'disabled'})
    } else if(this.state.totalPages > 1) {
      if (this.state.currentPage == 1) {
        this.setState({'nextPage':'enabled'})
        this.setState({'previousPage':'disabled'})
      } else if((this.state.currentPage > 1) && (this.state.currentPage < this.state.totalPages)) {
        this.setState({'nextPage':'enabled'})
        this.setState({'previousPage':'enabled'})
      } else if (this.state.currentPage >= this.state.totalPages){
        this.setState({'nextPage':'disabled'})
        this.setState({'previousPage':'enabled'})
      }
    }
  }

  componentWillReceiveProps(props){
    console.log("flowrouter "+FlowRouter.getQueryParam('page'))
    console.log("state " +this.state.currentPage)
    this.setState({'totalPages':Math.ceil(props.totalCount/10)});
    if (FlowRouter.getQueryParam('page')) {
      this.setState({'currentPage':Number(FlowRouter.getQueryParam('page'))})
    } else {
      this.setState({'currentPage':Number(props.currentPage)})
    }
  }

  updateCount (event) {
    var pageCount = Number($(event.currentTarget).siblings('.active').attr('data-count'));

      $(event.currentTarget).siblings('.pageCount').removeClass('active')
      if ($(event.currentTarget).hasClass('previousPage')) {
        nextPage = pageCount-1;
      } else if ($(event.currentTarget).hasClass('nextPage')){
        nextPage = pageCount+1;
      }
      $('.pageCount').each(function( index ) {
        if (Number($(this).text()) === Number(nextPage) ) {
          $(this).addClass("active")
        }
      })
      this.setState({'currentPage':nextPage})

      if (nextPage > 1 && nextPage < Number(this.state.totalPages)){
        this.setState({'previousPage':'enabled'})
        this.setState({'nextPage':'enabled'})
      }else if (nextPage <= 1)  {
        this.setState({'previousPage':'disabled'})
        this.setState({'nextPage':'enabled'})
      } else if (nextPage >= Number(this.state.totalPages)) {
        this.setState({'previousPage':'enabled'})
        this.setState({'nextPage':'disabled'})
      }
      FlowRouter.setQueryParams({page: nextPage});
  }

  updatePageCount(event) {
    var pageCount = Number($(event.currentTarget).attr('data-count'));
    $(event.currentTarget).siblings('.pageCount').removeClass('active')
    $(event.currentTarget).addClass('active')
    this.setState({'currentPage':pageCount})
    if(pageCount > 1 && pageCount < Number(this.state.totalPages)){
      this.setState({'previousPage':'enabled'})
      this.setState({'nextPage':'enabled'})
    }else if (pageCount <= 1)  {
      this.setState({'previousPage':'disabled'})
      this.setState({'nextPage':'enabled'})
    } else if (pageCount >= Number(this.state.totalPages)) {
      this.setState({'previousPage':'enabled'})
      this.setState({'nextPage':'disabled'})
    }
    FlowRouter.setQueryParams({page: pageCount});
  }

  getPageIndex () {
    var paginationCount = [];
    for (var i=1; i <= this.state.totalPages; i++ ) {
      console.log("i : "+i+" state: "+this.state.currentPage )
      if (Number(i) === Number(this.state.currentPage)) {
        console.log(i)
        paginationCount.push(
          <li className="active pageCount" onClick={this.updatePageCount.bind(this)} key={i} data-count={i}><a href="javascript:void(0)">{i}</a></li>
        )
      } else {
        paginationCount.push(
          <li className="pageCount" onClick={this.updatePageCount.bind(this)} key={i} data-count={i}><a href="javascript:void(0)">{i}</a></li>
        )
      }
    }
    return paginationCount

  }

  render () {
    var previousIconClass = classNames(this.state.previousPage, 'previousPage')
    var nextIconClass = classNames(this.state.nextPage, 'nextPage')
    return (
      <div className="clearfix">
        <ul className="pagination pull-right">
          <li className={previousIconClass} onClick={this.updateCount.bind(this)} ><a aria-label="Previous" href="javascript:void(0)"><span aria-hidden="true">«</span></a></li>
            {this.getPageIndex()}
          <li className={nextIconClass} onClick={this.updateCount.bind(this)} ><a aria-label="Next" href="javascript:void(0)"><span aria-hidden="true">»</span></a></li>
        </ul>
      </div>
    )
  }
}

PaginationBar.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired
};
