class AppController {
  static getHomepage(request, response) {
    response.status(200).send('Hello JobInTech!');
  }
}

module.exports = AppController;
