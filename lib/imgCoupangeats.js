//npx babel-node --presets @babel/env lib/imgCoupangeats.js
//끝
// (async()=>
// {
//   let data=await getCoupangData()
//   console.log(data)
//   console.log(data.length)
// })()
export async function getCoupangData(){
  const fetch = require('node-fetch');
  const url='https://api.coupangeats.com/endpoint/store.get_gateway?nextToken=&badgeFilters='
  let res=await fetch(url,{
      headers:{
          "X-EATS-APP-VERSION": "1.3.6",
          "X-EATS-PCID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
          "X-EATS-DEVICE-ID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
          'X-EATS-OS-TYPE': 'ANDROID',
          "User-Agent": "Android-Coupang-Eats-Customer/1.3.6",
          "X-EATS-LOCATION": '{"addressId":0,"latitude":37.551555,"longitude":126.9893033,"regionId":10,"siDo":"%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C","siGunGu":"%EC%A4%91%EA%B5%AC"}',
          "X-EATS-ACCESS-TOKEN": "G20c19uIYUFO9L3RVdQQ0lqHzJVKeTt5BuyDI5fku9w2jXSlykHwSNswOXEpPpd362u7NDwTozpQC-E2mftqDYX9HVwAd7NTydd7mPObxqdBGatTvC3CyvI8HRpUF_N8aBMoZbIw1S-fq9HL5d7cpOG5Ei6zuoAN-8oevZZd50hhI47O66RvBcDVQJS3bpYSGFp2oaxvNuwnD2vucVLy-Z4uokDv8EdEP-8gaTn7dJCK6xQCP_3bK1EWiSxJKDOlLydgGtGnrSh-V_NWyVfub-q3qy6KKICEA97dqr5dJ4l88mVSJG00SLFI4f1-6XKgCG1XB4CJ9rKeFI8wgg1vnFOyTYOaesFV4DDINDSVjEXMaDywmq1ahm_GSRV9Kh3jVqxislmXj_ojm1OY26Z_oSc5Sphr-j3AcBjnnqxLkbUGUVl2IJNKR8Zk8ZT34ATKUErOtObEJF75yzaVXAkzBsFFrArd2xBIfgeAK_SW-f5dRSsGYwdOxrtbDpTrpNF6bITnKQjcCHMJ-WbI9AF0vdv1qctAfpEGv0fn8j4PkfIekORiaqlgtQJSN7oSmFXxGriGu8pERGdWzTiWS7pVGaxvK3NyukZsc6YQ0HaoqbZrtnKYHV2OTSPJVv0Jo6dNm1b9PHrQ5wU5q0MioHSSENLgCn8CPa_hVO2PIwmsNiNAChPSLSFOvWVum7KvL_ja73Bppf9pRRIxCDRThbp_LHXQP6Kvm_dbQ-vfz9I0BdAf8YHwSKfcxEV1r4-UypOT5rnrIkJx_uQktaicIMSvKRKYoQTlFNv2mLmq1eRa3cC06Ivr68G2nYkzwCkfVbuzvzpUYRFHT4PCe1Op_D7tE9s70ue0coWqCjk46WCWGwfGGM7cqSseDExdxBjPsIibnhXvhrI9cgAOMXJVk6qgbxoEG1h4fazxAJ_7DpkqQmQpOAf14ZD0oyQG_HxmnElDj-IMU8YGAZuaGufJsUKnFSDyQdRx0eQYLmUnehSPBKpah5-9g2Yssw3oNRv3K4eqzewRP7IG_W4Rw3eVaZh-fTMZ9pis0-aXQ5qxMnWQYACBnu_MFQa4L_A9HNX3ozyaAb-mnVXOIOCQ_3FbRoNu71uHd8ZLkIFsr9A4uq52L5lv_dj8w3ZznKQBjw9kdVYRyxhs2pFbDpxDfqRUyhsYDoH0xaHVJ5H4I7xVNBaMjFAzBq5Wkqu3dmj32RSbkY7uivL_66uPMsnwCZ5KDGAMkT_ETDa32qTDm77WTBMcP0OHWPlYuzIGKM2UWZnHCyr8NG7BBM4DbxrOAgSdN1G8BgoFDOlAG5yQ5l0qfzwoDBMKH3FTtmhMa0LBeihoynUHZjLErtLxC_ayb36kKZFAxOrhkW7rd7Oj4MQZDOCzJC1XPaYtdTwken1AoB0bmPk2a4gDBPqjlyXf1sqwNaW2DqX1G_tbDPScozZRR_ij2AqdPi2Sv4efqL42Lwp8tOVKBXW6FqcO172JYCySO5-AnXuH-xr81m6Rf6TKXlWb-XiYt3tsGvPTC75pHjwPI1CO7GMyh_O9BCKpwOffT0eRvhyc6Ooba7gxx8gG9fHkPyasus4G3MQCaRPofmtWGmjq7sufypPeRVRyjcdJCwcZM7314EzG2xcvs_EvC6ILAOXqDSihGeBo7cBBwJ-fBNlyDwOyIxx7_eCuFScRthBzbe7CJw3ISp9KydyRCWmH2qGNvCoUda_f7cIOXQrBwnWJ07xxm8qsi0YyE1Qwh5j1ruo="
      }
  })
  
  res=(await res.json()).data.entityList[0].entity.data.list.map(v=>{
    return {img:v.imagePath,scheme:'coupang'+v.scheme,id:v.id,expireDate:v.expireationDateText}
  })
  //{이미지경로, URIscheme, id, eocumentKey(?), expireationDateText}
  // console.log(res)
  return res
}

// (async()=>{
//   let data=await getCoupangData()
//   console.log(data)
// })()