## RUN

Just run `npm start`



## Unfinished

Check `src/container/Root.js`

in fuction `uploadImage`

```
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
```

