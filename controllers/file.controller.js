var logger = require("molly-logger");
const cloudinaryFileUpload = require("molly-upload");
function FileController() {
    this.upload = async (req, res) => {
        try {
            const file = req.file;
            cloudinaryFileUpload(file, "data").then(
                function (value) {
                    logger.info(value);
                    res.status(200).send("File uploaded.");
                },
                function (error) {
                    logger.error(error);
                    res.status(500).send(error);
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

    return this;
}

module.exports = FileController();
