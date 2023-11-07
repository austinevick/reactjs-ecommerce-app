import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { Rating } from "../components/Rating";

export const ProductPage = () => {
    const params = useParams()
    const { slug } = params
    const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

    return (
        isLoading ? (<LoadingBox />) : error ?
            (<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>) :
            <Row>
                <Col md={6}><img className="large" src={product?.image} alt={product?.name} /> </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{product?.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product!.rating} numReviews={product?.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product?.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product?.description}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product?.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product!.countInStock > 0 ? (
                                            <Badge bg="success">In Stock</Badge>
                                        ) : (
                                            <Badge bg="danger">Unavailable</Badge>
                                        )}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {product!.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button variant="primary">Add to Card</Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

    )
}
