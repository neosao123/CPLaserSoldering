import { createSlice,createAsyncThunk } from  '@reduxjs/toolkit';
// import {WithTokenApi} from '../../Helpers/axios'
import jwt_decode from "jwt-decode";
import axios from "axios";


//check user password and username
// this the Action of  checkLogin
export const checkLogin = createAsyncThunk(
      'login/checkLogin',
      async (token, thunkApi) => {
		//   console.log("token",token)
     	var userInfoData={};
         var decoded = jwt_decode(token); 
        //  console.log("decoded",decoded)
         
		// this api for get data of user by user id
		   await axios.get( 
				'http://localhost:8080/users/'+decoded.id,
				{  headers: { Authorization: `Bearer ${token}` }}
				
			  ).then(result => {
				// console.log("result",result)
				userInfoData.info = result.data;
			
			})

       
           
			return userInfoData;
		   
	  }
);
// this is login reducers / loginSlice 
const loginSlice = createSlice({ 
          name: 'login',
		  initialState: { userinfo: {}   },
		  reducers: {
		    // standard reducer logic, with auto-generated action types per reducer
		  },
		  extraReducers: (builder) => {
		    // Add reducers for additional action types here, and handle loading state as needed
		    builder.addCase(checkLogin.fulfilled, (state, action) => {
		      // Add user to the state array
		      
		      state.userinfo = action.payload.info;
		    })
		  },
	});


export default loginSlice.reducer