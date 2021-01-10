import React, {useState} from 'react';
import { FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { Formik, Form } from 'formik';


function CreateInstagramPost ({createPost})  {
    const [loading, setLoading] = useState(false);

    return(
        <Container className="text-light">
            <h1 >Add a new Instagram Post!</h1>
            <div>
                <p>
                    Future Features:
                    <ul>
                        <li>
                            Post and comments pagination
                        </li>
                        <li>
                            Post and comments update
                        </li>
                        <li>
                            The current predict model uses TDIDF with Naive Bayes with 0.7 of classification rate. In the future I will replace the model with a modern neural network
                        </li>
                    </ul>
                </p>
                <p>
                    Currently limitations:
                    <ul>
                        <li>
                            Max number of comments and replies limited to 10
                        </li>
                    </ul>
                </p>
            </div>

            <Formik
                initialValues={{ quantity: '', link: '' }}
                onSubmit={function (values){
                    setLoading(true)
                    createPost(values.quantity, values.link);
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <FormGroup>
                            <Label for="link">Link</Label>
                            <Input
                                name="link"
                                id="link"
                                type="url"
                                value={values.link}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input
                                name="quantity"
                                id="quantity"
                                max="10"
                                min="1"
                                value={values.quantity}
                                type="number"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button type="submit">Create</Button>
                    </Form>
                )}
            </Formik>
            {loading?<div className="loader-spin"></div>:null}
        </Container>
    )
};


// CreateInstagramPost.propTypes = {
//     func: PropTypes.func,
// };
//
// CreateInstagramPost.defaultProps = {
//     func: createPost,
// };



export default CreateInstagramPost;
