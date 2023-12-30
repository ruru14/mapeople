import * as React from "react"
import axios from 'axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CharacterSlotBasic from "./character_slot_basic"
import SearchWindow from "./search_window"
import * as styles from "../components/search_single.module.css"
import dayjs from "dayjs";

const SearchSingle = () => {
    const [inputText, setInputText] = React.useState('')
    const [searchText, setSearchText] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [searchSuccess, setSearchSuccess] = React.useState(false)
    const [isSingleWorld, setSingleWorld] = React.useState(false)

    const [ocid, setOcid] = React.useState()
    const [unionDetailInfo, setUnionDetailInfo] = React.useState([])

    const getDate = () => {
        return dayjs().subtract(1, 'day').subtract(2, 'hour').format("YYYY-MM-DD")
    }
    
    const getOcid = (charName) => {
        console.log(`${process.env.GATSBY_NEXON_API_BASE_URL}`)
        axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+charName, 
            {headers: {
                "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}).then(response=>{
            //console.log("getOcid::Success")
            setOcid(response.data.ocid)
            getBasicInfo(response.data.ocid)
            getUnionInfo(response.data.ocid)
        }).catch(error=>{
            //console.log('Error!')
            setSearchSuccess(false)
        })
    }

    const [basicInfo, setBasicInfo] = React.useState(null)
    const [unionInfo, setUnionInfo] = React.useState(null)
    
    const getUnionInfo = (charOcid) => {
        const formatDate = getDate()
        axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/union?ocid=`+charOcid+`&date=`+formatDate, 
            {headers: {
                "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}).then(response=>{
            //console.log("getUnionInfo::Success")
            setUnionInfo(response.data)
            //getUnionDetailInfo(response.data)
            response.data.ranking.map((elm)=>{
                //console.log(elm.character_name)
                getUnionDetailInfoSingle(elm)
            })
        }).catch(e=>{
            //console.log('Error!')
            //console.log(e)
        })
    }

    const getUnionDetailInfoSingle = (unionInfo) =>{
        const formatDate = getDate()
        axios.get(
            `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+unionInfo.character_name, 
            {headers: {
                "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
        ).then((res)=>{
            axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+res.data.ocid+`&date=`+formatDate, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
            ).then((res2)=>{
                setUnionDetailInfo(unionDetailInfo=>[...unionDetailInfo, res2.data])
            }).catch(e=>{
                
            })
        }).catch(e=>{
            const tmp = {
                character_name: unionInfo.character_name,
                character_image: "./src/iamges/(기록 없음).png",
                world_name: unionInfo.world_name,
                character_class: unionInfo.sub_class_name,
                character_level: "(기록 없음)",
                character_guild_name: "(기록 없음)",
            }
            setUnionDetailInfo(unionDetailInfo=>[...unionDetailInfo, tmp])
        }).finally(()=>{
            setSearchSuccess(true)
        })

    }

    const getUnionDetailInfo = (unionInfoArr) => {
        const formatDate = getDate()
        axios.all(
            unionInfoArr.ranking.map((elm)=>axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+elm.character_name, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
            ))
        ).then((res)=>{
            axios.all(
                res.map((elm)=>axios.get(
                    `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+elm.data.ocid+`&date=`+formatDate, 
                    {headers: {
                        "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
                ))
            ).then((res2)=>{
                setUnionDetailInfo(res2)
                setSearchSuccess(true)
            }).catch(e=>{

            })
        }).catch(e=>{

        })
    }

    const getBasicInfo = (charOcid) => {
        const formatDate = getDate()
        axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+charOcid+`&date=`+formatDate, 
            {headers: {
                "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        }}).then(response=>{
            //console.log("getBasicInfo::Success")
            setBasicInfo(response.data)
        }).catch(e=>{
            //console.log('Error!')
            //console.log(e)
        })
    }

    // React.useEffect(()=>{
    //     if(ocid){
    //         console.log(ocid)
    //         getBasicInfo(ocid)
    //         getUnionInfo(ocid)
    //     }
    // },[ocid])

    // React.useEffect(()=>{
    //     if(unionInfo){
    //         getUnionDetailInfo(unionInfo)
    //     }
    // },[unionInfo])

    const onClickSearch = () => {
        setVisible(true)

        setUnionDetailInfo([])
        setSearchText(inputText)
        getOcid(inputText)
        setInputText("")
    }

    const onChange = (e) => {
        setInputText(e.target.value)
    }
    const onChangeChk = (e) => {
        setSingleWorld(!isSingleWorld)
    }
    
    return(
        <div>
            <SearchWindow 
                placeholder={"아이디"} 
                onChange={onChange} 
                value={inputText}
                onClick={onClickSearch}
            />
            {visible&&
                <div>
                    <div className={styles.output}>{`[`}{searchText}{`]`}님의 조회 결과입니다.<br/><br/></div>
                    {searchSuccess&&
                    <div>
                        <CharacterSlotBasic characterInfo={basicInfo}/>
                        <div className={styles.output}>{`[`}{searchText}{`]`}님의 유니온 조회 결과입니다.<br/><br/></div>
                        {unionDetailInfo? 
                            unionDetailInfo.map((elm, idx)=>(
                                <CharacterSlotBasic key={elm} characterInfo={elm}/>
                            )): 
                            '로딩 중'}
                    </div>
                    }
                    <br/><br/>
                </div>
            }
        </div>
    )
}

export default SearchSingle
