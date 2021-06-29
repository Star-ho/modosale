

let a="wemef add"+JSON.stringify({"title":"두찜_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/433569","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/f0748985aed6ff7c0e528816280eb24c.png"})+'\n'

a+="wemef add"+JSON.stringify({"title":"오태식해바라기치킨_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/598597","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/2031dac2ed2785814d402736a8dff65f.png"})

a+="coupang delete"+JSON.stringify({"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/ed1e/260e777e62ef72cbb8ce0bd788b8c14e35785f21840f44c810926c8db353.png"})+'\n'

a+="wemef add"+JSON.stringify({"title":"오태식해바라기치킨_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/598597","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/2031dac2ed2785814d402736a8dff65f.png"})

a+="coupang delete"+JSON.stringify({"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/ed1e/260e777e62ef72cbb8ce0bd788b8c14e35785f21840f44c810926c8db353.png"})+'\n'

a+="wemef add"+JSON.stringify({"title":"오태식해바라기치킨_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/598597","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/2031dac2ed2785814d402736a8dff65f.png"})

a+="coupang delete"+JSON.stringify({"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/ed1e/260e777e62ef72cbb8ce0bd788b8c14e35785f21840f44c810926c8db353.png"})+'\n'

a+="wemef add"+JSON.stringify({"title":"오태식해바라기치킨_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/598597","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/2031dac2ed2785814d402736a8dff65f.png"})

a+="coupang delete"+JSON.stringify({"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/ed1e/260e777e62ef72cbb8ce0bd788b8c14e35785f21840f44c810926c8db353.png"})+'\n'

a+="wemef add"+JSON.stringify({"title":"오태식해바라기치킨_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/598597","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/2031dac2ed2785814d402736a8dff65f.png"})

a+="coupang delete"+JSON.stringify({"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/ed1e/260e777e62ef72cbb8ce0bd788b8c14e35785f21840f44c810926c8db353.png"})+'\n'

if(a.length>0){
    while(a.includes('&')){
        a=a.replace('&',"||")
    }
    console.log(a)
}