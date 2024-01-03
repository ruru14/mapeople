import * as React from "react"
import axios from 'axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CharacterSlotBasic from "./character_slot_basic"
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
    
    const [searchFail, setSearchFail] = React.useState(false)

    // API start date = 2023-12-21
    // Return first monday = 2023-12-25
    const getStartDate = () => {
        return dayjs('2023-12-25')
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

    const getGuildCulvertRanking = () => {
        var startDate = getStartDate()
        const curDate = getDate()
        const dayArr = []
        do {
            // 날짜 정리
            const dateString = startDate.format("YYYY-MM-DD")
            dayArr.push(dateString)
            startDate = startDate.add(7, 'day')
        } while(dayjs(startDate) <= dayjs(curDate))

        dayArr.map((elm,idx)=>{
            console.log(elm)
        })
        
        Promise.allSettled(
            dayArr.map((elm)=>
                axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/guild?ranking_type=`+`2`+`&date=`+elm+`&guild_name=`+inputText, 
                        {headers: {
                            "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}))).then((res)=>{
            let foo = []
            res.map((elm, idx)=>{
                //console.log(elm)
                const guild_result = {}
                const tmpDate = dayjs(dayArr[idx])
                guild_result.date = tmpDate
                guild_result.calc_date_start = tmpDate.subtract(7, 'day').format("YYYY-MM-DD")
                guild_result.calc_date_end = tmpDate.subtract(1, 'day').format("YYYY-MM-DD")
                guild_result.guild_point = elm.value.data.ranking[0].guild_point
                foo.push(guild_result)
            })
            setCulvertRankingList(foo)
        }).finally(()=>{
            console.log("Finish!")
        })
    }

    // React.useEffect(()=>{
    //     if(culvertRankingList){
    //         setCulvertRankingList(culvertRankingList.sort((a, b)=>{
    //             return a.date.diff(b.date)
    //         }))
    //     }
    // },[culvertRankingList])

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
            {visible&&
                <div>
                    <div className={styles.output}>
                    {`[`}{searchWorld}{`]`}월드의 길드 {`[`}{searchGuild}{`]`}의 수로 점수 조회 결과입니다.<br/><br/>
                    </div>
                    {culvertRankingList.map((elm, idx)=>(
                        <div className={styles.output}>{elm.calc_date_start} ~ {elm.calc_date_end} : {elm.guild_point} 점</div>
                    ))}
                    
                    <br/><br/>
                </div>
            }
        </div>
    )
}

export default SearchCulvertSingle
