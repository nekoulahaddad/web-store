import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {addComment, addItem, getItems, deleteItem } from '../actions/itemActions';
import {addToCart} from '../actions/authActions';
import PropTypes from 'prop-types';
import {CustomInput, Col, Row, Container, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Alert,Card, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody,CardDeck,CardColumns } from 'reactstrap';
import ReactTimeAgo from 'react-time-ago';
import FileUpload from './FileUpload';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Progress from './Progress';
import {Link} from 'react-router-dom';


class Dashboard extends Component {

    state = {
        modal: false,
        content: '',
        id: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        addComment: PropTypes.func.isRequired,
        addToCart:PropTypes.func.isRequired
    };


    componentDidMount() {
        this.props.getItems();
    };


    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    onAddToCart = id => {
        this.props. addToCart(id);
    };


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value });
    };

    Comment = id => {
        const { content } = this.state;
        this.props.addComment(id, { content });
    }


    //toString()

    render() {
        const { items } = this.props.item;
        const img1 = "http://localhost:5000/"
        return (
            <div>
  { this.props.isAuthenticated ?  (
    
<CardGroup>

            {items.map( (item) => 
              <Col md={3} sm={6}>
                <Card className="m-2" key={item._id}>
                {item.images.length == 0 ? <CardImg className="img_item img-thumbnail"  top width="100%"   src="https://via.placeholder.com/256x186/FFFFFF/000000/?text=syriashop.com" />:null}
                  {item.images.map((image) => (
                    <div>
                    <CardImg className="img_item img-thumbnail"   top width="100%" src={img1,image} />
                    </div>
                  ))}
                  <CardBody>
                  <CardTitle> 
               <Link className="btn-link" to={{
                pathname:`/item/${item._id}`,
                query:{item: item}
              }}>{item.name}</Link>
                  </CardTitle> 
                  <CardSubtitle>
                  <span className='text-danger mr-3'> Price: {item.price}$ </span> 
                  {item.price_sale ? <span className='last_price'> {item.price_sale}$ </span>:null }
                   </CardSubtitle>
                   <CardText>
                  <a href="#"><i className="fa fa-thumbs-up batata ml-1">{item.likes}</i></a>
                  <a href="#"><i className="fa fa-comments  batata ml-1" aria-hidden="true">{item.comment_count}</i></a>
                  <span><ReactTimeAgo date={item.date} locale="en"/></span>
                  </CardText>
                          <Button
                      className='fa fa-shopping-cart ml-2'
                      color='success'
                      size='sm'
                      onClick={this.onAddToCart.bind(this, item._id)}
                    >
                      <span className='ml-1'>add to cart</span>   
                      </Button>   
                  </CardBody>                
                </Card>
                </Col>
          )}

</CardGroup>
 ):null }
</div>
        )
    }


}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {addToCart, addComment, getItems, addItem, deleteItem })(Dashboard)