import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SerachGuild from "../components/search_guild"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

import axios from 'axios'

const GuildPage = () => {
  return(  
  <Layout>
    <div>
      <SerachGuild></SerachGuild>
    </div>
  </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="메이피플 (길드)" />

export default GuildPage
