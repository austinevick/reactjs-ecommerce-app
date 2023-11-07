import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { Row, Col } from "react-bootstrap";

export const ProductPage = () => {
    const params = useParams()
    const { slug } = params
    const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

    return (
        isLoading ? (<LoadingBox />) : error ?
            (<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>) :
            <Row>
                <Col md={6}><img className="large" src={product?.image} alt={product?.name} /> </Col>
                <Col md={3}></Col>
                <Col md={3}></Col>
            </Row>

    )
}
