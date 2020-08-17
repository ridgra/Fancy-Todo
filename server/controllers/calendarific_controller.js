const axios = require('axios');

class CalendarificControllers {
  static async getEvent(req, res, next) {
    try {
      const { day, month, year } = req.body;
      const calendarific = await axios({
        url: `https://calendarific.com/api/v2/holidays`,
        params: {
          api_key: process.env.API_KEY,
          country: 'ID',
          type: 'national',
          day,
          month,
          year,
        },
      });
      const name = calendarific.data.response.holidays[0].name;
      res.status(200).json({ calendarific: name });
      return name;
    } catch (err) {
      // next(err);
    }
  }
}

module.exports = CalendarificControllers;
