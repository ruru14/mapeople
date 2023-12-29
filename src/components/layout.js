/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import * as styles from "../components/layout.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={styles.layout}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className={styles.main}>{children}</main>
      <Footer siteTitle={data.site.siteMetadata?.title || `Title`} />
    </div>
    // <>
    //   <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
    //   <div
    //     style={{
    //       margin: `0 auto`,
    //       maxWidth: `var(--size-content)`,
    //       padding: `var(--size-gutter)`,
    //     }}
    //   >
    //     <main>{children}</main>
        
    //   </div>
    //   <Footer siteTitle={`Foot!`}/>
    // </>
  )
}

export default Layout
