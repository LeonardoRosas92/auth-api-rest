const { request, response, json } = require('express');


const init = async (req, res = response) => {

    try {
        return res.status(200).json({
            msg: 'Url correcta'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error: ' + error
        })
    }
}

module.exports = {
    init
}