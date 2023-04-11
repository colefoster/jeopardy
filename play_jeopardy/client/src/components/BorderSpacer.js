import React, { Component } from 'react'
import * as Spaces from 'react-spaces'
export class BorderSpacer extends Component {
  render() {
    return (
        <>
        <Spaces.Top size="15%"></Spaces.Top>
        
          <Spaces.Left size="10%"></Spaces.Left>
  
          <Spaces.Right size="10%"></Spaces.Right>
  
          <Spaces.Bottom size="15%"></Spaces.Bottom>
          </>
    )
  }
}

export default BorderSpacer