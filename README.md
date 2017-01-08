# fis3-deploy-gfe-script-place
fis3-deploy-gfe-script-place


## INSTALL

```bash
npm install [-g] fis3-deploy-script-place
```

## USE

```js
fis.match('**', {
    deploy: [
        fis.plugin('gfe-script-place'),//默认参数：insertBodyEndTagBefore=true
        fis.plugin('local-deliver') //must add a deliver, such as http-push, local-deliver
    ]
});
```