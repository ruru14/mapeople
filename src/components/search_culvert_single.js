import * as React from "react"
import axios from 'axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import GuildSlotRankingSingle from "./guild_slot_ranking_single"
import SearchWindow from "./search_window"
import * as styles from "../components/search_culvert_single.module.css"
import dayjs from "dayjs";

const SearchCulvertSingle = () => {
    const [inputText, setInputText] = React.useState('')
    const [searchGuild, setSearchGuild] = React.useState('')
    const [searchWorld, setSearchWorld] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [oguildId, setOguildId] = React.useState(null)
    //const worldList = [`스카니아`, `베라`, `루나`, `제니스`, `크로아`, `유니온`, `엘리시움`, `이노시스`, `레드`, `오로라`, `아케인`, `노바`, `리부트`, `리부트2`, `버닝`, `버닝2`, `버닝3`]
    const [selectWorld, setSelectWorld] = React.useState('')
    const [culvertRankingList, setCulvertRankingList] = React.useState([])
    const [entireGuildRanking, setEntireGuildRanking] = React.useState({})
    
    const [searchFail, setSearchFail] = React.useState(false)

    // API start date = 2023-12-21
    // Return first monday = 2023-12-25
    // New start date = 2024-05-23
    const getStartDate = () => {
        //return dayjs('2023-12-25')
        return dayjs('2024-06-06')
    }
    
    const getDate = () => {
        return dayjs().subtract(1, 'day').subtract(2, 'hour').format("YYYY-MM-DD")
    }

    const getOguildId = (guildName) => {
        axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`guild/id?guild_name=`+guildName+`&world_name=`+selectWorld, 
            {headers: {
                "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}).then(response=>{
            //console.log("getOguildId::Success : "+response.data.oguild_id)
            setOguildId(response.data.oguild_id)
            getGuildBasicInfo(response.data.oguild_id)
        }).catch(error=>{
            setSearchFail(true)
            //console.log('Error!')
        })
    }

    const getGuildBasicInfo = (oguildId) => {
        const formatDate = getDate()
        axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`guild/basic?oguild_id=`+oguildId+`&date=`+formatDate, 
            {headers: {
                "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}).then(response=>{
            
        }).catch(e=>{
            setSearchFail(true)
        })
    }

    const getGuildCulvertRanking = async () => {
        var startDate = getStartDate()
        const curDate = getDate()
        const dayArr = []

        /*
        길드 시스템 개편 날짜와 동기화가 되지 않음
        개편 첫 주차는 목요일이 아닌 수요일로 값을 받아와야 정상적임
        API 오류로 추정
        */
        var addStartDate = dayjs('2024-05-29').format("YYYY-MM-DD")
        dayArr.push(addStartDate)
        do {
            // 날짜 정리
            const dateString = startDate.format("YYYY-MM-DD")
            dayArr.push(dateString)
            startDate = startDate.add(7, 'day')
        } while(dayjs(startDate) <= dayjs(curDate))

        // dayArr.map((elm,idx)=>{
        //     console.log(elm)
        // })

        Promise.allSettled(
            dayArr.map((elm)=>
                axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/guild?ranking_type=`+`2`+`&date=`+elm+`&guild_name=`+inputText+`&world_name=`+selectWorld, 
                        {headers: {
                            "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}))).then((res)=>{
            let foo = []
            res.map((elm, idx)=>{
                const bar = "asdf"
                const guild_result = {}
                const tmpDate = dayjs(dayArr[idx])
                getAllGuildRanking(dayArr[idx])
                /*
                개편 첫 주차에 대한 예외처리
                */
                if(idx == 0){
                    guild_result.calc_date_start = tmpDate.subtract(6, 'day').format("YYYY-MM-DD")
                    guild_result.calc_date_end = tmpDate.subtract(0, 'day').format("YYYY-MM-DD")
                }else{
                    guild_result.calc_date_start = tmpDate.subtract(7, 'day').format("YYYY-MM-DD")
                    guild_result.calc_date_end = tmpDate.subtract(1, 'day').format("YYYY-MM-DD")
                }
                guild_result.date = dayArr[idx]
                guild_result.guild_point = elm.value.data.ranking[0]? elm.value.data.ranking[0].guild_point : 0
                guild_result.ranking = elm.value.data.ranking[0]? elm.value.data.ranking[0].ranking : -1
                guild_result[bar] = "bbbb"
                foo.push(guild_result)
                //console.log(elm.value.data.ranking[0].date)
            })
            setCulvertRankingList(foo)
        }).finally(()=>{
            console.log("Finish!")
        })
    }

    const getAllGuildRanking = async (dateString) => {
        console.log(dateString)
        let cnt = 1
        let rankingList = []
        let result = {}
        do{
            result = await axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/guild?ranking_type=`+`2`+`&date=`+dateString+`&world_name=`+selectWorld+`&page=`+cnt++, 
                    {headers: {
                        "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }})
            rankingList.push(...result.data.ranking)
        } while(result.data.ranking.length != 0)
        
        setEntireGuildRanking(entireGuildRanking => ({...entireGuildRanking, [dateString]:rankingList}))
        //console.log(entireGuildRanking)
        //result.push(...tmp.data.ranking)
        //console.log(result.length)
        //console.log(result)

        // while(result.length < 200) {
        //     result = Promise.get(`api call?page=`+cnt++)
        // }
        /* ... */
    }

    React.useEffect(()=>{
        //console.log(entireGuildRanking)
    },[entireGuildRanking])

    const onClickSearch = () => {
        setVisible(true)
        setSearchFail(false)
        setCulvertRankingList([])
        // setGuildMemberOcid([])
        // setGuildMemberBasicInfo([])
        // setGuildMemberOriginInfo([])
        // //console.log("BtnInput : "+selectWorld +", "+inputText)
        setSearchGuild(inputText)
        setSearchWorld(selectWorld)
        // getOguildId(inputText, selectWorld)
        getGuildCulvertRanking()
        setInputText("")
    }

    const onChange = (e) => {
        setInputText(e.target.value)
    }
    
    return(
        <div>
            <SearchWindow 
                placeholder={"길드"} 
                onChange={onChange} 
                value={inputText}
                onClick={onClickSearch}
                selectVisible={true}
                //selectList={worldList}
                selectWorld={selectWorld}
                setSelectWorld={setSelectWorld}
            />
            {/* <div className={styles.output}>
            2024. 05. 23 길드 개편 정보가 반영되었습니다.<br/>
            </div> */}
            {visible&&
                <div>
                    <div className={styles.output}>
                    {`[`}{searchWorld}{`]`}월드의 길드 {`[`}{searchGuild}{`]`}의 수로 점수 조회 결과입니다.<br/>
                    <br/>
                    </div>
                    {culvertRankingList.map((elm, idx)=>(
                        <div>
                            <GuildSlotRankingSingle guildRankingInfo={elm} entireRankingInfo={entireGuildRanking[elm.date]}></GuildSlotRankingSingle>
                            {culvertRankingList.length-1 != idx ? <hr/> : ''}
                        </div>
                        //<div className={styles.output}>{elm.calc_date_start} ~ {elm.calc_date_end} : {elm.guild_point} 점</div>
                    ))}
                    
                    <br/><br/>
                </div>
            }
        </div>
    )
}

export default SearchCulvertSingle
