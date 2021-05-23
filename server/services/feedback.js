module.exports = {

    ok(data={}, message='', code=200){
        return { 'code': code+'', 'status': 'OK',  'message': message, 'data': data };
    },
    
    fail(message='', code=400){
        return { 'code': code+'', 'status': 'FAIL',  'message': message };
    }
}