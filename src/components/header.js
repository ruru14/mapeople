import * as React from "react"
import { Link } from "gatsby"

import 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from "../components/header.module.css"

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <nav className={styles.navigation}>
          <ul>
            <li><Link href="/">일반</Link></li>
            <li><Link href="/guild">길드</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header
