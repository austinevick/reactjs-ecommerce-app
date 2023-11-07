import { Row, Col } from "react-bootstrap"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import { LoadingBox } from "../components/LoadingBox"
import { MessageBox } from "../components/MessageBox"
import { ProductItem } from "../components/ProductItem"
import { Helmet } from "react-helmet-async"
import { useGetProductsQuery } from "../hooks/productHooks"



export const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return isLoading ? (<LoadingBox />) : error ?
        (<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>) : (
            <Row>
                <Helmet>
                    <title>TS Amazon</title>
                </Helmet>
                {products?.map((e) => (<Col key={e.slug}
                    sm={6} md={4} lg={3}>
                    <ProductItem product={e} />

                </Col>))}
            </Row>
        )
}
