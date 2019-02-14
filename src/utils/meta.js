var setMeta = function(options) {
    document.title = options.title

    let description = document.querySelector('#description')
    description.content = options.description
    
    let keywords = document.querySelector('#keywords')
    keywords.content = options.keywords
}

export default setMeta