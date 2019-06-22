import React, { Component } from 'react';
import Parnorama from '../container/Parnorama'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';


class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_link: "",
      getResult: false,
      resultLink: ["https://i.imgur.com/B1buLH3.jpg", "https://i.imgur.com/q1oP0pYr.jpg"],
    }
    this.uploadImage = this.uploadImage.bind(this);
  }


  async uploadImage(imageFile) {
    // Upload image to Imgur and that get the link
    const link = await this.uploadImageAndGetLink(imageFile)
    // And then sent the link to server
    console.log(123, link)
    // while get result, set state
    this.setState({
      image_link: link,
      getResult: true,
      resultLink: ["https://i.imgur.com/B1buLH3.jpg", "https://i.imgur.com/q1oP0pYr.jpg"],
      // the above link should be sent by server
    })
  }

  uploadImageAndGetLink(imageFile) {
    return new Promise(resolve => {
      const r = new XMLHttpRequest()
      const d = new FormData()

      const client = '4409588f10776f7'
      console.log(imageFile)
      d.append('image', imageFile)

      r.open('POST', 'https://api.imgur.com/3/image/')
      r.setRequestHeader('Authorization', `Client-ID ${client}`)
      r.onreadystatechange = function () {
        if(r.status === 200 && r.readyState === 4) {
          let res = JSON.parse(r.responseText)
          console.log(res.data)
          resolve(res.data.link)
        }
      }.bind(this)
      r.send(d)
    })
  }


  render() {
    return (
      <div>
        <h1>ADL DEMO</h1>
        <Button onClick={(e) => {console.log(this.state)}}>test</Button>
        <div className="col-md-12 text-center animate-box">
          <p>
            <label id="largeFile" className="btn btn-secondary btn-lg btn-learn" style = {{display: this.state.image_link ? "none": ""}}>
              <Input type="file" id="file" className="btn btn-primary btn-lg btn-learn" className="input-image"
              onChange={(e) => this.uploadImage(e.target.files[0])}
              />
            </label>

            <img id="image" src={this.state.image_link ? this.state.image_link: ""}
            style = {{maxWidth: "500px", maxHeight: "500px", display: this.state.image_link ? "": "none"}}
            alt="Please upload an image to start this project."
            className="img-responsive img-rounded"/>
          </p>
        </div>
        <div style={{display: this.state.getResult ? "" : "none"}}>
          <Parnorama
            sourecs={this.state.resultLink}
          />
        </div>
      </div>
    )
  }
}

export default Root