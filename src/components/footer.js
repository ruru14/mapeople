import * as React from "react"

import * as styles from "../components/footer.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Footer = ({ siteTitle }) => {
  return (
    <footer className={styles.footer}>
        <div className={styles.contents}>
            <div>
                <p className={styles.title}>{siteTitle}</p>
                <p className={styles.copyright}>
                  current version 1.01<br/>
                  © {new Date().getFullYear()} &middot; <a href="https://github.com/ruru14">리부트@유이당</a> All Rights Reserved<br/>
                  Data based on NEXON Open API<br/>
                </p>
            </div>
        </div>
    </footer>
  );
}

export default Footer
