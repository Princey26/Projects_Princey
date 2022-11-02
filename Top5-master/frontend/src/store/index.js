// import { data } from "jquery";
import {createStore,applyMiddleware,combineReducers } from "redux";
import {createSlice , configureStore} from "@reduxjs/toolkit";
const initialState = {data : [], particluarIndex : "" , particluarRating : 1 , particluarBook : "" , commentId : "" , books : [] ,  category : []};

const counterSlice =  createSlice({
    name :'counter',
    initialState,
    reducers : {
        datacheck(state , action) {
            state.data = action.payload
        },
        reviewcheck(state , action) {
            state.particluarIndex = action.payload
        },
        ratingcheck(state , action) {
            state.particluarRating = action.payload
        },
        bookIdcheck(state , action) {
            state.particluarBook = action.payload
        },
        commentcheck(state  , action) {
            state.commentId = action.payload
        },
        bookscheck(state , action){
            state.books = action.payload
        },
        categoryCheck(state , action){
            state.category = action.payload
        }
    }
})

// const Counter = (state = initialState , action) =>{
//     if(action.type === 'setData'){
//         return {
//             data : action.amount,
//             particluarIndex : state.particluarIndex,
//             particluarRating : state.particluarRating,
//             particluarBook : state.particluarBook,
//             commentId : state.commentId
//         }
//     }
//     if(action.type === 'setParticularIndex'){
//         return {
//             particluarIndex : action.amount,
//             data : state.data,
//             particluarRating : state.particluarRating,
//             particluarBook : state.particluarBook,
//             commentId : state.commentId
//         }
//     }

//     if(action.type === 'sctParticularRating'){
//         return {
//             data : state.data,
//             particluarIndex : state.particluarIndex,
//             particluarRating : action.amount,
//             particluarBook : state.particluarBook,
//             commentId : state.commentId
//         }
//     }
//     if(action.type === 'sctParticularBook'){
//         return {
//             data : state.data,
//             particluarIndex : state.particluarIndex,
//             particluarRating : state.particluarRating,
//             particluarBook : action.amount,
//             commentId : state.commentId
//         }
//     }

//     if(action.type === 'setcommentId'){
//         return{
//             data : state.data,
//             particluarIndex : state.particluarIndex,
//             particluarRating : state.particluarRating,
//             particluarBook : action.particluarBook,
//             commentId : action.amount
//         }
//     }
//     return state;
// }

const store = configureStore({
    reducer :  counterSlice.reducer
});

export const counterAction = counterSlice.actions;

export default store;