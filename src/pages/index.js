import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SerachSingle from "../components/search_single"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

import axios from 'axios'

const IndexPage = () => {
  return(  
  <Layout>
    <SerachSingle></SerachSingle>
  </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
