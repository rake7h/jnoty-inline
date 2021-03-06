<p align="center">
<img src="https://github.com/rake7h/jnoty-inline/blob/master/docs/banner-logo.png" width="300">
</p>

![jnoty-inline](https://github.com/rake7h/jnoty-inline/blob/master/docs/preview.gif)



## Install

```bash
$ npm i jnoty-inline
```
or
```bash
$ bower install jnoty-inline --save
```

## Demo

📝 **https://rake7h.github.io/jnoty-inline/**


## Usages
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
Hide a notification
```javascript
jnotyInline.hide();
```
<a name="options"></a>

## Options

| ARGUMENT               | DESCRIPTION                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| message        | Give a message to notification|
| timeout        | Set a custom delay (in milliseconds) to hide notification |
| sticky       |Disable timeout and make it sticky|
| kind     |Set a kind of notification|
| position  |Set the custom position of the notification   |

**Kinds** : pending, fulfilled, rejected

**position** : Work in progress. Default: bottom-right

**Warning:** _In future versions some commands may change_

## Example
```javascript
<script type="module">
 import * as module from './jnoty-inline-min.js';
 
  // open a notification 
  let notification = module.jnotyInline.pending({message:'Updating...'});
  
  // hide after 10000ms
  setTimeout(()=>{
   notification.hide();
  },10000)
</script>
```
## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**jnoty-inline** © [rake7h](https://github.com/rake7h), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by rake7h. 

>  GitHub [@rake7h](https://github.com/rake7h) · Twitter [@rake7h](https://twitter.com/rake7h)
