import * as React from "react"
import axios from 'axios'

import SearchWindow from "./search_window"
import CharacterSlotGuildResult from "./character_slot_guild_result"
import * as styles from "../components/search_guild.module.css"
import dayjs from "dayjs"

const SearchGuild = () => {
    const [inputText, setInputText] = React.useState('')
    const [searchGuild, setSearchGuild] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [selectWorld, setSelectWorld] = React.useState('')
    const [searchWorld, setSearchWorld] = React.useState('')
    const [oguildId, setOguildId] = React.useState(null)
    const [guildMemberName, setGuildMemberName] = React.useState([])
    const [guildMemberOcid, setGuildMemberOcid] = React.useState([])
    const [guildMemberBasicInfo, setGuildMemberBasicInfo] = React.useState([])
    const [guildMemberOriginInfo, setGuildMemberOriginInfo] = React.useState([])

    const [testGuildMember, setTestGuildMember] = React.useState([])
    const [testObj, setTestObj] = React.useState([])

    const [searchFail, setSearchFail] = React.useState(false)

    const getDate = () => {
        return dayjs().subtract(1, 'day').subtract(2, 'hour').format("YYYY-MM-DD")
    }

    /*
    1. getOguildId : 길드 guid 조회 -> guid [1] 
    2. getGuildBasicInfo : 길드 정보 조회 (guid필요) -> 길드원 이름 배열 [1]
    3. getGuildMemberOcid : 길드원 ocid조회 (길드원 이름 배열 필요) -> 길드원 ocid 배열 [n]
    4. 길드원 정보 조회 (길드원 ocid 필요) -> 길드원 기본 정보 [n] 
    5. 길드원 유니온 조회 (길드원 ocid 필요) -> 길드원 유니온 정보 [n]
    6. 길드원 본캐 ocid 조회 (길드원 유니온 정보 필요) -> 길드원 본캐 ocid [n]
    7. 길드원 본캐 정보 조회 (길드원 본캐 ocid 필요 -> 길드원 본캐 정보 [n]
    */

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
            //console.log("getGuildBasicInfo::Success")
            //setTestGuildMember(testGuildMember => [...testGuildMember,response.data.guild_member])
            //testGetOcid(response.data.guild_member)
            //setGuildMemberName(response.data.guild_member)

            //getGuildMemberOcid(response.data.guild_member)
            fukcingAPI(response.data.guild_member)
        }).catch(e=>{
            setSearchFail(true)
            //console.log('Error!')
            //console.log(e)
        })

        // names.map(async (elm)=>{
        //     let res1 = await axios.get(elm)
        //     let res2 = await axios.get(res1)
        // })

    }

    // const fuckingAPI = async (nameArr) => {
    //     const result = []
    //     const promise = nameArr.map(async (ele) => {
    //         const res = await axios.get();
    //         result.push(res)
    //     })
    //     await Promise.all(promise);

    //     return result;
    // }

    const fukcingAPI = async (nameArr) =>{
        const formatDate = getDate()
        for(let elm of nameArr){
            let flag = false
            let unionCharName
            let memberOcid = { data: { ocid:"Invalid" }}
            memberOcid = await axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+elm, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }}).catch(e=>{
                flag = true
            })
            if(memberOcid === undefined) memberOcid = { data: { ocid:"Invalid" }}
            const memberBasicInfo = await axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+memberOcid.data.ocid+`&date=`+formatDate, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }}).catch(e=>{
                flag = true
            })
            const memberUnionInfo = await axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/union?ocid=`+memberOcid.data.ocid+`&date=`+formatDate, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }}).catch(e=>{
                flag = true
            })
            if(!flag){
                memberUnionInfo.data.ranking.map(async (data)=>{
                    if(data.world_name === selectWorld) unionCharName = data.character_name
                })
            }
            let unionOcid = { data: { ocid:"Invalid" }}
            unionOcid = await axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+unionCharName, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }}).catch(e=>{
                flag = true
            })
            if(unionOcid === undefined) unionOcid = { data: { ocid:"Invalid" }}
            const unionBasicInfo = await axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+unionOcid.data.ocid+`&date=`+formatDate, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }}).catch(e=>{
                flag = true
            })
            
            if(!flag) {
                await setTimeout(() => {
                    //console.log(unionBasicInfo)
                }, 500); 
                await insertData(memberBasicInfo.data, unionBasicInfo.data)
            }

        }
        
        // nameArr.map(async (elm, idx)=>{
        //     let flag = false
        //     let unionCharName
        //     let memberOcid = { data: { ocid:"Invalid" }}
        //     memberOcid = await axios.get(
        //         `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+elm, 
        //         {headers: {
        //             "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        //     }}).catch(e=>{
        //         flag = true
        //     })
        //     //if(!flag) memberOcid.data.ocid = "Invalid"
        //     const memberBasicInfo = await axios.get(
        //         `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+memberOcid.data.ocid+`&date=`+formatDate, 
        //         {headers: {
        //             "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        //     }}).catch(e=>{
        //         flag = true
        //     })
        //     const memberUnionInfo = await axios.get(
        //         `${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/union?ocid=`+memberOcid.data.ocid+`&date=`+formatDate, 
        //         {headers: {
        //             "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        //     }}).catch(e=>{
        //         flag = true
        //     })
        //     if(!flag){
        //         memberUnionInfo.data.ranking.map(async (data)=>{
        //             if(data.world_name === selectWorld) unionCharName = data.character_name
        //         })
        //     }
        //     const unionOcid = await axios.get(
        //         `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+unionCharName, 
        //         {headers: {
        //             "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        //     }}).catch(e=>{
        //         flag = true
        //     })
        //     const unionBasicInfo = await axios.get(
        //         `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+unionOcid.data.ocid+`&date=`+formatDate, 
        //         {headers: {
        //             "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
        //     }}).catch(e=>{
        //         flag = true
        //     })

        //     if(!flag) console.log(unionBasicInfo)
            
        // })
    }

    const insertData = async (basicInfo, originInfo) => {
        setGuildMemberBasicInfo(guildMemberBasicInfo=>[...guildMemberBasicInfo, basicInfo])
        setGuildMemberOriginInfo(guildMemberOriginInfo=>[...guildMemberOriginInfo, originInfo])
    }

    const testGetOcid = (testMember) => {
        testMember.forEach(e=>{
            let tmp = { name: e }
            //console.log("testGetOcid"+e)
            axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+e, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY
            }}).then(response=>{
                tmp.ocid = response.data.ocid
                setTestObj(testObj => [...testObj, tmp])
            }).catch(e=>{
                //console.log('Error!')
                //console.log(e)
            })
        })
    }

    const getGuildMemberOcid = (guildMemberName) => {
        Promise.allSettled(
            guildMemberName.map((elm)=>
                axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+elm, 
                    {headers: {
                        "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
                )
        )
        ).then((res)=>{
            let foo = []
            res.forEach((result, idx)=>{
                let tmp = { index : idx }
                if(result.status === 'fulfilled'){ // Success
                    const url = new URL(result.value.config.url)
                    tmp.character_name = url.searchParams.get('character_name')
                    tmp.ocid = result.value.data.ocid
                }else{ // Failed
                    const url = new URL(result.reason.config.url)
                    tmp.character_name = url.searchParams.get('character_name')
                    tmp.ocid = "Invalid"
                }
                foo.push(tmp)
            })
            setGuildMemberOcid(foo)
            getGuildMemberBasicInfo(foo)
            getGuildMemberUnionInfo(foo)
        })
    }

    const getGuildMemberBasicInfo = (guildMemberOcid) => {
        const formatDate = getDate()
        Promise.allSettled(
            guildMemberOcid.map((elm)=>
                axios.get(`${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+elm.ocid+`&date=`+formatDate, 
                    {headers: {
                        "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
                )
        )).then((res)=>{
            const memberArr = res.map((elm, idx)=>{
                let tmp = {}
                if(elm.status === 'fulfilled'){ // Success
                    tmp = elm.value.data
                }else{ // Failed
                    tmp.character_name = guildMemberOcid[idx].character_name + " (기록 없음)"
                    tmp.world_name = selectWorld
                    tmp.character_class = "(기록 없음)"
                    tmp.character_guild_name = searchGuild
                    tmp.character_image = "./src/iamges/(기록 없음).png"
                }

                return tmp
            })
            setGuildMemberBasicInfo(memberArr)
        })
    }

    const getGuildMemberUnionInfo = (guildMemberOcid) => {
        const formatDate = getDate()
        Promise.allSettled(
            guildMemberOcid.map((elm)=>axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`ranking/union?ocid=`+elm.ocid+`&date=`+formatDate+`&world_name`+selectWorld, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
            ))
        ).then((res)=>{
            const originChar = res.map((elm, idx)=>{
                let tmp = {}
                if(elm.status === 'fulfilled'){ // Success
                    elm.value.data.ranking.map((data)=>{
                        if(data.world_name === selectWorld) tmp.character_name = data.character_name
                    })
                }else{ // Failed
                    tmp.character_name = "(기록 없음)"
                }
                return tmp
            })
            //console.log(originChar)
            getGuildMemberOriginOcid(originChar)
        })
    }

    const getGuildMemberOriginOcid = (guildMemberOriginName) => {
        Promise.allSettled(
            guildMemberOriginName.map((elm)=>axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`id?character_name=`+elm.character_name, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
            ))
        ).then((res)=>{
            res.map((elm, idx)=>{
                if(elm.status === 'fulfilled'){ // Success
                    guildMemberOriginName[idx].ocid = elm.value.data.ocid
                }else{ // Failed
                    guildMemberOriginName[idx].ocid = "Invalid"
                }
            })
            // guildMemberOriginName = { character_name, ocid }
            //console.log(guildMemberOriginName)
            getGuildMemberOriginInfo(guildMemberOriginName)
        })
    }

    const getGuildMemberOriginInfo = (guildMemberOriginOcid) => {
        const formatDate = getDate()
        Promise.allSettled(
            guildMemberOriginOcid.map((elm)=>axios.get(
                `${process.env.GATSBY_NEXON_API_BASE_URL}`+`character/basic?ocid=`+elm.ocid+`&date=`+formatDate, 
                {headers: {
                    "x-nxopen-api-key":process.env.GATSBY_NEXON_API_KEY}}
            ))
        ).then((res)=>{
            const memberArr = res.map((elm, idx)=>{
                let tmp = {}
                if(elm.status === 'fulfilled'){ // Success
                    tmp = elm.value.data
                }else{ // Failed
                    tmp.character_name = "(기록 없음)"
                    tmp.world_name = selectWorld
                    tmp.character_class = "(기록 없음)"
                    tmp.character_guild_name = searchGuild
                    tmp.character_image = "../images/(기록 없음).png"
                }

                return tmp
            })
            setGuildMemberOriginInfo(memberArr)
            setVisible(true)
        })
    }

    // React.useEffect(()=>{
    //     if(guildMemberBasicInfo){
    //         console.log(guildMemberBasicInfo)
    //     }
    // },[guildMemberBasicInfo])

    const onClickSearch = () => {
        setVisible(true)
        setSearchFail(false)
        setGuildMemberOcid([])
        setGuildMemberBasicInfo([])
        setGuildMemberOriginInfo([])
        //console.log("BtnInput : "+selectWorld +", "+inputText)
        setSearchGuild(inputText)
        setSearchWorld(selectWorld)
        getOguildId(inputText)
    
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
                selectWorld={selectWorld}
                setSelectWorld={setSelectWorld}
            />
            {visible&&
                <div>
                    <div  className={styles.output}>
                    {`[`}{searchWorld}{`]`}월드의 길드 {`[`}{searchGuild}{`]`}의 조회 결과입니다.<br/>
                        접속 기록이 존재하지 않는 캐릭터는 검색되지 않습니다.<br/><br/>
                        {searchFail? `검색 결과가 존재하지 않거나, 입력이 올바르지 않습니다.` : ``}<br/><br/>

                    </div>

                    {guildMemberBasicInfo? 
                        guildMemberBasicInfo.map((elm, idx)=>(
                            <CharacterSlotGuildResult key={elm} characterInfoGuild={elm} characterInfoOrigin={guildMemberOriginInfo[idx]}/>
                    )): 
                    '로딩 중'}
                    <br/><br/>
                </div>
            }
        </div>
    )
}

export default SearchGuild
