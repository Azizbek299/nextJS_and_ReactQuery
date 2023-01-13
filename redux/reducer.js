import {createSlice} from '@reduxjs/toolkit'


const initialState = {                          //  Бу ерда initialState как  state деб чакирилади ва уни компонентларимизда useSelect() оркали чакириб ишлатамиз
    client:{
        toggleForm:false,
        flag:true,
        user:[],
        deleteId:null
    }
}


export const ReducerSlice = createSlice({
    name:'crudapp',
    initialState,
    reducers:{
        //  Add Employee Form  ни очиб беради
        toggleChangeAction:(state)=> {
            state.client.toggleForm = !state.client.toggleForm
        },
        //  Add Employee Form да  true еки false маълумоти келишига караб  UpdateForm еки AddForm очиб беради
        flagChangeAction:(state, action)=> {            
            state.client.flag = action.payload
        },
        //  UpdateForm  да юзер маълумотларини  input поляга куйиб беради update килишингиз учун
        userUpdateAction:(state,action)=> {            
            state.client.user = action.payload
        },
        userDeleteAction:(state, action)=> {
            console.log('reducer: ', action.payload) 
            state.client.deleteId = action.payload
        }
    }
})


export const {toggleChangeAction, flagChangeAction, userUpdateAction, userDeleteAction} = ReducerSlice.actions    // Бу функцияни компонентларимизда dispatch оркали чакириш учун ишлатилади

export default ReducerSlice.reducer                         //  Бу функциямиз store.js га жойлаб ,  сунг Главный приложениямизда обертка килиш учун ишлатилади