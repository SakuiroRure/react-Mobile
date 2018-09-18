import QueryString from 'query-string'
export class PathUtil{
    constructor(){
        
    }
    static getPath(path,query){
        let key;
        let totalPath = path+(Object.keys(query).length?"?":"");
        return totalPath + QueryString.stringify(query)
    }
    static getQuery(string){
        return QueryString.parse(string)
    }
}