import * as React from "react"

import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import * as styles from "../components/character_slot_basic.module.css"

const CharacterSlotBasic = ({ characterInfo }) => {

    return(
        <Table borderless>
            <tbody>
                <tr>
                <td rowSpan={0}><Image className={styles.image} src={characterInfo? characterInfo.character_image : ''} roundedCircle /></td>
                <td className={styles.table_info}>
                    {characterInfo? characterInfo.world_name : '로딩 중'}
                    {` `}@{` `} 
                    {characterInfo? characterInfo.character_guild_name : '로딩 중'}
                </td>
                </tr>
                <tr>
                <td>
                    Lv.{characterInfo? characterInfo.character_level : '로딩 중'}
                    {` `}{characterInfo? characterInfo.character_class : '로딩 중'}
                </td>
                </tr>
                <tr>
                <td>
                    {characterInfo? characterInfo.character_name : '로딩 중'}
                </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default CharacterSlotBasic
