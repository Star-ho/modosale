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
          "X-EATS-ACCESS-TOKEN": "9845tgP2nXBChG6VJOb7CK6E5k2Z5vS5eHw1rGMQoNXnzDn-YNXlEyvYB9OrizFW4Aw4pgogb4T6GJh1u6It6EE1XwQ-UR80kwjH-ddZilizZgeIoJc6oO_f9uU1IOkaOthRwujrUtIM8_urE2XGslSY4ewKl7wX26m-iAHXi3bL2LmlgREls8LraFaENCgpkBzuPhiKnPeWbQCddpdoH2cg8Db47tM5llj8-F4vAqUAYFwTlMxZ_6nlZSHqDDAI9jU6RFPOnVZrZkB1duo0Yfai0Oa9OoJiyemIHTs1y38MRRsZvEGqOxlFy0C6Mc4iSiDKhmfBlSFLiQwYsHLq6B-TYX0Osu-SHcBq9sr9SyOHXzzKt38F9-Zbqt8c1tR-i5y6KX2aYOKOCGE0JwJTqgTgNHPV3znv9-oD87iqgxkTIQCrErNvOywPgvOEVh3qiEylAplk74vQnnMA4Jr_dMWrOaxemPZyPxQA5BCIDzMuKSzoVgRW-dRMYxTvaMeaMkCk9JDD6yFQluF0gZsDOX9lCZ7IEG1x2gYXcLHMg8fWNYtTFBGJ0TBsl_4x3LrI2LXJ3cv9iS4EoXp2SKrUxA9BcNtt8YajcXriWYrJaGRAMQbnlYm3iA3BFqtkEoZ0CEpNA67j9fkKQ5gEha00RcYNEe7e4xrFfz2uiCX5YH_jM8-Ey1ugBm84M8FO871OOIbv_wGW3lWHTptmhG5phEnZ7lxIs1tUUXcjYXDFzBjZQ8aU8PXR0zKkLqyKEIu-AwesORKr5o7ru1Vgl0mT8_AAmWrXWMOl-dVKVGMeYB1Yye9kJd4-h0_OSfIOG2fVlPFjS8I_MsrWd0TnfdUEZ7FrVKoNqzGukjdvDg3f91y9gxqOWfM53kCi6lso_B5w8UvNsLRXECjtHFFBPDHq0k2mtKka5uxEBpYUVbQZVLro5E5i2BRd7RPUE2oY29--b5tjdiYN9URGVVx1osRYKJAOtj3Eqg5hoY588YVQWxPbcGy2RhKxeWQ-ucChShqaMFwk8qwrc-_dQRcXBCgMs1IOEFYKAfjh_pvMJEtRSEgz2ylS20cgVGw6Q2O3OJFawqpNBoPeScr2ZOdG8U6lQhem0DYD5a-AjzVg-GRyrZ7vP0oV1blzF5uYif3a4OXXHJW7WwMZeDQb_TrBbfvblohM5HN26sW_FROa-urNBMFgea0obSH6ywzj8SbjPxesfRRNQqM7Ws_o9HCiLFd4RZ2LTPa9Z1OvfQzXvusPu4qX26A9r3Wthnmfgl9WafKlaVZen-jvlE95JQBMcgeV3Y1d2PiCWEUglHw4xcLVmWYAq0-BzQCUExCG-F7farPRh9eTAaaIXSeE7feMInscmYEP6P3XSQVaez7_OStGvjG1DYcNcBXoRNLDaUTaFeaQ_iqzM3jhEAHo3e_defhnBNOM_0SueDfKGvJ5ytIcXP7wteYk5lvHIW9uiCvcf4xvV5GiZTS5lOuM41_cqJYpG_TLxwxSB2r7pPw5MtH65xlhwjgEmIieg5YDFOFidwBJgHJXRJBNlYj_3HpzUIp-eMtO4oIiF6o0jW-zYq5KIXSDCV-94jdqqUzfr8Hiidx-edLZDPk8ST6vZC-F-aHQStowhOTzmC6Xjd9-gEvpUuqajghH8PK442i_QXMZ6mCIv5oTSGI3K58kUxqCWaRGMW6TKz-khaNJ38FM4YBVFajbjWU7Ctr9k_AolXxLeSxQTVUXMzdHOiq6-crAe6AfiTg="
      }
  })
  res=(await res.json()).data.entityList[0].entity.data.list.map(v=>{
    return {img:v.imagePath,scheme:'coupang'+v.scheme,id:v.id,expireDate:v.expireationDateText}
  })
  //{이미지경로, URIscheme, id, eocumentKey(?), expireationDateText}
  // console.log(res)
  return res
}

export async function getCoupangMonthlyData(){
  const fetch = require('node-fetch');
  const url='https://api.coupangeats.com/endpoint/store.get_gateway?nextToken=&badgeFilters='
  let res=await fetch(url,{
      headers:{
          "X-EATS-APP-VERSION": "1.2.21",
          "X-EATS-PCID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
          "X-EATS-DEVICE-ID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
          'X-EATS-OS-TYPE': 'ANDROID'

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