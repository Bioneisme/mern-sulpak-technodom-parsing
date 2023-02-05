import React, {useEffect, useState} from "react";
import {Line, Bar} from "react-chartjs-2";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import {
    chart1_2_options,
    chart2,
    chart3,
    chart4, setChart2Data, setChart3Data, setChart4Data
} from "../variables/charts.js";
import API from "../api";
import {countCategories, countPriceByCategories, countStores, reduceString} from "../utils/dataCount";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await API.get(`/products/getAllProducts`);
            setData(res.data);
            setChart2Data(countCategories(res.data));
            setChart3Data(countStores(res.data));
            setChart4Data(countPriceByCategories(res.data).result);
        }

        fetchData()
            .then()
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) return <p>{error.message}</p>;

    if (!data) return <p>Loading...</p>
    return (
        <>
            <div className="content">
                <Row>
                    <Col lg="4">
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total Products</h5>
                                <CardTitle tag="h3">
                                    <i className="tim-icons icon-bell-55 text-info"/> {data.length}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                    <Bar
                                        data={chart2}
                                        options={chart1_2_options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total stores</h5>
                                <CardTitle tag="h3">
                                    <i className="tim-icons icon-delivery-fast text-primary"/>{" "}
                                    2
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                    <Bar
                                        data={chart3.data}
                                        options={chart3.options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total cost</h5>
                                <CardTitle tag="h3">
                                    <i className="tim-icons icon-send text-success"/> {countPriceByCategories(data).totalPrice} ₸
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                    <Line
                                        data={chart4.data}
                                        options={chart4.options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">List of Products</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div style={{
                                    maxHeight: '500px',
                                    overflowY: 'auto'
                                }}>
                                    <Table className="tablesorter">
                                        <thead className="text-primary">
                                        <tr>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Store</th>
                                            <th className="text-center">Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map(obj => (
                                            <tr>
                                                <td><img src={obj.image} height="24" width="24"/>&nbsp;
                                                    {reduceString(obj.title, 70)}</td>
                                                <td>{obj.category}</td>
                                                <td>{obj.store}</td>
                                                <td className="text-center">{obj.price} ₸</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard;