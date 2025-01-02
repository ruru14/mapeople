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

const SearchWindow = ({ placeholder, value, onChange, onClick, selectVisible, selectWorld, setSelectWorld }) => {
    const worldList = [`스카니아`, `베라`, `루나`, `제니스`, `크로아`, `유니온`, `엘리시움`, `이노시스`, `레드`, `오로라`, `아케인`, `노바`, `에오스`, `핼리오스`, `챌린저스`, `챌린저스2`, `챌린저스3`, `챌린저스4`]
    
    return(
        <div className={styles.input}>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                {selectVisible? 
                <Col>
                <Form.Select onChange={(e)=>{setSelectWorld(e.target.value)}}  value={selectWorld}>
                    <option key={'월드'} selected hidden>월드</option>
                    {worldList? worldList.map((elm, idx)=>(
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
                    <Button onClick={onClick} type="submit" disabled={selectWorld===''? true:false}>찾기</Button>
                </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchWindow
