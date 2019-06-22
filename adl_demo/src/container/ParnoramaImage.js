import React, { Component } from 'react';
import { TweenLite, TimelineMax, Linear } from 'gsap';

const SLIDE_TO_SHOW = 1;
const DURATION = 5;
const FIX_HEIGHT = 400;


class ParnoramaImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      height: FIX_HEIGHT,
      width: 1680,
    };
    this.setImage = this.setImage.bind(this);
    this.tl = new TimelineMax({
      repeat: -1,
    });

    this.setImage(this.props.link)
  }

  async setImage(url){
    let out = await this.getImageSize(this.props.link)
    console.log(out)
    let rate = out[1]/out[0]
    let changedWidth = rate * FIX_HEIGHT
    this.setState({
      height: FIX_HEIGHT, //out[0],
      width: changedWidth, //out[1],
    })
    const { content } = this.refs;
    this.tl = new TimelineMax({
      repeat: -1,
    });
    this.tl.add(TweenLite.to(content, DURATION, {
      transform: `translate3d(${1 * changedWidth * -1}px, 0, 0)`,
      ease: Linear.easeNone,
    }));
    this.tl.add(TweenLite.to(content, 0, {
      transform: `translate3d(0, 0, 0)`
    }));
  }
  getImageSize(url) {
    return new Promise(resolve => {
      var img = new Image();
      var height, width;
      img.src = url;
      img.onload = function(){
        resolve([this.height, this.width])
      };
    })
  }
  componentDidMount() {
    const { content } = this.refs;
    this.tl.add(TweenLite.to(content, DURATION, {
      transform: `translate3d(${1 * this.state.width * -1}px, 0, 0)`,
      ease: Linear.easeNone,
    }));
    this.tl.add(TweenLite.to(content, 0, {
      transform: `translate3d(0, 0, 0)`
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.link !== this.state.link) {
      this.setState({link: this.props.link});
    }
    console.log(prevProps.link)
    console.log(this.props.link)
  }

  render() {
    return (
      <div
        className="marquee"
        style={{
          width: `${SLIDE_TO_SHOW * this.state.width}px`,
          height: `${this.state.height}px`,
        }}
      >
        <button onClick={(e) => {console.log(this.state)}}>test</button>
        <div
          className="child"
          style={{
            width: `${(1 + SLIDE_TO_SHOW) * this.state.width}px`,
          }}
          ref="content"
          onMouseEnter={() => {
            this.tl.pause();
          }}
          onMouseLeave={() => {
            this.tl.play();
          }}
        >
          {
            [this.state.link].map((item, index) => {
              return (
                <img
                  src={item}
                  key={index}
                  height={FIX_HEIGHT}
                  width={this.state.width}
                />
              );
            })
          }
          {
            [this.state.link].map((item, index) => {
              if (index + 1 <= SLIDE_TO_SHOW) {
                return (
                  <img
                    src={item}
                    key={`last-${index}`}
                    height={FIX_HEIGHT}
                    width={this.state.width}
                  />
                );
              }
              return null;
            })
          }
        </div>
      </div>
    );
  }
}

export default ParnoramaImage
