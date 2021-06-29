
import {telegramSendMessage} from './teleWebhook.js'

let a=`wemef add{"title":"두찜_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/433569","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/f0748985aed6ff7c0e528816280eb24c.png"}
wemef add{"title":"오태식해바라기치킨_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/598597","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/2031dac2ed2785814d402736a8dff65f.png"}
wemef add{"title":"떡참_6월_화요일","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/1195026","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210503/f11dbb35ee64d90d915b064129dd4e24.gif"}
coupang delete{"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/ed1e/260e777e62ef72cbb8ce0bd788b8c14e35785f21840f44c810926c8db353.png"}
coupang delete{"img":"https://t1a.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/c277/ad15187de047a9e2f40ba630cc8efa361dff9c71254836ff92da40652e6f.png"}
wemef delete{"title":"두찜_6월","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/433569","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210527/d43cb97022a25eb0fa9cddeb58c1095f.png"}
wemef delete{"title":"떡참_6월","link":"cupping://doCommand?type=5&value1=https://www.wmpo.co.kr/events/1195026","img":"https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210527/a1c3d66a4992c1b621a3ef6227aac73b.gif"}`

while(a.includes('&')){
    a=a.replace('&',"||")
}
telegramSendMessage(a.toString())
