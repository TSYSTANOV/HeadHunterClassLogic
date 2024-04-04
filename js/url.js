
class URL_comp{
    addSearchParams(obj){
      const availableParams = []
      const urlData = new URL(location);
      Object.keys(obj).forEach((item)=>{
        if(urlData.searchParams.has(item)){
          urlData.searchParams.set(item, obj[item]);
        }else{
          urlData.searchParams.append(item, obj[item]);
        }
        availableParams.push(item)
      })
      availableParams.push('location')
      if(Object.keys(obj).length !== urlData.searchParams.size){
        this.updateSearchParams(availableParams, urlData)
      }else{
        history.pushState(null,null,urlData)
      }
    }
    updateSearchParams(availableParams, urlDataElem){
      let nonAvailableParams = []
      const urlData = urlDataElem ? urlDataElem : new URL(location);
      Array.from(urlData.searchParams).forEach((el)=>{
          if(!availableParams.includes(el[0])){
            nonAvailableParams.push(el[0])
          }
      })
      nonAvailableParams.forEach((el)=>{
        urlData.searchParams.delete(el)
      })
      history.pushState(null,null,urlData)
    }
    removeSearchParams(){
      const urlData = new URL(location);
      const local = urlData.searchParams.get('location')
      urlData.search = ''
      urlData.searchParams.append('location', local)
      history.pushState(null,null,urlData)
    }
    getSearhParams(formElem){
      const urlData = new URL(location);
      const objData = Array.from(urlData.searchParams).reduce((acc,el)=>{
        if(el[0] !== 'location'){
          acc[el[0] === 'employment' ? 'type': el[0]] = el[1].split(',')
        }
        return acc
      },{})
      let paramsOnPage = false

      for(let key in objData){

        for(let i = 0; i < formElem[key].length;i++){

          if(objData[key].includes(formElem[key][i].value)){
            paramsOnPage = true
            formElem[key][i].checked = true
          }

        }

      }
      return paramsOnPage
    }
}

const URL_component = new URL_comp()
export {URL_component}
