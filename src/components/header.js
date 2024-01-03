import * as React from "react"
import { Link } from "gatsby"

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import * as styles from "../components/header.module.css"

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <Table borderless className={styles.contents}>
          <tr>
            <td><Link href="../">일반</Link></td>
            <td>|</td>
            <td><Link href="../guild">길드</Link></td>
            <td>|</td>
            <td><Link href="../ranking_single">수로(길드)</Link></td>
            {/* <td>|</td>
            <td><Link href="../ranking_entire">수로(전체)</Link></td> */}
          </tr>
        </Table>
      </div>
    </header>
  );
}

export default Header
