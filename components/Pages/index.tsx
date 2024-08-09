import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", paddingRight:"10%" }}>
      <br-x />
      <Window title={"tether price"} style={{ minHeight: 376, margin: 10, width: "calc(90% - 20px)", opacity:0.8}}>
        <pre style={{opacity:2, backgroundImage: "url(../public/photo_2024-08-08_19-25-58.jpg)"}}>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", borderRadius: "10px 10px 0 0", textAlign: "left", fontSize: 20, float: "left", padding: "7px", color: "white" }}>
            price: {(props.price as number)}$
            <img src='https://cryptologos.cc/logos/tether-usdt-logo.svg?v=032' style={{float: "right", width: "50px",}}></img>
          </div>
          <br/>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", textAlign: "left", fontSize: 20, float: "left", padding: "7px", color: "white"}}>
          Daily changes: {(props.difDay as number)}%
          </div>
          <br/>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", textAlign: "left", fontSize: 20, float: "left", padding: "7px", color: "white"}}>
          last day price : {(props.dayPrice as number)}$
          </div>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", textAlign: "left", fontSize: 20, float: "left", padding: "7px", color: "white"}}>
          weekly changes : {(props.difWeek as number)}%
          </div>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", textAlign: "left", fontSize: 20, float: "left", padding: "7px", color: "white"}}>
          last week price: {(props.weekPrice as number)}$
          </div>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", textAlign: "left", fontSize: 20, float: "left", padding: "7px", color: "white"}}>
          monthly changes: {(props.difMonth as number)}%
          </div>
          <div style={{ width: "100%", height: 50, backgroundColor: "#4169e1", textAlign: "left", fontSize: 20, float: "left", padding: "7px", borderRadius:"0 0 10px 10px", color: "white" }}>
          last month price: {(props.monthPrice as number)}$
          </div>
        </pre>
      </Window>
      <video autoPlay loop style={{width:"88.5%" ,height:"40%", paddingRight:"1%", borderRadius:"25px", opacity: 0.80 }}><source src='/boo.mp4' type='video/mp4'></source></video>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()
  let p = data.data.currencies.USDT.price
  let dayDif = data.data.currencies.USDT.diff24d
  let dayP = data.data.currencies.USDT.last24h
  let weekDif = data.data.currencies.USDT.diff7d
  let weekP = data.data.currencies.USDT.last7d
  let mounthDif = data.data.currencies.USDT.diff30d
  let monthP = data.data.currencies.USDT.last30d

  console.log("price:", p)

  return {
    props: {
      data: global.QSON.stringify({
        price: p,
        difDay: dayDif,
        dayPrice: dayP,
        difWeek: weekDif,
        weekPrice: weekP,
        difMonth: mounthDif,
        monthPrice: monthP,
        session,
        // nlangs,
      })
    },
  }
}