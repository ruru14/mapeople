import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SerachGuild from "../components/search_guild"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

import axios from 'axios'

const IndexPage = () => {
  return(  
  <Layout>
    <SerachGuild></SerachGuild>
  </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
