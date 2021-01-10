
import React,{useState} from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, CardImg, Badge, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

import './CardBox.css';

function CardBox ({onDeletePost, getComments, post}) {
    const [readMore,setReadMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Card className="special-card">
            <CardBody>
                <a href={post.link}>
                    <CardImg className="card-img-top" top src={post.image_path}/>
                </a>
                <CardTitle tag="h5">{post.instagram_user}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                    <Badge color="primary">likes { post.likes }</Badge>
                </CardSubtitle>
            </CardBody>
            <CardBody>
                <Badge className="badge" color="success">positive + {post.number_positive}</Badge>
                <Badge className="badge" color="danger">negative - {post.number_negative}</Badge>
                <CardText>
                    {readMore?
                        <span>
                            {post.description.substring(0, 20)}
                            <b onClick={() => setReadMore(false)}
                               onKeyDown={()=>console.log("remenber to fix  eslint")}>...load </b>
                        </span>:
                        <span>
                            {post.description}
                            <b onClick={() => setReadMore(true)}
                               onKeyDown={()=>console.log("remenber to fix eslint")}>...hide </b>
                        </span>}
                </CardText>
                <span>
                    <FontAwesomeIcon icon={faTrash} className="fa-trash fa-2x"  onClick={() => setIsOpen(true)}/>
                    <FontAwesomeIcon icon={faEdit} className="fa-edit fa-2x" onClick={() => getComments(post.id)}/>
                </span>

                <Modal isOpen={isOpen} toggle={()=>{setIsOpen(false)}}>
                    <ModalHeader className="text-center" toggle={()=>{setIsOpen(false)}}>
                        <b>Are you sure?</b>
                    </ModalHeader>
                    <ModalBody>
                        Do you really want to delete these records? This process cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={()=>{setIsOpen(!isOpen)}}>
                            Cancel
                        </Button>{' '}
                        <button onClick={() => onDeletePost(post.id)} type="button"
                                className="btn btn-danger">
                            Delete
                        </button>
                    </ModalFooter>
                </Modal>
            </CardBody>
        </Card>
    );
}

// CardBox.propTypes = {
//     post: PropTypes.func.isRequired,
//     onDeletePost: PropTypes.func.isRequired,
//     onCommentsPost: PropTypes.func.isRequired,
//     setShowComments: PropTypes.func.isRequired,
// };



export default CardBox;















