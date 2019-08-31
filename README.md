# jnoty-inline
Demo
https://visualapps.github.io/jnoty-inline/

![jnoty-inline](https://github.com/visualapps/jnoty-inline/blob/master/docs/preview.gif)



## Install

```bash
npm i jnoty-inline
```

## Demo

📝 **https://visualapps.github.io/jnoty-inline/**


# :clipboard: Usage
Usage is simple:
```javascript
jnotyInline.pending({
 message: 'Updating...'
});
```
```javascript
jnotyInline.fulfilled({
 message: 'Profile updated successfully.'
});
```
```javascript
jnotyInline.rejected({
 message: 'Something went wrong!',
 sticky: true
});
```
<a name="options"></a>

## Options

| ARGUMENT               | DESCRIPTION                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| message        | Give a message to notifcation |
| timeout        | Set a custom delay (in milliseconds) to despair notification |
| sticky       |Disable timeout and make it sticky|
| kind     |Set a kind of notification|
| position  |Set the custom position of the notification   |

**Warning:** _In future versions some commands may change_

<a name="examples"></a>


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**jnoty-inline** © [rake7h](https://github.com/visualapps), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by rake7h. 

>  GitHub [@visualapps](https://github.com/visualapps) · Twitter [@rake7h](https://twitter.com/rake7h)
