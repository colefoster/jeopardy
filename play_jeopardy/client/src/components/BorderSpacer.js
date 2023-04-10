import React, { Component } from 'react'
import * as Spaces from 'react-spaces'
export class BorderSpacer extends Component {
  render() {
    return (
        <>
        <Spaces.Top size="12%" style={{
            backgroundColor: "gray",
            opacity: 0.5,
          }}></Spaces.Top>
        
          <Spaces.Left size="10%"
          style={{
            backgroundColor: "gray",
            opacity: 0.5,
          }}></Spaces.Left>
  
          <Spaces.Right size="10%"
          style={{
            backgroundColor: "gray",
            opacity: 0.5,
          }}></Spaces.Right>
  
          <Spaces.Bottom size="12%"
          style={{
            backgroundColor: "gray",
            opacity: 0.5,
          }}></Spaces.Bottom>
          </>
    )
  }
}

export default BorderSpacer