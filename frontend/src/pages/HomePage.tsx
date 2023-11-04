import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Product } from "../types/Product"
import { useEffect, useReducer } from "react"
import axios from "axios"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import { LoadingBox } from "../components/LoadingBox"
import { MessageBox } from "../components/MessageBox"


type State = {
    products: Product[]
    loading: boolean
    error: string
}
type Action = | { type: 'FETCH_REQUEST' }
    | {
        type: 'FETCH_SUCCESS'
        payload: Product[]
    }
    | {
        type: 'FETCH_FAIL'
        payload: string
    }

const initialState: State = {
    products: [],
    loading: true,
    error: ''
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const HomePage = () => {
    const [{ loading, error, products }, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const response = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error as ApiError) })
            }
        }
        fetchData()
    }, [])

    return loading ? (<LoadingBox />) : error ?
        (<MessageBox variant="danger">{error}</MessageBox>) : (
            <Row>
                {products.map((e) => (<Col key={e.slug}
                    sm={6} md={4} lg={3}>
                    <Link to={'/product/' + e.slug}>
                        <img src={e.image} alt={e.name} className='image' />
                        <h2>{e.name}</h2>
                        <p>${e.price}</p>
                    </Link>

                </Col>))}
            </Row>
        )
}
