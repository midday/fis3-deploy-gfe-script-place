'use strict';

/**
 * 控制所有script标签的存放位置
 * @param  {Object}   options  插件配置
 * @param  {Object}   modified 修改了的文件列表（对应watch功能）
 * @param  {Object}   total    所有文件列表
 * @param  {Function} next     调用下一个插件
 * @return {undefined}
 */
module.exports = function(options, modified, total, next) {
    //js位置，默认插入到body结束标签之前
    var insertBodyEndTagBefore = options.insertBodyEndTagBefore ? options.insertBodyEndTagBefore : true;
    //script标签的正则表达式
    var scriptTagRegExp = /<script[^>]*>((?!<\s*\/script\s*>)[\s\S])*<\s*\/script\s*>/gi;

    modified.forEach(function(file) {
        if (file.isText() || typeof(file.getContent()) === 'string') {
            var content = file.getContent();

            //包含html基本结构的入口文件
            var isEntryFile = (~content.indexOf('/html') || ~content.indexOf('/HTML')) && (~content.indexOf('/head') || ~content.indexOf('/HEAD')) && (~content.indexOf('/body') || ~content.indexOf('/BODY'));

            //html入口文件
            if (/\.(html|ftl)/.test(file.rExt) && isEntryFile) {
                //inbottom script标签数组
                var inbottomScriptTagArray = [];

                //script标签数组
                var scriptTagArray = [];

                //将script标签缓存到数组中，并将其替换为空串
                content = content.replace(scriptTagRegExp, function(scriptTag) {
                    scriptTagArray.push(scriptTag);
                    return '';

                });

                //script标签位置替换
                if (insertBodyEndTagBefore) {
                    content = content.replace(/(<\/body>\s*<\/html>)/gi, scriptTagArray.join('\r\n') + '\r\n$1');
                } else {
                    content = content.replace(/(<\/head>\s*<body>)/gi, scriptTagArray.join('\r\n') + '\r\n$1');
                }

                file.setContent(content);
            }

        }
    });

    next();
};
