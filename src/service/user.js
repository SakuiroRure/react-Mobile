class User {
    info = {
        loginName: "admin_super",
        memPhoto: "",
        mobile: "",
        userId: "",
        yingKeCode: "",
        tipes: ["意向客户", "自由行爱好者", "意向客户"],
        userName:'',
        userPhone:'',
        userWx:'',
        userMail:'',
        userPosition:'',
        userAddress:'',
        userWelcome:'',
        introduceImgList:['','',''],
        introduceText:'',
        productList:[],
        speechList:[],
    }
    setUserInfo(data) {         //设置与更新UserInfo
        let local = localStorage.getItem('user')
        this.info = { ...(local?JSON.parse(local):this.info), ...data}  
        localStorage.setItem("user",JSON.stringify(this.info))
    }
    getUserInfo(data) {         //获取UserInfo
        let local = localStorage.getItem('user')
        this.info = { ...(local?JSON.parse(local):this.info), ...data} 
        return JSON.parse(localStorage.getItem("user"))
    }
    deleteInfo(key){            //清除UserInfo
        delete this.info[key]
    }
}
export const UserInfo = new User();
