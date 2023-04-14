import React from 'react'
import * as Spaces from 'react-spaces'
const BorderSpacer = (props) => {
  
  if (props.mode === 'picture'){
    return (
        <>
        <Spaces.Top size="17.8%"></Spaces.Top>
        
          <Spaces.Left size="17%"></Spaces.Left>
  
          <Spaces.Right size="17.2%"></Spaces.Right>
  
          <Spaces.Bottom size="13.8%"></Spaces.Bottom>
          </>
    )
    }
    else{
      return (
        <>
        <Spaces.Top size="10%"></Spaces.Top>
        
          <Spaces.Left size="15%"></Spaces.Left>
  
          <Spaces.Right size="15%"></Spaces.Right>
  
          <Spaces.Bottom size="10%"></Spaces.Bottom>
          </>
    )
    }
}

export default BorderSpacer