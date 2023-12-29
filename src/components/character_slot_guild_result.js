import * as React from "react"

import Table from 'react-bootstrap/Table';
import CharacterSlotBasic from "./character_slot_basic"
import * as styles from "../components/character_slot_guild_result.module.css"

const CharacterSlotGuildResult = ({ characterInfoGuild, characterInfoOrigin }) => {

    return(
        <Table borderless>
            <tbody>
                <tr>
                <td rowSpan={0}><CharacterSlotBasic characterInfo={characterInfoGuild}/></td>
                <td>
                </td>
                <td rowSpan={0}><CharacterSlotBasic characterInfo={characterInfoOrigin}/></td>
                </tr>
                <tr>
                    {characterInfoOrigin?.character_guild_name&&
                        characterInfoGuild.character_guild_name === characterInfoOrigin.character_guild_name ? 
                            <td><h1 className={styles.text_match}>{`=>`}</h1></td> :
                            <td><h1 className={styles.text_unmatch}>{`=>`}</h1></td>
                        
                    }
                    
                </tr>
            </tbody>
        </Table>
    )
}

export default CharacterSlotGuildResult
