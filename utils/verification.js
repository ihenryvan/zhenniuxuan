class verification{
	//规则
	#ruleList = []
	//策略
	#tactics = {
		notNull:this.#checkNotNull,
		phone:this.#checkPhone,
		email:this.#checkEmail
	}
	
	constructor(ruleList){
		this.#ruleList = ruleList
		this.#check()
	}
	
	
	#check(){
		
		for (var i = 0;i<this.#ruleList.length;i++) {
			let item =  this.#ruleList[i]
			let types = (item.type&&item.type.split("|"))
			//types为空直接跳过
			if(!types.length){
				continue
			}
			types.forEach(typeItem=>{
				this.#tactics[typeItem](item)
			})
		}
	}
	
	//检车是否为空
	#checkNotNull(item){
		if(!item.value){
			throw(item.msg)
		}
	}
	
	//验证手机号
	#checkPhone(item){
		if(!(/^1[3456789]\d{9}$/.test(item.value))){
			throw(item.msg)
		}
	}
	
	
	//验证邮箱
	#checkEmail(item){
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if(!reg.test(item.value)){
			throw(item.msg)
		}
	}
	
	
}

export default verification