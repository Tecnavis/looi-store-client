import { Fragment, useState, useEffect } from 'react';


import { useNavigate } from "react-router-dom"
import { getSortedProducts } from '../../helpers/product';
import SEO from "../../components/seo";
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import axiosInstance from '../../config/axiosconfig';
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { Form, ListGroup } from 'react-bootstrap';
import banner from '../../assets/images/logo/banner/10010.webp'
import { FaHeart } from 'react-icons/fa';



const ShopGridFullWidth = ({ location }) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(false);

    const categories = [
        'All Categories',
        'Fashion',
        'Men',
        'Women',
        'Electronics',
        'Furniture',
    ];
    const sizes = [
        'S',
        'M',
        'L',
        'XL',

    ];

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axiosInstance.get('/get-allproduct'); // Ensure this URL is correct
                setProducts(response.data.products); // Adjust based on your actual response structure
                setLoading(false);
            } catch (err) {
                console.error("Error fetching new arrivals:", err);
                setError("Failed to load new arrivals");
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (error) {
        return <div className="text-center">{error}</div>;
    }



    const pageLimit = 15;


    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }
    const handleCardClick = (productId) => {
        navigate(`/product-tab-left/1`); // Navigate to the /cart page with productId
    };


    // useEffect(() => {
    //     let sortedProducts = getSortedProducts(products, sortType, sortValue);
    //     const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
    //     sortedProducts = filterSortedProducts;
    //     setSortedProducts(sortedProducts);
    //     setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    // }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);

    return (
        <Fragment>
            <SEO
                titleTemplate="Shop Page"
                description="Shop page of flone react minimalist eCommerce template."
            />

            <LayoutOne headerTop="visible">
                <div className='banner-div'>
                    <img src={banner} className="img-fluid" alt="banner" />
                </div>

                <div className="shop-area pt-50 pb-100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                {/* <ShopSidebar getSortParams={getSortParams} sideSpaceClass="mr-30" /> */}
                                <h4 className='mb-3'>Categories</h4>
                                {categories.map((category, idx) => (
                                    <div key={idx} className="mb-2">
                                        <Form.Check
                                            type="checkbox"
                                            label={category}
                                            id={`category-${idx}`}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <h4 className='mt-3 mb-3'>Sizes</h4>
                                    {sizes.map((category, idx) => (
                                        <div key={idx} className="mb-2">
                                            <Form.Check
                                                type="checkbox"
                                                label={category}
                                                id={`category-${idx}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">


                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} sortedProductCount={currentData.length} />



                                {/* shop page content default */}
                                {/* <ShopProducts layout={layout} products={currentData} /> */}

                                {/* shop product pagination */}
                                {/* <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div> */}

                                <Row className="justify-content-center">
                                    {products.map((product) => (
                                        <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center" key={product._id}>
                                            <Card style={{ width: '100%', border: 'none', height: '100%' }} onClick={() => handleCardClick(product._id)}>
                                                {product.coverImage ? (
                                                    <div className="position-relative">
                                                        <FaHeart
                                                            style={{
                                                                position: 'absolute',
                                                                top: '10px',
                                                                right: '10px',
                                                                cursor: 'pointer',
                                                                zIndex: 1,
                                                                color: '#fff', // White color for the heart icon
                                                                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark circle background
                                                                borderRadius: '50%', // Make it circular
                                                                padding: '8px', // Padding for space around the heart
                                                                width: '32px', // Set a fixed width for a circular effect
                                                                height: '32px', // Set a fixed height for a circular effect
                                                            }}
                                                        />
                                                        <img
                                                            src={`http://localhost:8000/uploads/${product.coverImage}`}
                                                            alt={product.name}
                                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                                        />
                                                    </div>

                                                ) : (
                                                    <p>No Cover Image Available</p>
                                                )}
                                                <Card.Body style={{ height: '100%' }}>
                                                    <Card.Title className="product-name" style={{ color: '#5b5b5b', fontSize: '16px', height: '20px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        <h5><b>{product.name}</b></h5>
                                                    </Card.Title>
                                                    <hr />
                                                    <Card.Text style={{ flex: 1 }}>

                                                        <h5 style={{ color: '#999999' }}>Men's T-shirts</h5>
                                                        <b>₹ {product.price}</b>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

export default ShopGridFullWidth;