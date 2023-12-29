import * as React from "react"
import axios from 'axios'
import moment from 'moment'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as styles from "../components/search_window.module.css"

const SearchWindow = ({ placeholder, value, onChange, onClick, selectList, selectVisible, selectWorld, setSelectWorld }) => {

    return(
        <div className={styles.input}>
            <Form>
                <Row>
                {selectVisible? 
                <Col>
                <Form.Select onChange={(e)=>{setSelectWorld(e.target.value)}}  value={selectWorld}>
                    {selectList? selectList.map((elm, idx)=>(
                        <option key={elm}>{elm}</option>
                    )) : ''}
                </Form.Select>
                </Col>
                : ''
                }
                
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder={placeholder}
                    className=" mr-sm-2"
                    onChange={onChange}
                    value={value}
                    />
                </Col>
                <Col xs="auto">
                    <Button onClick={onClick} type="button">찾기</Button>
                </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchWindow
