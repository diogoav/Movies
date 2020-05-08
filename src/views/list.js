import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import logo from '../public/logo512.png';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col, Button } from 'reactstrap';

class listComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            listEmployee: []
        }
    }

    onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id)
            } else if (result.dismiss ===
                Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    sendDelete(userId) {
        // url do backend
        const baseUrl = "http://localhost:3000/employee/delete"
        // network
        axios.post(baseUrl, {
            id: userId
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your employee has been deleted.',
                        'success'
                    )
                    this.loadEmployee()
                }
            })
            .catch(error => {
                alert("Error 325 ")
            })
    }


    componentDidMount() {

        this.loadEmployee();
    }

    loadEmployee() {

        const url = "http://localhost:3000/employee/list";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    this.setState({ listEmployee: data });
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }

    loadFillData() {

        return this.state.listEmployee.map((data, index) => {
            return (
                <div className="container-fluid d-flex justify-content">
                    <CardBody key={index}>
                                <CardImg  width="50%" src={logo} alt="Logo" alt="Card image cap" />
                                <CardTitle>{data.id}</CardTitle>
                                <CardTitle>{data.name}</CardTitle>
                                <CardSubtitle>{data.address}</CardSubtitle>
                                <CardSubtitle>{data.phone}</CardSubtitle>
                                <CardText>{data.role.role}</CardText>
                                <CardText>{data.email}</CardText>

                                <Link class="btn btn-outline-info " to={"/edit/" + data.id} >Edit</Link>
                                <button class="btn btn-outline-danger" onClick={() => this.onDelete(data.id)}> Delete </button>
                    </CardBody>
                    </div>
                    
            )
        });
    }

    render() {
        return (
            <React.Fragment>
                
                <div >
                    
                        <Col sm="6">
                        {this.loadFillData()}
                        </Col>
               
                   
                </div>
                
            </React.Fragment>
        );

    }









}

export default listComponent;