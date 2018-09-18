const paths = [
  "/product",
  "/member",
  "/appindex",
  "/httpRequest",
  "/coupon",
  '/commoninvoice',
  "/scenicProduct",
  "/excursions",
  "/order",
  "/pay",
  "/visa",
  "/appProduct",
  "/cruise",
  "/index",
  "/collection",
  "/touristinfo",
  "/touristinfoInquiry",
  "/touristinfoOperation",
  '/comaddress',
  '/customer',
  '/customTourOperation',
  '/customTourInquiry',
  '/visaProduct',
  '/productSolr',
  '/FastDFS',
  '/captcha',
  '/browsingHistoryInquiry',
  '/appDestination',
  '/browsingHistoryOperation',
  '/userCommentsOperation',
  '/userComments',
  '/touristinfoOperation',
  '/orderInquiry',
  '/ykly-toc-web',
  '/supplierRecruitment',
  '/appfromCmsSysInfo',
  '/appHotDestination',
  '/flightOrderInquiry',
  '/c',
  '/hotelProductInfo',
  '/orderOperation',
  '/hotelOrderRefund',
  '/trainQuery',
  '/train',
  '/confirmAndRefundBusiness',
  '/userIntegral',
  '/memberCommonAddress'
]

const useStrategy = {
   target: "http://testm.yktour.com.cn",
   changeOrigin: true,
}

const proxyTableObj = {}

paths.forEach(path => {
  proxyTableObj[path] = Object.assign({}, useStrategy)
})

module.exports = proxyTableObj;
