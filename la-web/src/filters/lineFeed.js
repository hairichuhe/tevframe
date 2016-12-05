module.exports = function(value) {
	if(value)
    	return typeof value === 'string' ? value.replace(/(\r\n)/g, '<br>') : value;
}