import getDb from "../controllers/getDb"

export const GET_DB = 'GET_DB'

export function getData(){
    return async function (dispatch){
        let res = await getDb()
        dispatch({
            type: GET_DB,
            payload: res
        })
    }
}