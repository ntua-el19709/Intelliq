module.exports = (req, res, next) => {

    // to get query params => access req.query
    // to get body params => access req.body
    // to get params (variables on the url with : in front) => access req.params

    return res.status(200).json({
        text: "Hello World"
    })    

};