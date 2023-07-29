import plugsActionTypes from "./plugs.types";

export const INITIAL_PLUGS_TYPES_STATE = {
    plugsType:[]
}

const plugsReducer = (state = INITIAL_PLUGS_TYPES_STATE, {type,payload}) =>{

    switch(type){
        case plugsActionTypes.fetchPlugsType:
            return {...state,plugsType:payload}
        default:
            return state;
    }

}

export default plugsReducer;