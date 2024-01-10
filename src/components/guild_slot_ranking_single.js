import * as React from "react"

import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import * as styles from "../components/guild_slot_ranking_single.module.css"

const GuildSlotRankingSingle = ({ guildRankingInfo, entireRankingInfo }) => {

    const Nobless = () => {
        const percentage = Math.floor((guildRankingInfo.ranking/entireRankingInfo?.length)*100)
        
        if(guildRankingInfo.ranking == 1) return 40
        else if(guildRankingInfo.ranking == 2) return 38
        else if(guildRankingInfo.ranking == 3) return 36
        else if(guildRankingInfo.ranking == 4 || guildRankingInfo == 5) return 34
        else if(guildRankingInfo.ranking >= 6 && guildRankingInfo.ranking <= 10) return 32

        if(percentage <=5 ) return 29
        else if(percentage > 5 && percentage <= 10) return 27
        else if(percentage > 10 && percentage <= 15) return 25
        else if(percentage > 15 && percentage <= 20) return 23
        else if(percentage > 20 && percentage <= 25) return 21
        else if(percentage > 25 && percentage <= 30) return 19
        else if(percentage > 30 && percentage <= 40) return 17
        else if(percentage > 40 && percentage <= 60) return 15
        else if(percentage > 60 && percentage <= 80) return 13

        return 10
    }

    return(
        <Table borderless>
            <tbody>
                <tr>
                    <td>
                        집계 시기
                    </td>
                    <td>
                        {guildRankingInfo.calc_date_start} ~ {guildRankingInfo.calc_date_end}
                    </td>
                </tr>
                <tr>
                    <td>
                        점수
                    </td>
                    <td>
                        {guildRankingInfo.guild_point} 점
                    </td>
                </tr>
                <tr>
                    <td>
                        참여 길드
                    </td>
                    <td>
                        {entireRankingInfo?.length} 길드
                    </td>
                </tr>
                <tr>
                    <td>
                        랭킹 정보
                    </td>
                    <td>
                        {guildRankingInfo.ranking == -1 && entireRankingInfo ? '참여 기록 없음' : 
                            <div>{guildRankingInfo.ranking} 위 [{Math.floor((guildRankingInfo.ranking/entireRankingInfo?.length)*100)} %] [{Nobless()} P]</div>}
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default GuildSlotRankingSingle
