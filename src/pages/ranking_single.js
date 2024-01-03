import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SearchCulvertSingle from "../components/search_culvert_single"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

import axios from 'axios'

const RankingSinglePage = () => {
  return(  
  <Layout>
    <div>
        <SearchCulvertSingle></SearchCulvertSingle>
    </div>
  </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="메이피플 (수로 : 길드)" />

export default RankingSinglePage
