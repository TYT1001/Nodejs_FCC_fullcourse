const auth =  function(req,res,next){
    const {name} = req.body;
    if(name ===  'john'){
        req.data = {name: 'john', age: 22}
        next();
    }else{
        res.status(401).send('unauthorized');
        next();
    }
    
}

module.exports = auth;